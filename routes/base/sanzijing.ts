import { StringUtil } from '../../common/util/string_util'

module.exports = {
  /**
   * @api {get} /base/sanzijing/
   * @apiDescription 三字经列表
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/']({ res, request, cheerio }) {
    const html = await request.send(`http://www.tool5.com/sanzijing/`)
    const $ = cheerio.load(html)
    const title = $('h2').text().replace(/\n/g,'').trim()
    const directory = $('ul.l3 li').toArray().map((item: any) => {
      const regx = /\.\/(.*?)\.html/
      return {
        id: $(item).find('a').attr('href').match(regx)[1],
        title: $(item).text().replace(/\n/g,'').trim(),
      }
    })

    res.send({
      code: 200,
      data: {
        title,
        directory
      },
    })
  },

  /**
   * @api {get} /base/sanzijing/detail
   * @apiDescription 三字经详情解释
   * @apiParam {string} id 段落ID
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://m.tool5.com/sanzijing/${id}.html`)
    const $ = cheerio.load(html)
    const title = $('h1').text().replace(/\n/g,'').trim()
    const pinyin = $('.zi .sz').toArray().map((item: any) => {
      const regx = /<span>(.*?)<\/span>(.*?)$/
      const zi = $(item).find('div').toArray().map((div: any) => {
        const pinyin = $(div).find('span').text().replace(/\n/g,'').trim()
        const value = $(div).html().match(regx)[2]
        return {
          pinyin,
          value: StringUtil.replaceSymbol(unescape(value.replace(/&#x/g, '%u').replace(/;/g, ''))),
        }
      })
      return zi
    })

    const content = $('.cont p').toArray().map((p: any) => {
      return $(p).text()
    })

    const desc = content[0]

    const titles = content.filter((title: any, index: number) => {
      return (index % 2 !== 0) 
    })

    const contents = content.filter((title: any, index: number) => {
      return ((index % 2 === 0) && index !== 0) 
    })
    
    res.send({
      code: 200,
      data: {
        title,
        desc,
        pinyin,
        contents: titles.map((item: any, index: number) => {
          return {
            title: item,
            content: contents[index]
          }
        })
      },
    })
  },
}
