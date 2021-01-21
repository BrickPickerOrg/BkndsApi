import { StringUtil } from '../../common/util/string_util'

module.exports = {
  /**
   * @api {get} /base/lishi/
   * @apiDescription 历史上的今天
   * @apiParam {string} m 月
   * @apiParam {string} d 日
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/']({ res, req, request, cheerio }) {
    const {m, d} = req.query
    const html = await request.send(`https://lssdjt.com/${m}/${d}/`)
    const $ = cheerio.load(html)
    const result = $('.main .list .gong')
      .toArray()
      .map((item: any) => {
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

  /**
   * @api {get} /base/lishi/detail
   * @apiDescription 历史上的今天
   * @apiParam {string} id
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/detail']({ res, req, request, cheerio }) {
    const id = req.query.id
    const html = await request.send(`https://lssdjt.com/d/${id}.htm`)
    const $ = cheerio.load(html)
    const title = $('.view h1').text().trim()
    const content = StringUtil.formatUnicode($('.content').html()).replace(/(%uA0)|(%uB7)/g, '')
    const date = $('.view h2').first().text()
    
    res.send({
      code: 200,
      data: {
        date,
        title,
        content,
      },
    })
  },
}
