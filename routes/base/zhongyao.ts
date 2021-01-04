import { StringUtil } from '../../common/util/string_util'

module.exports = {
  /**
   * @api {get} /base/zhongyao/resou/
   * @apiDescription 中草药大全热搜
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/resou']({ res, request, cheerio }) {
    const html = await request.send(`http://www.tool5.com/zhongcaoyao/`)
    const $ = cheerio.load(html)
    const result = $('ul.l3 li')
      .toArray()
      .map((item: any) => {
        const regx = /\.\/id_(.*?)\.html/
        return {
          id: $(item).find('a').attr('href').match(regx)[1],
          title: $(item).text().replace(/\n/g, '').trim(),
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
   * @api {get} /base/zhongyao/search/
   * @apiDescription 中草药大全搜索
   * @apiParam {string} key 中草药关键字
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/search']({ req, res, request, cheerio }) {
    const { key } = req.query
    const html = await request.send(`http://www.tool5.com/zhongcaoyao/q_${encodeURI(key)}.html`)
    const $ = cheerio.load(html)
    const result = $('ul.l2 li').toArray().map((item: any) => {
      const regx = /\.\/id_(.*?)\.html/
      return {
        id: $(item).find('a').attr('href').match(regx)[1],
        title: $(item).text().replace(/\n/g, '').trim(),
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
   * @api {get} /base/zhongyao/detail
   * @apiDescription 中草药详情解释
   * @apiParam {string} id 中草药ID
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(
      `http://www.tool5.com/zhongcaoyao/id_${id}.html`
    )
    const $ = cheerio.load(html)
    const title = $('.f14 h2').text().replace(/\n/g, '').trim()
    const content = $('.f14 p')
      .toArray()
      .map((item: any) => {
        return $(item).text().replace(/\n/g, '').trim()
      })

    res.send({
      code: 200,
      data: {
        title,
        content,
      },
    })
  },
}
