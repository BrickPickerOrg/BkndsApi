/// <reference path="../../common/interface/migu_interface.ts" />
module.exports = {
  /**
   * @api {get} /migu/home/
   * @apiDescription 首页
   * @apiGroup 咪咕音乐| 首页
   * @apiVersion 0.0.0
   */

  async ['/']({ req, res, request, cheerio }) {
    const html = await request.send(`https://music.migu.cn/v3`)
    const $ = cheerio.load(html)
    // 推荐歌单
    const playlist = $('#playlist .wrapper-items .item-contain').toArray().map((item: any) => {
      const $item = $(item)
      const id = $item.find('.playlist-play').attr('data-id')
      const name = $item.find('.item-title').text().replace(/\n/g, '')
      const cover = $item.find('.thumb .img-full').attr('data-src')
      const playcount = $item.find('.item-playCnt').text().replace(/\n/g, '')
      return { id, cover: `https:${cover}`, name, playcount }
    })
    // 新歌速递盒子图
    const songsImgBox = $('#songs .staticImgBox img').toArray().map((item: any) => {
      return `https:${$(item).attr('src')}`
    })
    // 新歌速递
    const songs = JSON.parse($('#songData').html())[0]['items'].map((item: any) => {
      const $item = $(item)
      const id = item['songId']
      const cid = item['copyrightId']
      const cover = item['image']
      const songName = item['songName']
      const album = {
        id: item['albumId'],
        name: item['albumName'],
      }
      const singers = item['singers'].map((singer: any) => {
        return {
          id: singer['singerId'],
          name: singer['singerName'],
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

    // 新碟上架
    const albums = $('#album .wrapper-items .item-contain').toArray().map((item: any) => {
      const $item = $(item)
      // 专辑ID
      const id = $item.find('.album-play').attr('data-id')
      // 专辑封面
      const coverUrl = `https:${$item.find('.img-full').attr('src')}`
      // 专辑名
      const albumName = $item.find('.item-info .album-name').text().replace(/\n/g, '')
      let singers = $item.find('.singer a').toArray()
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
      const time = $item.find('.update-time').text().replace(/\n/g, '')
      return { id, coverUrl, albumName, singers, time }
    })

    res.send({
      code: 200,
      data: {
        playlist,
        songsImgBox,
        songs,
        albums
      },
    })
  },

  /**
   * @api {get} /migu/home/banner
   * @apiDescription 首页专辑banner轮播图
   * @apiGroup 咪咕音乐|  首页
   * @apiVersion 0.0.0
   */

  async ['/banner']({ req, res, request, cheerio }) {
    const html = await request.send(`https://music.migu.cn/v3/music/new_album`)
    const $ = cheerio.load(html)
    const items = $('.sliderBox ul li')
    const carousel = $(items)
      .toArray()
      .map((item: any) => {
        const $item = $(item)
        const id = $item
          .find('a')
          .attr('href')
          .replace(
            /https:\/\/music.migu.cn\/v3\/music\/digital_album\/static\//g,
            ''
          )
        const title = $item.find('img').attr('alt')
        const img = $item.find('img').attr('src')

        return { id, title, img: `https:${img}` }
      })

    res.send({
      code: 200,
      data: {
        carousel,
      },
    })
  },
}
