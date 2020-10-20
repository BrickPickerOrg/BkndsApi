/// <reference path="./common/interface/router_interface.ts" />
import createError = require('http-errors')
import express = require('express')
import path = require('path')
import fs = require('fs')
import cheerio = require('cheerio')
import { request } from './common/util/request'
const app = express()

// 路由文件
const filesList = []

//递归读取文件夹下所有文件
function readFileList(dir, list = []) {
  const files = fs.readdirSync(dir)
  files.forEach((item) => {
    var fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), list)
    } else {
      list.push(fullPath)
    }
  })
  return list
}

readFileList(path.join(__dirname, 'routes'), filesList)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

filesList.forEach((file) => {
  const match = file.match(/routes\/(.*)(\.js|\.ts)$/)
  if (match) {
    const filename = match[1]
    app.use(`/${filename}`, (req, res, next) => {
      const router = express.Router()
      req.query = {
        ...req.query,
        ...req.body,
      }
      const RouterMap: RouterInterface.RouterMap = require(`./routes/${filename}`)
      Object.keys(RouterMap).forEach((path: string): void => {
        let rObj = RouterMap[path]
        if (typeof rObj === 'function') {
          rObj = {
            func: rObj,
            post: true,
            get: true,
          }
        }
        const func = (req, res, next) =>
          rObj.func({
            req,
            res,
            next,
            request: new request({ req, res, next }),
            cheerio,
            port: app.get('port'),
          })
        if (rObj.post) {
          router.post(path, func)
        }
        if (rObj.get) {
          router.get(path, func)
        }
      })
      router(req, res, next)
    })
  }
})
app.use('/', require('./routes/index'))

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
