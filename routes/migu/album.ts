/// <reference path="../../common/interface/migu_interface.ts" />
module.exports = {
  /**
   * @api {get} /migu/album/album_list
   * @apiDescription 专辑列表
   * @apiGroup 咪咕音乐|专辑
   * @apiParam {number} page 页码
   * @apiVersion 0.0.0
   */
  async ['/album_list']({ req, res, request, cheerio }) {
    const page = req.query.page || 1
    const requestUrl = `https://music.migu.cn/v3/music/album?page=${page}`
    const html = await request.send(requestUrl)
    const $ = cheerio.load(html)
    const items = $('.mal-album-list ul li')
    let album = $(items).toArray()
    album = album.map((item: any) => {
      const $item = $(item)
      const id = $item.find('.album-play').attr('data-id')
      // 专辑封面
      const coverUrl = `https:${$item
        .find('.thumb-link img.thumb-img')
        .attr('data-original')}`
      // 专辑名
      const albumName = $item.find('.album-name').text().replace(/\n/g, '')

      let singers = $item.find('.album-singers a').toArray()
      singers = singers.map((singer: any) => {
        const $singer = $(singer)
        const id = $singer.attr('href').replace(/\/v3\/music\/artist\//g, '')
        const name = $singer.text()
        return {
          id,
          name,
        }
      })
      // 发布时间
      const time = $item.find('.album-release-date').text().replace(/\n/g, '')
      return { id, coverUrl, albumName, singers, time }
    })

    res.send({
      code: 200,
      data: {
        album,
      },
    })
  },

  /**
   * @api {get} /migu/album/album_detail
   * @apiDescription 专辑详情
   * @apiGroup 咪咕音乐|专辑
   * @apiParam {number} id 专辑ID
   * @apiVersion 0.0.0
   */
  async ['/album_detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const requestUrl = `https://music.migu.cn/v3/music/album/${id}`
    const html = await request.send(requestUrl)
    const $ = cheerio.load(html)
    const cover = $('.mad-album-info .thumbnail .thumb-img').attr('src')
    const albumName = $('.mad-album-info h1.title').text().trim()
    const time = $('.mad-album-info div.pub-date')
      .text()
      .trim()
      .replace(/发行时间：/g, '')
    const intro = $('.mad-album-info .intro-wrapper #J_IntroInline').text()

    let singers = $('.mad-album-info div.singer-name a').toArray()
    singers = singers.map((singer: any) => {
      const $singer = $(singer)
      const id = $singer.attr('href').replace(/\/v3\/music\/artist\//g, '')
      const name = $singer.text()
      return {
        id,
        name,
      }
    })

    const items = $('.songlist-body .row.J_CopySong')
    let songList = $(items).toArray()
    songList = songList.map((item: any) => {
      const $item = $(item)
      const songId = $item.attr('data-mid')
      const cid = $item.attr('data-cid')
      const songName = $item
        .find('.song-name.J_SongName a.song-name-txt')
        .text()
        .trim()

      const song: MiguInterface.SongInfo = {
        id: songId,
        cid,
        cover: `https:${cover}`,
        songName: songName.replace(/\n/g, ''),
        singers,
        album: { id, name: albumName },
      }
      return song
    })

    res.send({
      code: 200,
      data: {
        albumName,
        cover: `https:${cover}`,
        intro,
        time,
        singers,
        songList,
      },
    })
  },
}
