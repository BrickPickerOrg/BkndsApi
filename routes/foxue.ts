import { StringUtil } from '../common/util/string_util'

module.exports = {
  /**
   * @api {get} /foxue/
   * @apiDescription 佛学辞典列表
   * @apiGroup 【佛学辞典】
   * @apiVersion 0.0.0
   */
  async ['/']({ res, request, cheerio }) {
    const html = await request.send(`http://www.tool5.com/foxue/`)
    const $ = cheerio.load(html)
    const result = $('ul.l4 li').toArray().map((item: any) => {
      const regx = /\.\/list_(.*?)\.html/
      return {
        id: $(item).find('a').attr('href').match(regx)[1],
        name: $(item).text().replace(/\n/g,'').trim(),
      }
    })

    res.send({
      code: 200,
      data: {
        result
      },
    })
  },

  /**
   * @api {get} /foxue/directory
   * @apiDescription 根据辞典ID获取辞典目录
   * @apiGroup 【佛学辞典】
   * @apiParam {string} id 辞典ID
   * @apiVersion 0.0.0
   */
  async ['/directory']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://www.tool5.com/foxue/list_${id}.html`)
    const $ = cheerio.load(html)
    const title = $('h2').text()
    const directory = $('.mcon.noi ul.l3 li').toArray().map((item: any) => {
      const regx = /\.\/id_(.*?)\.html/
      return {
        id: $(item).find('a').attr('href').match(regx)[1],
        name: $(item).text().replace(/\n/g,'').trim(),
      }
    })
    
    res.send({
      code: 200,
      data: {
        title,
        directory,
      },
    })
  },

  /**
   * @api {get} /foxue/detail
   * @apiDescription 佛学辞典语录详情
   * @apiGroup 【佛学辞典】
   * @apiParam {string} id 详情ID
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://www.tool5.com/foxue/id_${id}.html`)
    const $ = cheerio.load(html)
    const title = $('.mcon.noi').find('h2').text().replace(/\n/g,'').trim()
    let content = $('.mcon.noi').find('p').first().text().replace(/\n/g,'').trim()
    if (content.match(/^p(.*?)$/) && content.match(/^p(.*?)$/).length > 0) {
      content = $('.mcon.noi').find('p').eq(1).text().replace(/\n/g,'').trim()
    }

    res.send({
      code: 200,
      data: {
        title,
        content
      },
    })
  },

  /**
   * @api {get} /foxue/search
   * @apiDescription 搜索关键词
   * @apiParam {string} key 关键词
   * @apiGroup 【佛学辞典】
   * @apiVersion 0.0.0
   */
  async ['/search']({ req, res, request, cheerio }) {
    const { key } = req.query
    const html = await request.send(`http://www.tool5.com/foxue/q_${encodeURI(key)}.html`)
    const $ = cheerio.load(html)
    const result = $('.l2.bt.mt.pt li').toArray().map((item: any) => {
      const regx = /\.\/id_(.*?)\.html/
      const regx1 = /\.\/list_(.*?)\.html/
      return {
        id: $(item).find('a').first().attr('href').match(regx)[1],
        name: $(item).find('a').first().text().replace(/\n/g,'').trim(),
        from_id: $(item).find('a').last().attr('href').match(regx1)[1],
        from_name: $(item).find('a').last().text().replace(/\n/g,'').trim(),
      }
    })
    
    res.send({
      code: 200,
      data: {
        key,
        result
      },
    })
  },
}
