/// <reference path="../../common/interface/migu_interface.ts" />
module.exports = {
  /**
   * @api {get} /migu/singer/singer_detail
   * @apiDescription 歌手详情信息
   * @apiGroup 咪咕音乐|  歌手
   * @apiParam {string} id 歌手ID
   * @apiVersion 0.0.0
   */
  async ['/singer_detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const requestUrl = `https://music.migu.cn/v3/music/artist/${id}`
    const html = await request.send(requestUrl)
    const $ = cheerio.load(html)

    // 歌手头像
    const avatar = $('.artist-info .artist-avatar img').attr('src')
    // 歌手名称
    const name = $('.artist-info .artist-name a').text()
    // 歌手简介
    const intro = $(
      '.artist-info .artist-intro #J_ArtistIntro .full-content'
    ).text()

    // 该歌手的热门单曲
    const items = $('.songlist-body .J_CopySong')
    let hotSonglist = $(items).toArray()
    hotSonglist = hotSonglist.map((item: any) => {
      const $item = $(item)
      const id = $item.attr('data-mid')
      const cid = $item.attr('data-cid')
      const cover = JSON.parse($item.find('.J-btn-share').attr('data-share'))[
        'imgUrl'
      ]

      const songName = $item
        .find('.song-name.J_SongName a.song-name-txt')
        .text()
        .trim()

      const $album = $item.find('.song-belongs a').first()
      const album = $album.attr('href')
        ? {
            id: $album.attr('href').replace(/\/v3\/music\/album\//g, ''),
            name: $album.attr('title').trim(),
          }
        : null

      let singers = $item.find('.song-singers.J_SongSingers a').toArray()
      singers = singers.map((singer: any) => {
        const $singer = $(singer)
        const id = $singer.attr('href').replace(/\/v3\/music\/artist\//g, '')
        const name = $singer.text()
        return {
          id,
          name,
        }
      })

      const song: MiguInterface.SongInfo = {
        id,
        cid,
        cover: `https:${cover}`,
        songName: songName.replace(/\n/g, ''),
        singers,
        album,
      }
      return song
    })

    res.send({
      code: 200,
      data: { name, avatar: `https:${avatar}`, intro, hotSonglist },
    })
  },

  /**
   * @api {get} /migu/singer/all_song
   * @apiDescription 获取歌手全部歌曲
   * @apiGroup 咪咕音乐|  歌手
   * @apiParam {string} id 歌手ID
   * @apiParam {number} page 页码
   * @apiVersion 0.0.0
   */
  async ['/all_song']({ req, res, request, cheerio }) {
    // 歌手ID
    const id = req.query.id
    const page = req.query.page || 1
    const requestUrl = `https://music.migu.cn/v3/music/artist/${id}/song?page=${page}`
    const html = await request.send(requestUrl)
    const $ = cheerio.load(html)

    // 该歌手所有单曲
    const items = $('.songlist-body .J_CopySong')

    const total = $('.artist-section .views-pagination .pagination-item').last().text()

    let songlist = $(items).toArray()
    songlist = songlist.map((item: any) => {
      const $item = $(item)
      const id = $item.attr('data-mid')
      const cid = $item.attr('data-cid')
      const cover = JSON.parse($item.find('.J-btn-share').attr('data-share'))[
        'imgUrl'
      ]

      const songName = $item
        .find('.song-name.J_SongName a.song-name-txt')
        .text()
        .trim()

      const $album = $item.find('.song-belongs a').first()
      const album = $album.attr('href')
        ? {
            id: $album
              .attr('href')
              .replace(/\/v3\/music\/digital_album\//g, ''),
            name: $album.attr('title').trim(),
          }
        : null

      let singers = $item.find('.song-singers.J_SongSingers a').toArray()
      singers = singers.map((singer: any) => {
        const $singer = $(singer)
        const id = $singer.attr('href').replace(/\/v3\/music\/artist\//g, '')
        const name = $singer.text()
        return {
          id,
          name,
        }
      })

      const song: MiguInterface.SongInfo = {
        id,
        cid,
        cover: `https:${cover}`,
        songName: songName.replace(/\n/g, ''),
        singers,
        album,
      }
      return song
    })

    res.send({
      code: 200,
      data: {
        total: parseInt(total),
        songlist
      },
    })
  },
}
