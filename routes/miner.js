var express = require('express');
var miner_api = require('miner_api');
var router = express.Router();
var async = require('async');

var resultsArr = [];
var getMinerStatus = function(miner, callback) {
	miner_api.getStatus(miner.ip, miner.port, function(err, results) {
		if(err) {
			callback(err);
		} else {
			var resultset = [miner.ip, results];
			resultsArr.push(resultset);
			callback(null);
		}
	});
};
router.get('/status', function(req, res) {
	if(!req.miners)
		res.send(500, "Database error");

	resultsArr = [];
	async.each(req.miners, getMinerStatus, function(err) {
		if(err)
			res.send(500, "Database error");
		else
			res.json(resultsArr);
	});
});

// TODO FIX
router.put('/', function(req,res) {
	if(!req.body.url || !req.body.port || !req.body.key)
		res.send(500, "Invalid request");
	console.dir(res);
	res.send(miner);
});

module.exports = router;

