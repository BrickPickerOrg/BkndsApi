module.exports = {
  /**
   * @api {get} /constellation/match
   * @apiDescription 星座匹配
   * @apiGroup 【星座】
   * @apiParam {number} male 男生星座ID
   * @apiParam {number} female 女生星座ID
   * @apiVersion 0.0.0
   */
  async ['/match']({ req, res, request, cheerio }) {
    const getMatchId = (maleId: number, femaleId: number) => {
      let lA = maleId * 2 + 2
      let lB = femaleId * 2 + 2
      let sA = lA.toString().length
      let sB = lB.toString().length
      let id = sA + '' + sB + '' + 0 + '' + 0 + '' + lA + '' + lB
      return id
    }
    const { male, female } = req.query
    const matchId = getMatchId(male, female)
    const html = await request.send(`https://m.xzw.com/cx/2/${matchId}.html`)
    const $ = cheerio.load(html)
    const title = $('h2.title').text()
    // 配对分数
    const score = $('.pair_card .fen span').text()
    // 男生头像
    const maleImg = $('.pair_card .fen .male img').attr('src')
    // 女生头像
    const femaleImg = $('.pair_card .fen .female img').attr('src')
    // 配对评语
    const comment = $('.pair_card h3').text()
    // 配对男生比重
    const maleProportion = $('.card_con .pair_bz span').first().text()
    // 配对女生比重
    const femaleProportion = $('.card_con .pair_bz span').last().text()
    // 两情相悦值
    const lqxy = $('.card_con ul li').first().find('.m_star em').css('width')
    // 天长地久值
    const tcdj = $('.card_con ul li').last().find('.m_star em').css('width')
    const advice = $('article p').first().text()
    const attention = $('article p').last().text()

    res.send({
      code: 200,
      data: {
        title,
        score,
        maleImg: `https://m.xzw.com${maleImg}`,
        femaleImg: `https://m.xzw.com${femaleImg}`,
        comment,
        maleProportion,
        femaleProportion,
        lqxy: (parseInt(lqxy) / 100) * 5,
        tcdj: (parseInt(tcdj) / 100) * 5,
        advice,
        attention,
      },
    })
  },
}
