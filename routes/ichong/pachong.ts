module.exports = {
  /**
   * @api {get} /ichong/pachong/list
   * @apiDescription 宠物列表
   * @apiGroup 【宠物】
   * @apiParam {string} type 宠物类别【wugui zhizhu xiyi】
   * @apiVersion 0.0.0
   */
  async ['/list']({ req, res, request, cheerio }) {
    const { type } = req.query
    const url = `http://www.ichong123.com/${type}`
    const html = await request.send(url)

    const $ = cheerio.load(html)
    const list = $('.pet_list .pet_s').toArray().map((petItem: any) => {
      const match = $(petItem).find('p a').attr('href').match(/http:\/\/www\.ichong123\.com\/(.*?)\/(.*?)$/)
      return {
        img: $(petItem).find('img').attr('src'),
        name: $(petItem).find('p').text().trim(),
        id: match ? match[2] : '',
        key: match ? match[1] : '',
      }
    })

    res.send({
      code: 200,
      data: {
        list:list.filter((item) => item.id && item.img !== 'http://www.ichong123.com/'),
      },
    })
  },

  /**
   * @api {get} /ichong/pachong/detail
   * @apiDescription 宠物详情
   * @apiGroup 【宠物】
   * @apiParam {string} id 宠物ID
   * @apiParam {string} key 宠物类别
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { key, id } = req.query
    const url = `http://www.ichong123.com/${key}/${id}`
    const html = await request.send(url)

    const $ = cheerio.load(html)
    const img = $('.spec-l .specimg img').attr('src')
    const valtxt = $('.spec-l .specimg .valtxt').text().trim()
    const name = $('.spec-r .smain .smaintit h1').text().trim()
    const intro = $('.spec-r .smain .sintro').text().trim()

    const desc = $('.spec-r .swrap').toArray().map((item: any) => {
      return {
        title: $(item).find('.stit').text().trim(),
        content: $(item).find('.sxwrap').text().trim(),
      }
    })

    res.send({
      code: 200,
      data: {
        name,
        img,
        valtxt,
        intro,
        desc
      },
    })
  },
}
