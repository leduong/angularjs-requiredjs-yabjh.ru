define(['app/app'], function(app){
	
	app.config(['$routeProvider', function ($routeProvider) {
		
		console.group('Configuring Routes Page Security');
		
		//Si la page est la route principale
		console.debug('definition of default route : /security');
		/*$routeProvider.otherwise({
			redirectTo: '/security'
		});*/

		//Ajout de la liste des routes possibles
		console.debug('Add route /security');
		$routeProvider.when('/security', {
			templateUrl: '/js/app/pages/security/views/view.html',
			controller: 'SecurityCtrl'
		});

		console.groupEnd();
	}]);
});