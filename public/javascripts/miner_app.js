var minerApp = angular.module('minerApp', ['ngRoute', 'ngSanitize', 'minerControllers', 'minerApp.shared_data', 'minerApp.shared_functions']);

angular.module("minerApp.shared_data", []).factory('shared_data', function (){
	return {};
});

angular.module("minerApp.shared_functions", []).factory('shared_functions', function (){
	return {
		flash: function (message, type){
			console.log(type);
			var css;
			if(type == 'success')
				css = 'alert alert-success fade in';
			else
				css = 'alert alert-danger fade in';
			return '<div class="' + css + '">' + message + '</div>';
		}
	};
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
