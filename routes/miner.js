var express = require('express');
var miner_api = require('miner_api');
var router = express.Router();
var async = require('async');

var resultsArr = [];
var getMinerStatus = function(miner, callback) {
	miner_api.getStatus(miner.attributes.url, miner.attributes.ip, function(err, results) {
		if(err) {
			console.error(err);
			callback(err);
		} else {
			var resultset = [miner.attributes, results];
			resultsArr.push(resultset);
			callback(null);
		}
	});
};
router.get('/status', function(req, res) {
	if(!req.miners)
		res.send(500, "Database error");

	async.each(req.miners, getMinerStatus, function(err) {
		if(err)
			res.send(500, "Database error");
		else
			res.json(resultsArr);
	});
});

router.put('/', function(req,res) {
	if(!req.body.url || !req.body.port || !req.body.key)
		res.send(500, "Invalid request");

	var miner = new Miner();
	miner.set("url", req.body.url);
	miner.set("port", req.body.port);
	miner.set("key", req.body.key);
	miner.save();
	console.dir(res);
	res.send(miner);
});

module.exports = router;

