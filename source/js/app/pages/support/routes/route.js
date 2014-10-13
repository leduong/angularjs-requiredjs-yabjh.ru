define(['app/app'], function(app){
	
	app.config(['$routeProvider', function ($routeProvider) {
		
		console.group('Configuring Routes Page Support');
		
		//Si la page est la route principale
		console.debug('definition of default route : /support');
		/*$routeProvider.otherwise({
			redirectTo: '/support'
		});*/

		//Ajout de la liste des routes possibles
		console.debug('Add route /support');
		$routeProvider.when('/support', {
			templateUrl: '/js/app/pages/support/views/view.html',
			controller: 'SupportCtrl'
		});

		console.groupEnd();
	}]);
});