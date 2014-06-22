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

router.post('/', function(req,res) {
	if(!req.body.ip || !req.body.port)
		res.json({status: 'error'});
	else {
		req.db.collection('miners').insert(req.body, function (err, results) {
			if(err)
				res.json({status: 'error'});
			else
				res.json({status: 'success'});
		});
	}
});

module.exports = router;

