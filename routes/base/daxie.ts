module.exports = {
  /**
   * @api {get} /base/daxie/
   * @apiDescription 金额转大写
   * @apiParam {string} money 金额
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/']({ req, res, request, cheerio }) {
    const { money } = req.query
    const html = await request.send(`http://www.tool5.com/daxie/${money}.html`)
    const $ = cheerio.load(html)
    const daxie = $('.f14 .pink').text().trim()

    res.send({
      code: 200,
      data: {
        money,
        daxie
      },
    })
  },
}
