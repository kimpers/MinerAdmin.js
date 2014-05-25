var express = require('express');
var router = express.Router();
var xgminer = require('xgminer');
var async = require('async');

var client = new xgminer('192.168.1.2', 4028);


var getSummary = function(callback) {
	client.summary().then(function (data) {
		console.log("getDevs done");
		callback(null, data['SUMMARY']);
	}, function (err) {
		// an error occurred
		console.error(err);
	});
}

var getDevs = function(callback) {
	client.devs().then(function (data) {
		console.log("getDevs done");
		callback(null,data['DEVS']);
	},function (err) {
		callback(err,null);
	});
}

router.get('/status', function(req, res) {
	var ret = {};
	async.parallel({
			SUMMARY: getSummary,
			DEVS: getDevs
	},
	function(err, results) {
		// results is now equals to: {one: 1, two: 2}
		console.log('Async done');
		if(err)
			console.error(err);
		res.send(results);
	});
});
module.exports = router;
