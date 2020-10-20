/// <reference path="../../common/interface/migu_interface.ts" />
module.exports = {
  /**
   * @api {get} /migu/top/top_types
   * @apiDescription 榜单种类列表
   * @apiGroup 咪咕音乐|  榜单
   * @apiVersion 0.0.0
   */
  async ['/top_types']({ req, res, request, cheerio }) {
    const requestUrl = `https://music.migu.cn/v3/music/top/jianjiao_newsong`
    const html = await request.send(requestUrl)
    const $ = cheerio.load(html)

    const items = $('.board-sord .sord-item')
    let sordItems = $(items).toArray()
    sordItems = sordItems.map((item: any) => {
      const $item = $(item)
      // 榜单名称
      const topName = $item.find('.sord-main').text()
      let types = $($item.find('ul li')).toArray()
      types = types.map((type: any) => {
        const $type = $(type)
        const typeName = $type.text()
        const typeCode = $type.find('a').attr('href') || 'jianjiao_newsong'
        return {
          typeName,
          typeCode: typeCode.replace(/\/v3\/music\/top\//g, ''),
        }
      })

      return { topName, types }
    })

    res.send({
      code: 200,
      data: {
        sordItems,
      },
    })
  },

  /**
   * @api {get} /migu/top/top_detail
   * @apiDescription 排行榜详情
   * @apiGroup 咪咕音乐|  榜单
   * @apiParam {string} type 榜单类型
   * @apiVersion 0.0.0
   */
  async ['/top_detail']({ req, res, request, cheerio }) {
    const { type } = req.query
    const requestUrl = `https://music.migu.cn/v3/music/top/${type}`
    const html = await request.send(requestUrl)
    const $ = cheerio.load(html)

    const $coverContent = $('.top-content .top-cover-info .cover')
    const cover = $coverContent.find('#cover_bg').attr('data-src')
    const coverMask = $coverContent.find('#top_cover').attr('data-src')

    let items = $($('.top-content .billboard-item.songlist-item')).toArray()
    items = items.map((item: any) => {
      const $item = $(item)
      // 歌单名
      const id = $item.attr('data-id')
      const cid = $item.attr('data-cid')
      const cover = $item.find('.song-cover-pic img').attr('data-src')
      const songName = $item.find('.song-name-text').text()
      let singers = $($item.find('.song-singer a')).toArray()
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
      }
      return song
    })
    items = items.filter((item: any) => !!item.id)

    res.send({
      code: 200,
      data: {
        coverMask: `https:${coverMask}`,
        cover: `https:${cover}`,
        items,
      },
    })
  },
}
