import { StringUtil } from '../common/util/string_util'

module.exports = {
  async ['/resou']({ res, request, cheerio }) {
    const html = await request.send(`https://smartmll.com/`)
    const $ = cheerio.load(html)
    const resou = $('.inname.small.huise.resou.width94 a')
    const resouList = $(resou)
      .toArray()
      .map((item: any) => {
        return $(item).text().trim()
      })

    res.send({
      code: 200,
      data: {
        resouList,
      },
    })
  },

  async ['/search']({req, res, request, cheerio }) {
    const { key } = req.query
    const html = await request.send(`https://smartmll.com/?s=${key}`)
    const $ = cheerio.load(html)
    const rest = $('.rest')
    const catpic = $('.catpic img')
    const catpicList = $(catpic).toArray().map((item: any) => {
      return `https://smartmll.com/${$(item).attr('src')}`
    })
    const restList = $(rest).toArray().map((item: any) => {
      return $(item).text().trim()
    })

    const keyword = restList[0].replace("你所查询的是：","")
    const recommended = restList[1].replace("建议分类：","")
    const all = restList[3].replace("全国分类：","").replace(/\n/g,"")

    res.send({
      code: 200,
      data: {
        keyword,
        recommended,
        all,
        catpicList
      },
    })
  },

  async ['/aaa']({ res, request, cheerio }) {
    const html = await request.send(`https://smartmll.com/`)
    const $ = cheerio.load(html)
    const resou = $('.inname.small.huise.resou.width94 a')
    const resouList = $(resou)
      .toArray()
      .map((item: any) => {
        return $(item).text().trim()
      })

    res.send({
      code: 200,
      data: {
        resouList,
      },
    })
  },
}
