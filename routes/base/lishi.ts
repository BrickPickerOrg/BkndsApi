import { StringUtil } from '../../common/util/string_util'

module.exports = {
  /**
   * @api {get} /base/lishi/
   * @apiDescription 历史上的今天
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/']({ res, request, cheerio }) {
    const html = await request.send(`https://lssdjt.com/`)
    const $ = cheerio.load(html)
    const result = $('.main .list .gong').toArray().map((item: any) => {
      const regx = /\/d\/(.*?)\.htm/
      const date = $(item).find('em').text()
      const title = $(item).find('i').text()
      return {
        id: $(item).find('a').attr('href').match(regx)[1],
        date,
        title,
      }
    })

    res.send({
      code: 200,
      data: {
        result,
      },
    })
  },
}
