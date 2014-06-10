var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/partials/home.html', function(req, res) {
	res.render('partials/home');
});

router.get('/partials/settings.html', function(req, res) {
	res.render('partials/settings');
});
module.exports = router;
