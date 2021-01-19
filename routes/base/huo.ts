import convert from './huoxingwen'

module.exports = {
  /**
   * @api {get} /base/huo
   * @apiDescription 火星文转换
   * @apiGroup 【base】
   * @apiParam {string} type 0简体, 1繁体, 2火星文
   * @apiParam {string} key 日期 格式yyyymmdd
   * @apiVersion 0.0.0
   */
  async ['/']({ req, res }) {
    const { type, key } = req.query
    res.send({
      code: 200,
      data: {
        text: convert(type, key),
      },
    })
  },
}
