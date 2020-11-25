import { StringUtil } from '../../common/util/string_util'

module.exports = {
  /**
   * @api {get} /weather/air/list
   * @apiDescription 空气质量城市列表
   * @apiGroup 【天气】
   * @apiParam {string} sort 列表排序方式
   * @apiVersion 0.0.0
   */
  async ['/list']({ req, res, request, cheerio }) {
    const { sort } = req.query
    const html = await request.send({
      url: `https://www.tianqi.com/air/?o=${sort}`,
      headers: {
        'referer': 'https://www.tianqi.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:82.0) Gecko/20100101 Firefox/82.0'
      },
    })
    const $ = cheerio.load(html)
    const result = $('.aqi_ranklist li.clearfix').toArray().map((item: any) => {
      const regx = /\/air\/(.*?)\.html/
      return {
        id: $(item).find('span').eq(1).find('a').attr('href').match(regx)[1],
        sort: $(item).find('span').eq(0).text(),
        city: $(item).find('span').eq(1).text(),
        provinces: $(item).find('span').eq(2).text(),
        index: $(item).find('span').eq(3).text(),
        level: $(item).find('span').eq(4).text().replace(/\n/g,''),
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
   * @api {get} /weather/air/detail
   * @apiDescription 空气质量城市详情
   * @apiGroup 【天气】
   * @apiParam {string} id 城市id
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send({
      url: `https://www.tianqi.com/air/${id}.html`,
      headers: {
        'referer': 'https://www.tianqi.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:82.0) Gecko/20100101 Firefox/82.0'
      },
    })
    const $ = cheerio.load(html)
    const text = $('.air_canvaspic .air_canvas_desc').text().replace(/\n/g,'')
    const warmtips = $('.air_warmtips .rank_jump').text().replace(/\n/g,'')
    const index = $('.air_canvaspic .air_canvaspictitle').text()
    const date = $('.baseinfo_date').text()
    const city = $('.baseinfo_position').text()
    const pollutants = $('.air_pollution .air_pitem li').toArray().map((item: any) => {
      return {
        pollute_item: $(item).find('.pollute_item').text(),
        value: $(item).find('.pollute_data span').eq(0).text(),
        level: $(item).find('.pollute_data span').eq(1).text().replace(/\n/g,''),
      }
    })
    
    res.send({
      code: 200,
      data: {
        city,
        date,
        index,
        text,
        warmtips,
        pollutants
      },
    })
  },

  /**
   * @api {get} /weather/air/search
   * @apiDescription 通过城市名搜索
   * @apiGroup 【天气】
   * @apiParam {string} city 城市名
   * @apiVersion 0.0.0
   */
  async ['/search']({ req, res, request, cheerio }) {
    const { city } = req.query
    const html = await request.send({
      url: `https://www.tianqi.com/air/`,
      headers: {
        'referer': 'https://www.tianqi.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:82.0) Gecko/20100101 Firefox/82.0'
      },
    })
    const $ = cheerio.load(html)
    const result = $('.aqi_ranklist li.clearfix').toArray().map((item: any) => {
      const regx = /\/air\/(.*?)\.html/
      return {
        id: $(item).find('span').eq(1).find('a').attr('href').match(regx)[1],
        sort: $(item).find('span').eq(0).text(),
        city: $(item).find('span').eq(1).text(),
        provinces: $(item).find('span').eq(2).text(),
        index: $(item).find('span').eq(3).text(),
        level: $(item).find('span').eq(4).text().replace(/\n/g,''),
      }
    })

    const arr = result.filter(item => {
      return item.city === city
    })
    
    res.send({
      code: 200,
      data: {
        result: arr
      },
    })
  },

  /**
   * @api {get} /weather/air/pm25List
   * @apiDescription 获取PM2.5新闻列表
   * @apiGroup 【天气】
   * @apiVersion 0.0.0
   */
  async ['/pm25List']({ req, res, request, cheerio }) {
    const html = await request.send(`https://m.tianqi.com/zhuanti/PM25`)
    const $ = cheerio.load(html)
    const result = $('.ocetwo').eq(1).find('.diandian').toArray().map((item: any) => {
      const regx = /\/news\/(.*?)\.html/
      return {
        id: $(item).attr('href').match(regx)[1],
        title: $(item).text().replace(/\n/g,''),
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
   * @api {get} /weather/air/pm25Detail
   * @apiDescription 获取PM2.5新闻详情
   * @apiGroup 【天气】
   * @apiVersion 0.0.0
   */
  async ['/pm25Detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`https://m.tianqi.com/news/${id}.html`)
    const $ = cheerio.load(html)
    const title = $('.news_read h1').text().replace(/\n/g,'')
    const content = $('.news_read #readtxt').html()
    
    res.send({
      code: 200,
      data: {
        title,
        content: StringUtil.formatUnicode(content).replace('全国污染指数查询：http://www.tianqi.com/air/', ''),
      },
    })
  },
}
