var minerControllers = angular.module('minerControllers', []);

minerControllers.controller('mainController', ['$scope', '$http', '$interval',
		'$window','shared_data','shared_functions',
		function($scope, $http, $interval, $window, shared_data, shared_functions) {

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
		'$window', 'shared_data', 'shared_functions',
		function($scope, $http, $interval, $window, shared_data, shared_functions) {
			$scope.addMinerForm = {};
			$scope.processAddMinerForm = function (){
				var data = {
					ip: $scope.addMinerForm.ip,
					port: $scope.addMinerForm.port
				};
				$http.post('/miner', data).success(function (data){
					if(data.status == 'success'){
						$scope.flash =  shared_functions.flash('Successfully added miner', 'success');
					} else {
						$scope.flash = shared_functions.flash('Failed to add miner', 'danger');
					}
				});
			};
			// If we don't have the data we need fetch it ourselves
			$http.get('/miner/pools').success(function(data) {
				if(data.error == 'unauthenticated'){
					$window.location.href = '/login';
				} else {
					$scope.pools  = data;
				}
			});
}]);
