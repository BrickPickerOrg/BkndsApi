module.exports = {
  /**
   * @api {get} /base/everyday/
   * @apiDescription 金额转大写
   * @apiParam {string} money 金额
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/list']({ req, res, request, cheerio }) {
    const { money } = req.query
    const html = await request.send(`http://www.kekenet.com/kouyu/primary/chuji/`)
    const $ = cheerio.load(html)
    const regx = /(.*?)\.shtml/
    const daxie = $('#menu-list li').toArray().map((item: any) => {
      const href = $(item).find('a').attr('href').match(regx)[1]
      
      return {
        href: href.replace(/kouyu/g, 'mp3'),
      }
    })

    res.send({
      code: 200,
      data: {
        money,
        daxie,
      },
    })
  },
}
