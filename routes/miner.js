var express = require('express');
var router = express.Router();
var xgminer = require('xgminer');

var client = new xgminer('192.168.1.2', 4028);

router.get('/status', function(req, res) {
	var ret = {};
	client.summary().then(function (data) {
		console.log(data[ 'SUMMARY' ]);
		ret.SUMMARY = data[ 'SUMMARY' ];
		client.devs().then(function (data) {
			ret.DEVS = data['DEVS'];
			res.send(ret);
		},function (err) {
			console.error(err);
		});
	}, function (err) {
		// an error occurred
		console.error(err);
	});
});
module.exports = router;
