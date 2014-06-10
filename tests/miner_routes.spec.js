request = require('request');

describe("REST Routes", function() {
	it("should get miner status", function(done) {
		request("http://localhost:3000/miner/status", function(error, response, body){
			expect(error).toBe(null);
			expect(body).toContain("SUMMARY");
			expect(body).toContain("DEVS");
			expect(body).toContain("ACTIVE_POOL");
			done();
		});
	});
});
