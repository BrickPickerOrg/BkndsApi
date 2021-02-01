module.exports = {
  /**
   * @api {get} /base/everyday/list
   * @apiDescription 每日一句英语口语
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/list']({ req, res, request, cheerio }) {
    const html = await request.send(`http://www.kekenet.com/kouyu/primary/chuji/`)
    const $ = cheerio.load(html)
    const regx = /(.*?)\.shtml/
    const result = $('#menu-list li').toArray().map((item: any) => {
      const href = $(item).find('a').attr('href').match(regx)[1]
      const title = $(item).find('h2').text().trim().split(/:/)
      return {
        href,
        title
      }
    })

    res.send({
      code: 200,
      data: {
        result,
      },
    })
  },

  /**
   * @api {get} /base/everyday/detail
   * @apiDescription 每日一句英语口语
   * @apiParam {string} href 详情地址
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { href } = req.query
    const html = await request.send(`http://www.kekenet.com${href}.shtml`)
    const $ = cheerio.load(html)
    const en = $('#article_eng').find('p').eq(1).text().trim()
    const zh = $('#article_eng').find('p').eq(2).text().trim()
    const htmlmp3 = await request.send(`http://www.kekenet.com${href}.shtml`.replace('kouyu', 'mp3'))
    const $1 = cheerio.load(htmlmp3)
    const audio = $1('.lastPage_left table').find('a').eq(1).attr('href')

    res.send({
      code: 200,
      data: {
        en,
        zh,
        audio
      },
    })
  },
}
