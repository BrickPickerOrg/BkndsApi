module.exports = {
  /**
   * @api {get} /twelve_animals/luck
   * @apiDescription 生肖运势
   * @apiGroup 【十二生肖】
   * @apiParam {string} code 生肖code
   * @apiParam {string} cury 需要查询的年份
   * @apiParam {string} sxy 生肖年份
   * @apiVersion 0.0.0
   */
  async ['/luck']({ req, res, request, cheerio }) {
    const { code, cury, sxy } = req.query
    const url = `https://m.xzw.com/sxys/${code}/${cury}/${sxy}/`
    const html = await request.send(url)
    const $ = cheerio.load(html)

    const avatar = $('.mpart .tbox .sx img').attr('src')
    const name = $('.mpart .tbox .sx em').text()
    const yearList = $('.mpart .tbox .sx li')
      .toArray()
      .map((item: any) => $(item).find('a').text())
    const titles = $('article.cont h2')
      .toArray()
      .map((h2: any) => $(h2).text())

    const contents = $('article.cont p')
      .toArray()
      .map((p: any) => $(p).text())

    const luckList = titles.map((title: String, index: any) => {
      return {
        title: title,
        content: contents[index],
      }
    })

    const star = $('.m_star.m_star_ap em').css('width')

    res.send({
      code: 200,
      data: {
        avatar: `https://m.xzw.com${avatar}`,
        name,
        star: (parseInt(star) / 4) * 5,
        yearList,
        luckList,
      },
    })
  },

  /**
   * @api {get} /twelve_animals/match
   * @apiDescription 生肖匹配
   * @apiGroup 【十二生肖】
   * @apiParam {string} male 男生肖code
   * @apiParam {string} female 女生肖code
   * @apiVersion 0.0.0
   */
  async ['/match']({ req, res, request, cheerio }) {
    const { male, female } = req.query
    const getMatchId = (male, female) => {
      const lQ = 4 % 7
      const lA = male * lQ + 4
      const sA = lA.toString().length
      const lB = female * lQ + 4
      const sB = lB.toString().length
      return sA + '' + sB + '' + 0 + '' + 0 + '' + lA + '' + lB
    }
    const matchId = getMatchId(male, female)

    const url = `https://m.xzw.com/cx/4/${matchId}.html`
    const html = await request.send(url)
    const $ = cheerio.load(html)

    const title = $('h2.title').text()
    const evaluation = $('.pair_card.sxcard h3').text()
    const evaluationDesc = $('.pair_card.sxcard p').text()
    const count = $('.pair_card.sxcard .fen span').eq(1).text()
    const maleName = $('.pair_card.sxcard .fen span').first().text()
    const femaleName = $('.pair_card.sxcard .fen span').last().text()
    const maleAvatar = $('.pair_card.sxcard .fen span')
      .first()
      .find('img')
      .attr('src')
    const femaleAvatar = $('.pair_card.sxcard .fen span')
      .last()
      .find('img')
      .attr('src')
    const content = $('.wrapper article p').text()

    res.send({
      code: 200,
      data: {
        title,
        maleName,
        femaleName,
        maleAvatar: `https://m.xzw.com${maleAvatar}`,
        femaleAvatar: `https://m.xzw.com${femaleAvatar}`,
        evaluation,
        evaluationDesc,
        count: parseInt(count),
        content,
      },
    })
  },
}
