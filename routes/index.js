const router = require('express').Router()
router.get('/', function(req, res) {
  res.render('index', { title: 'Bknds API', content: '<h1>Bknds API</h1>' })
})
module.exports = router
