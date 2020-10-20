module.exports = {
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
