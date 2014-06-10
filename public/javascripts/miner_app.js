var minerApp = angular.module('minerApp', ['ngRoute', 'minerControllers']);



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
