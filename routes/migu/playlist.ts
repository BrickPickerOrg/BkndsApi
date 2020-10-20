/// <reference path="../../common/interface/migu_interface.ts" />
module.exports = {
  /**
   * @api {get} /migu/playlist/list
   * @apiDescription 歌单列表
   * @apiGroup 咪咕音乐|  歌单
   * @apiParam {string} sort 歌单列表类型 latest最新|recommend推荐 （根据歌单标签搜索不填该参数）
   * @apiParam {string} tagId 根据歌单标签搜索
   * @apiParam {number} page 页码
   * @apiVersion 0.0.0
   */
  async ['/list']({ req, res, request, cheerio }) {
    // latest最新  recommend推荐
    const sort = req.query.sort || 'latest'
    // 根据歌单标签搜索
    const tagId = req.query.tagId
    // 分页
    const page = req.query.page || 1

    const requestUrl = tagId
      ? `https://music.migu.cn/v3/music/playlist?tagId=${tagId}&page=${page}`
      : `https://music.migu.cn/v3/music/playlist?sort=${sort}&page=${page}`
    const html = await request.send(requestUrl)
    const $ = cheerio.load(html)

    const items = $('.song-list-cont ul li')
    // 歌单列表
    let playlist = $(items).toArray()
    playlist = playlist.map((item: any) => {
      const $item = $(item)
      const id = $item.find('.playlist-play').attr('data-id')
      const name = $item.find('.song-list-name').text().replace(/\n/g, '')
      const cover = $item.find('.thumb .music-cover img').attr('data-original')
      const playcount = $item.find('.song-list-desc').text().replace(/\n/g, '')
      return { id, cover: `https:${cover}`, name, playcount }
    })

    res.send({
      code: 200,
      data: {
        playlist,
      },
    })
  },

  /**
   * @api {get} /migu/playlist/detail
   * @apiDescription 歌单详情
   * @apiGroup 咪咕音乐|  歌单
   * @apiParam {string} id 歌单ID
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const requestUrl = `https://music.migu.cn/v3/music/playlist/${id}`
    const html = await request.send(requestUrl)
    const $ = cheerio.load(html)

    const name = $('.mpd-playlist-info h1.title').text().trim()
    const cover = $('.mpd-playlist-info .thumbnail .thumb-img').attr('src')
    const creator = $('.mpd-playlist-info .singer-name').text().trim()
    const playcount = $('.mpd-playlist-info .playcount')
      .text()
      .replace(/播放量：|\n/g, '')
    const intro = $('.mpd-playlist-info .intro-wrapper .intro-details').text()

    // 歌单类型标签 可用标签id搜索相同类型歌单
    let tags = $('.mpd-playlist-info .tags a').toArray()
    tags = tags.map((item: any) => {
      const $item = $(item)
      const id = $item
        .attr('href')
        .replace(/\/v3\/music\/playlist\?tagId=/g, '')
      const title = $item.text()
      return {
        id,
        title: title.replace(/\n/g, ''),
      }
    })

    const items = $('.songlist-body .row.J_CopySong')
    let songList = $(items).toArray()
    songList = songList.map((item: any) => {
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
      data: {
        name,
        creator,
        cover: `https:${cover}`,
        intro,
        playcount,
        tags,
        songList,
      },
    })
  },
}
