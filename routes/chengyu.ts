module.exports = {
  /**
   * @api {get} /chengyu/search
   * @apiDescription 成语搜索
   * @apiGroup 【成语】
   * @apiParam {string} key 成语名称 支持模糊搜索
   * @apiVersion 0.0.0
   */
  async ['/search']({ req, res, request, cheerio }) {
    const { key } = req.query
    const html = await request.send(
      `https://www.chengyuwang.com/chaxun.php?q=${key}`
    )
    const $ = cheerio.load(html)
    const result = $('.content-left dl dd a')
      .toArray()
      .map((item: any) => {
        return {
          id: $(item)
            .attr('href')
            .replace(/\.html/g, '')
            .replace(/\//g, ''),
          name: $(item).text().trim(),
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
   * @api {get} /chengyu/detail
   * @apiDescription 成语详情
   * @apiGroup 【成语】 
   * @apiParam {string} id 成语id
   * @apiVersion 0.0.0
   */
  async ['/detail']({ req, res, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`https://www.chengyuwang.com/${id}.html`)
    const $ = cheerio.load(html)
    const maincontent = $('.maincontent dl')
      .toArray()
      .map((item: any) => {
        const title = $(item).find('dt').text()
        const dd = $(item)
          .find('dd')
          .toArray()
          .map((dd: any) => {
            return $(dd).text().replace(/\n/g,'').trim()
          })
        
        const a = $(item)
        .find('a')
        .toArray()
        .map((a: any) => {
          return {
            id: $(a)
              .attr('href')
              .replace(/\.html/g, '')
              .replace(/\//g, ''),
            name: $(a).text().replace(/\n/g, '').trim(),
          }
        })

        return {
          title: title,
          dd: dd,
          a:a
        }
      })

    res.send({
      code: 200,
      data: {
        maincontent,
      },
    })
  },

  /**
   * @api {get} /chengyu/resou
   * @apiDescription 成语热搜
   * @apiGroup 【成语】
   * @apiVersion 0.0.0
   */
  async ['/resou']({ req, res, request, cheerio }) {
    const html = await request.send(`https://www.chengyuwang.com`)
    const $ = cheerio.load(html)
    const items = $('.col-md-4.content-right dl').first().find('a')
      .toArray()
      .map((item: any) => {
        return {
          id: $(item)
            .attr('href')
            .replace(/\.html/g, '')
            .replace(/\//g, ''),
          name: $(item).text().trim(),
        }
      })

    res.send({
      code: 200,
      data: {
        items,
      },
    })
  },
}
