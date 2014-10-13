define(['app/app'], function(app){
	
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise({
			redirectTo: '/home'
		});

		$routeProvider.when('/home', {
			templateUrl: '/js/app/pages/home/views/page.html',
			controller: 'HomeController'
		});
	}]);
});