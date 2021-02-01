import { StringUtil } from '../../common/util/string_util'
module.exports = {
  /**
   * @api {get} /base/daily/list
   * @apiDescription 每日一句英语口语
   * @apiParam {string} id 页码ID
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/list']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://www.kekenet.com/kouyu/primary/chuji/${id ? `List_${id}.shtml` : ''}`)
    const $ = cheerio.load(html)
    const regx = /(.*?)\.shtml/
    const result = $('#menu-list li')
      .toArray()
      .map((item: any) => {
        const href = $(item).find('a').attr('href').match(regx)[1]
        const title = $(item).find('h2').text().trim().split(/:/)
        const date = $(item)
          .find('p')
          .text()
          .trim()
          .match(/(.{4})-(.{2})-(.{2})/)[0]
        return {
          href,
          title,
          date,
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
   * @api {get} /base/daily/detail
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
    const htmlmp3 = await request.send(
      `http://www.kekenet.com${href}.shtml`.replace('kouyu', 'mp3')
    )
    const $1 = cheerio.load(htmlmp3)
    const audio = $1('.lastPage_left table').find('a').eq(1).attr('href')

    res.send({
      code: 200,
      data: {
        en,
        zh,
        audio,
      },
    })
  },

  /**
   * @api {get} /base/daily/news_list
   * @apiDescription 每日一句英语口语
   * @apiParam {string} id 页码ID
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/news_list']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://www.kekenet.com/Article/16001/List_${id}.shtml`)
    const $ = cheerio.load(html)
    const regx = /http:\/\/www.kekenet.com\/Article\/(.*?)\.shtml/
    const result = $('#menu-list li').toArray().map((item: any) => {
      const cover = $(item).find('a').eq(0).find('img').attr('src')
      const id = $(item).find('h2').find('a').eq(1).attr('href').match(regx)[1]
      const title = $(item).find('h2').find('a').eq(1).text().trim().split(':')
      const date = $(item).find('p').text().trim().match(/(.{4})-(.{2})-(.{2})/)[0]
      return {
        cover,
        id,
        title,
        date,
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
   * @api {get} /base/daily/news_detail
   * @apiDescription 每日一句 英文新闻
   * @apiParam {string} href 详情地址
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/news_detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://www.kekenet.com/Article/${id}.shtml`)
    const $ = cheerio.load(html)
    const title = $('#nrtitle').text().trim()
    const content = $('#article .info-qh').html()
    const htmlmp3 = await request.send(`http://www.kekenet.com/mp3/${id}.shtml`)
    const $1 = cheerio.load(htmlmp3)
    const audio = $1('.lastPage_left table').find('a').eq(1).attr('href')
    res.send({
      code: 200,
      data: {
        title,
        content: StringUtil.formatUnicode(content).replace('译文属可可英语原创，未经允许，不得转载。', '').replace('译文属可可原创，仅供学习交流使用，未经许可请勿转载。', '').replace('来源:可可英语', '').replace('可可', 'Daily每日'),
        audio
      },
    })
  },
}
