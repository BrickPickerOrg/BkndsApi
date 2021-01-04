import { StringUtil } from '../../common/util/string_util'

module.exports = {
  /**
   * @api {get} /base/yilin/home
   * @apiDescription 获取意林杂志列表
   * @apiGroup 【base】
   * @apiVersion 0.0.0
   */
  async ['/home']({ res, request, cheerio }) {
    const html = await request.send(`https://www.yilinzazhi.com/`)
    const $ = cheerio.load(html)
    const $booklist = $('.tagContent .booklist td a')
    const booklist = $($booklist)
      .toArray()
      .map((item: any) => {
        const $item = $(item)
        const url = $item.attr('href')
        const match = url.match(/^(.*?)\/index.html$/)
        const id = match ? match[1] : ''
        const name = id.split('_')[0] + '年第' + id.split('_')[1] + '期'
        return {
          id,
          name,
          url,
        }
      })
    res.send({
      code: 200,
      data: { booklist },
    })
  },

  /**
   * @api {get} /base/yilin/article_list
   * @apiDescription 获取意林杂志文章目录
   * @apiGroup 【base】
   * @apiParam {string} id 杂志ID
   * @apiVersion 0.0.0
   */
  async ['/article_list']({ res, req, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(
      `https://www.yilinzazhi.com/${id}/index.html`
    )
    const $ = cheerio.load(html)
    const $maglist = $('.maglistbox dl')
    const articleList = $($maglist)
      .toArray()
      .map((item: any) => {
        const $item = $(item)
        const columnName = $item.find('dt').text()
        const $nodelist = $item.find('dd .maglisttitle a')
        const list = $($nodelist)
          .toArray()
          .map((mag: any) => {
            const $mag = $(mag)
            const name = $mag.text()
            const url = $mag.attr('href')
            const match = url.match(/^yili(.*?)\.html$/)
            const articleId = match ? match[1] : ''
            return {
              id: articleId,
              name: StringUtil.replaceSymbol(name),
              url: `https://www.yilinzazhi.com/${id}/${url}`,
            }
          })
        return {
          id,
          column_name: StringUtil.replaceSymbol(columnName),
          articles: list,
        }
      })
    res.send({
      code: 200,
      data: { article_list: articleList },
    })
  },

   /**
   * @api {get} /base/yilin/article_detail
   * @apiDescription 获取意林杂志文章详情
   * @apiGroup 【base】
   * @apiParam {string} id 文章ID
   * @apiVersion 0.0.0
   */
  async ['/article_detail']({ res, req, request, cheerio }) {
    const { url } = req.query
    const html = await request.send(url)
    const $ = cheerio.load(html)
    const articleName = $('.blkContainerSblk.collectionContainer h1').text()
    const author = $(
      '.blkContainerSblk.collectionContainer .artInfo #pub_date'
    ).text()
    const media = $(
      '.blkContainerSblk.collectionContainer .artInfo #media_name'
    ).text()
    const content = $('div.blkContainerSblkCon').html()

    res.send({
      code: 200,
      data: {
        article_name: articleName,
        author: StringUtil.replaceSymbol(author),
        media: StringUtil.replaceSymbol(media),
        content: StringUtil.formatUnicode(content),
      },
    })
  },
}
