export class StringUtil {
  static getQueryFromUrl(key: string, search: string): any {
    try {
      const stringArray: string[] = search.split('?')
      let _string: string = ''
      if (stringArray.length > 1) {
        _string = stringArray[1]
      } else {
        return key ? undefined : {}
      }

      const querys: string[] = _string.split('&')
      const result: object = {}
      querys.forEach((item: string): void => {
        const temp: string[] = item.split('=')
        result[temp[0]] = decodeURIComponent(temp[1])
      })
      return key ? result[key] : result
    } catch (err) {
      return key ? '' : {}
    }
  }

  static changeUrlQuery(obj: object, baseUrl: string = ''): string {
    const query: object = this.getQueryFromUrl(null, baseUrl)
    const url: string = baseUrl.split('?')[0]
    const newQuery: object = { ...query, ...obj }
    const queryArr: string[] = []

    Object.keys(newQuery).forEach((key: string): void => {
      if (newQuery[key] !== undefined && newQuery[key] !== '') {
        queryArr.push(`${key}=${encodeURIComponent(newQuery[key])}`)
      }
    })
    return `${url}?${queryArr.join('&')}`.replace(/\?$/, '')
  }

  static replaceSymbol(string: string): string {
    return string.replace(/(\n)|(\t)/g, '').trim()
  }

  static formatUnicode(string: string): string {
    return this.getTopicDescription(
      this.replaceSymbol(
        unescape(string.replace(/&#x/g, '%u').replace(/;/g, ''))
      )
    )
  }

  static getTopicDescription(body: string): string {
    let res = body.match(/<p[^>]*>(.*?)<\/p>/g)
    return res != null ? res.join('\n').replace(/<[^>]+>/g, '') : ''
  }
}
