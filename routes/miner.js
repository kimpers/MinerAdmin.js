var express = require('express');
var miner_api = require('miner_api');
var router = express.Router();


router.get('/status', function(req, res) {
	miner_api.getStatus('192.168.1.2', 4028, function(err, results) {
		if(err) {
			console.error(err);
			res.send(500, "Error commuicating with miner")
		} else
			res.send(results);
	});
});
module.exports = router;
