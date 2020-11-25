var axios = require('axios')
var { StringUtil } = require('./string_util.ts')

interface Headers {
  Cookie?: string
  [propName: string]: any
}

interface AxiosParams {
  url: string
  dataType?: string
  data?: object
  method?: string
  headers?: Headers
  xsrfCookieName?: string
  withCredentials?: boolean
  [propName: string]: any
}

interface ResObj {
  data: string
}

interface requestConstructor {
  req?: any
  res?: any
  next?: any
}

export class request {
  req: { cookies: {}; userCookie: {}; query: { ownCookie: false } }
  res: { send: ({}) => {} }
  next: null

  constructor({ req, res, next }: requestConstructor) {
    this.req = req || this.req
    this.res = res || this.res
    this.next = next
  }

  async send(options: AxiosParams | string): Promise<any> {
    try {
      if (typeof options === 'string') options = { url: options }

      options.method = options.method || 'GET'
      const { url, data, method } = options
      const _referer = 'http://music.migu.cn/v3'

      if (method === 'GET') {
        options.url = StringUtil.changeUrlQuery(data, url)
        delete options.data
      }

      options.headers = options.headers || {}
      options.headers.referer = options.headers.referer || _referer
      options.headers.Referer = options.headers.referer
      console.log(options.headers.Referer)
      const res: ResObj = await axios(options)
      return res.data
    } catch (err) {
      const { res } = this
      if (!res) return {}

      res.send({
        result: 400,
        errMsg: `系统异常：${err.message}`,
      })
    }
  }
}
