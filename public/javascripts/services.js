var minerServices = angular.module('minerServices', ['ngResource']);

minerServices.factory('Status', [$resource,
	function($resource) {
		//return $resource('/miner/status', {}, {
				//query: {method: 'GET', isArray: true}
		//});
		return 'hello factory';
}]);

