const router = require('express').Router();
router.get('/', function(req, res) {
  res.render('index', { title: '青椒API', content: '<h1>青椒API</h1>' });
});
module.exports = router;
