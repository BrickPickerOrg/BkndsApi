import { StringUtil } from '../common/util/string_util'

module.exports = {
  /**
   * @api {get} /koran/directory
   * @apiDescription 获取古兰经目录
   * @apiGroup 【古兰经】
   * @apiVersion 0.0.0
   */
  async ['/directory']({ req, res, request, cheerio }) {
    const html = await request.send(`http://www.tool5.com/gulanjing/`)
    const $ = cheerio.load(html)
    const directory = $('ul.l3 li').toArray().map((item: any) => {
      const regx = /\.\/(.*?)\.html/
      const name= $(item).text().replace(/\n/g, '').trim()
        return {
        id: $(item).find('a').attr('href').match(regx)[1],
        index: name.split('章 ')[0] + '章',
        name: name.split('章 ')[1],
      }
    })
    
    res.send({
      code: 200,
      data: {
        directory,
      },
    })
  },

  /**
   * @api {get} /koran/detail
   * @apiDescription 古兰经章节详情
   * @apiGroup 【古兰经】
   * @apiParam {string} id 详情ID
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://www.tool5.com/gulanjing/${id}.html`)
    const $ = cheerio.load(html)
    const title = $('.mainbox').find('h2').text().replace(/\n/g,'').trim()
    let content = $('.mainbox .mcon').eq(1).html()

    res.send({
      code: 200,
      data: {
        id,
        index:title.split('章 ')[0] + '章',
        title:title.split('章 ')[1],
        content: StringUtil.formatUnicode(content).replace('\n上一章 下一章', ''),
      },
    })
  },
}
