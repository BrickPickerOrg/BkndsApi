import { StringUtil } from '../common/util/string_util'

module.exports = {
  async ['/home']({ res, request, cheerio }) {
    const html = await request.send(`http://wufazhuce.com/`)
    const $ = cheerio.load(html)
    const oneCitaitems = $('.fp-one .carousel-inner .item')
    const homeCitaList = $(oneCitaitems)
      .toArray()
      .map((oneCitaitems: any) => {
        const $oneCitaitem = $(oneCitaitems)
        const detailUrl = $oneCitaitem.find('.fp-one-cita a').attr('href')
        const match = detailUrl.match(/^http:\/\/wufazhuce.com\/one\/(.*?)$/)
        const id = match ? match[1] : ''
        const text = $oneCitaitem.find('.fp-one-cita').text()
        const imgUrl = $oneCitaitem.find('.fp-one-imagen').attr('src')

        return {
          id,
          text: text.trim().replace(/^\n/, ''),
          imgUrl,
          detailUrl,
        }
      })

    res.send({
      code: 200,
      data: {
        homeCitaList,
      },
    })
  },

  async ['/article_detail']({ res, req, request, cheerio }) {
    const { id } = req.query
    const html = await request.send(`http://wufazhuce.com/article/${id}`)
    const $ = cheerio.load(html)
    // 描述
    const description = $('.articulo-principal .comilla-cerrar').text()
    // 文章标题
    const title = $('h2.articulo-titulo').text()
    // 作者
    const autorName = $('p.articulo-autor').text()
    // 责任编辑
    const editorName = $('p.articulo-editor').text()
    // 文章详情
    const content = $('div.articulo-contenido').html()

    res.send({
      code: 200,
      data: {
        title: StringUtil.replaceSymbol(title),
        description: StringUtil.replaceSymbol(description),
        autorName: StringUtil.replaceSymbol(autorName),
        editorName: StringUtil.replaceSymbol(editorName),
        content: StringUtil.formatUnicode(content),
      },
    })
  },
}
