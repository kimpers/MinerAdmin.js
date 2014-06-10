var minerControllers = angular.module('minerControllers', []);

minerControllers.controller('mainController', ['$scope', '$http', '$interval',
		'$window', function($scope, $http, $interval, $window) {
		$scope.message = 'Hello';

		//TODO Let user choose values for different statuses
		$scope.gpuStatus = function(temp) {
			if (temp > 80)
				return"danger";
			else if(temp > 60)
				return "warning";
			else
				return "success";
		};

		$scope.poolStatus = function(summary) {
			if(summary["MHS 5s"] > 0 && summary["Device Rejected%"] < 5 &&
				 summary["Device Hardware%"] < 1)
			 return "success";
			else
				return "danger";
		};

		var getStatus = function() {
			$http.get('/miner/status').success(function(data) {
				if(data.error == 'unauthenticated'){
					$window.location.href = '/login';
				} else {
					$scope.status = data;
				}
			});
		};
		getStatus();
		$interval(getStatus, 10000);
	}
]);
minerControllers.controller('settingsController', ['$scope', '$http', '$interval',
		'$window', function($scope, $http, $interval, $window) {
			$scope.settings = 'hello';
}]);
