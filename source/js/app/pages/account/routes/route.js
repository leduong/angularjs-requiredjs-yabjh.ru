define(['app/app'], function(app){
	
	app.config(['$routeProvider', function ($routeProvider) {
		
		console.group('Configuring Routes Page Account');
		
		//Si la page est la route principale
		console.debug('definition of default route : /account');
		/*$routeProvider.otherwise({
			redirectTo: '/account'
		});*/

		//Ajout de la liste des routes possibles
		console.debug('Add route /account');
		$routeProvider.when('/account', {
			templateUrl: '/js/app/pages/account/views/view.html',
			controller: 'AccountCtrl'
		});

		console.groupEnd();
	}]);
});