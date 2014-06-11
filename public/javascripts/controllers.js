var minerControllers = angular.module('minerControllers', []);

minerControllers.controller('mainController', ['$scope', '$http', '$interval',
		'$window','shared_data', function($scope, $http, $interval, $window, shared_data) {
			console.log(shared_data);


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
					shared_data.status = data;
					$scope.status = data;
				}
			});
		};
		getStatus();
		$interval(getStatus, 10000);
	}
]);
minerControllers.controller('settingsController', ['$scope', '$http', '$interval',
		'$window', 'shared_data', function($scope, $http, $interval, $window, shared_data) {
			// If ww don't have the data we need fetch it ourselves
			if(!shared_data.status) {
				$http.get('/miner/status').success(function(data) {
					if(data.error == 'unauthenticated'){
						$window.location.href = '/login';
					} else {
						shared_data.status = data;
						$scope.status  = data;
					}
				});
			}else {
				$scope.status  = shared_data.status;
				console.dir($scope.status);
			}
}]);
