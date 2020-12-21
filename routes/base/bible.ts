import { StringUtil } from '../../common/util/string_util'

module.exports = {
  /**
   * @api {get} /base/bible/
   * @apiDescription 基督教圣经列表
   * @apiGroup 【基督教圣经】
   * @apiVersion 0.0.0
   */
  async ['/']({ res, request, cheerio }) {
    const html = await request.send(`http://m.tool5.com/shengjing/`)
    const $ = cheerio.load(html)
    const result = $('.txtlist').first().find('li').toArray().map((item: any) => {
      const regx = /\.\/(.*?)\.html/
      const title = $(item).text().replace(/\n/g, '').trim().split(' ')
      return {
        id: $(item).find('a').attr('href').match(regx)[1],
        part: title[0],
        name: title[1],
        enName: title[2],
      }
    })

    const part1 = result.filter(item => {
      return item['part'] === '旧约'
    })

    const part2 = result.filter(item => {
      return item['part'] === '新约'
    })
  
    

    res.send({
      code: 200,
      data: {
        part1,
        part2
      },
    })
  },

  /**
   * @api {get} /base/bible/directory
   * @apiDescription 根据章节ID获取详细目录
   * @apiGroup 【基督教圣经】
   * @apiParam {string} id 章节ID
   * @apiVersion 0.0.0
   */
  async ['/directory']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://www.tool5.com/shengjing/${id}.html`)
    const $ = cheerio.load(html)
    const title = $('h2').text()
    const directory = $('.f14 ul.l4 li').toArray().map((item: any) => {
      const regx = /\.\/(.*?)\.html/
      return {
        id: $(item).find('a').attr('href').match(regx)[1],
        name: $(item).text().replace(/\n/g, '').trim(),
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
   * @api {get} /base/bible/detail
   * @apiDescription 基督教圣经详情
   * @apiGroup 【基督教圣经】
   * @apiParam {string} id 详情ID
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://www.tool5.com/shengjing/${id}.html`)
    const $ = cheerio.load(html)
    const title = $('.leftbox .otitle').find('h2').text().replace(/\n/g, '').trim()
    const titles = $('.mcon.noi.f14').last().find('h3').toArray().map((title: any) => {
      return $(title).text().replace(/\n/g, '').trim()
    })

    const contents = $('.mcon.noi.f14').last().find('p.l180').toArray().map((content: any) => {
        return StringUtil.formatUnicode($(content).html()).split('<br>')
    })

    const paragraphs = titles.map((item, index) => {
      return {
        title: item,
        content:contents[index]
      }
    })
    res.send({
      code: 200,
      data: {
        title,
        paragraphs,
      },
    })
  },

  /**
   * @api {get} /base/bible/search
   * @apiDescription 搜索关键词
   * @apiParam {string} key 关键词
   * @apiGroup 【基督教圣经】
   * @apiVersion 0.0.0
   */
  async ['/search']({ req, res, request, cheerio }) {
    const { key } = req.query
    const html = await request.send(`http://www.tool5.com/shengjing/q_${encodeURI(key)}.html`)
    const $ = cheerio.load(html)
    const titles = $('.mcon.noi.f14').eq(1).find('h3').toArray().map((title: any) => {
      const regx = /\.\/(.*?)\.html/
      return {
        id: $(title).find('a').attr('href').match(regx)[1],
        title:$(title).text().replace(/\n/g, '').replace(/ 查看»/g, '').trim()
      }
    })
    const contents = $('.mcon.noi.f14').eq(1).find('p.l180').toArray().map((content: any) => {
        return StringUtil.formatUnicode($(content).html()).replace(/<span class=\"pink\">/g,'').replace(/<\/span>/g,'').split('<br>')
    })
    const paragraphs = titles.map((item, index) => {
      return {
        ...item,
        content:contents[index]
      }
    })

    res.send({
      code: 200,
      data: {
        key,
        paragraphs,
      },
    })
  },
}
