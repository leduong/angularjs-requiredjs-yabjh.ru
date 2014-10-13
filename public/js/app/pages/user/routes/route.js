define(['app/app'], function(app) {

	app.config(['$routeProvider',
		function($routeProvider) {

			console.group('Configuring Routes Page User');

			//Si la page est la route principale
			console.debug('definition of default route : /user');
			/*$routeProvider.otherwise({
			redirectTo: '/user'
		});*/

			//Ajout de la liste des routes possibles
			console.debug('Add route /user');
			$routeProvider
				.when('/user', {
					templateUrl: '/js/app/pages/user/views/view.html',
					controller: 'UserCtrl'
				})
				.when('/user/list', {
					templateUrl: '/js/app/pages/user/views/view.html',
					controller: 'UserCtrl'
				})
				.when('/user/profile', {
					templateUrl: '/js/app/pages/user/views/profile.html',
					//controller: 'UserCtrl'
				})
				.when('/user/password', {
					templateUrl: '/js/app/pages/user/views/password.html',
					//controller: 'UserCtrl'
				})
				.when('/user/signin', {
					templateUrl: '/js/app/pages/user/views/signin.html',
					controller: 'SigninCtrl'
				})
				.when('/user/signup', {
					templateUrl: '/js/app/pages/user/views/signup.html',
					//controller: 'UserSignUpCtrl'
				}).when("/user/signout", {
					controller: "SignoutCtrl",
					resolve: resolve = {
						logout: function($location, sessionService) {
							sessionService.get("authenticated");
							$location.path("/user/signin");
						}
					}
				});

			console.groupEnd();
		}
	]);
});