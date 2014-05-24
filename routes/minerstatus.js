var express = require('express');
var router = express.Router();
var rpc = require('miner-rpc');

router.get('/', function(req, res) {
	//var client = rpc.client(host, port);
	res.send('hello friend');
});

module.exports = router;
