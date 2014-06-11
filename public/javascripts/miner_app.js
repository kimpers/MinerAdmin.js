var minerApp = angular.module('minerApp', ['ngRoute', 'minerControllers', 'minerApp.shared_data']);

angular.module("minerApp.shared_data", []).factory('shared_data', function (){
	return {};
});

minerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/home.html',
				controller: 'mainController'
      }).
			when('/settings', {
					templateUrl: '/partials/settings.html',
					controller: 'settingsController'
			}).
      otherwise({
        redirectTo: '/'
      });
  }]);
