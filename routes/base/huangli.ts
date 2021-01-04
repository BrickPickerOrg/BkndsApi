module.exports = {
  /**
   * @api {get} /base/huangli
   * @apiDescription 老黄历查询
   * @apiGroup 【base】
   * @apiParam {string} date 日期 格式yyyymmdd
   * @apiVersion 0.0.0
   */
  async ['/']({ req, res, request, cheerio }) {
    const { date } = req.query
    const html = await request.send(`https://www.8684.cn/lhl_d_${date}`)
    const $ = cheerio.load(html)
    const day = $('.top .date-info .day').text()
    const scxs = $('p.text-scxs a').text().replace(/。/g, '').split('，')
    const yi = $('.yj-group .list').first().text().trim()
    const ji = $('.yj-group .list').last().text().trim()
    const details = $('.date-detail li').toArray()
    .map((li: any) => {
      return {
        title:$(li).find('p').first().text(),
        content:$(li).find('p').last().text()
      } 
    })

    const scjr = $('.scjr li').toArray()
    .map((li: any) => {
      return {
        cnTime:$(li).find('.cn-time p').text(),
        time:$(li).find('.cn-time span.time').text(),
        yi:$(li).find('.yj-text .y').text().replace(/【宜】/g, '').trim(),
        ji:$(li).find('.yj-text .j').text().replace(/【忌】/g, '').trim(),
      } 
    })

    res.send({
      code: 200,
      data: {
        day,
        scxs,
        yi,
        ji,
        details,
        scjr
      },
    })
  },
}
