define(['app/app'], function(app){
	
	app.config(['$routeProvider', function ($routeProvider) {
		
		console.group('Configuring Routes Page Colet');
		
		//Si la page est la route principale
		console.debug('definition of default route : /colet');
		/*$routeProvider.otherwise({
			redirectTo: '/colet'
		});*/

		//Ajout de la liste des routes possibles
		console.debug('Add route /colet');
		$routeProvider.when('/colet', {
			templateUrl: '/js/app/pages/colet/views/view.html',
			controller: 'ColetCtrl'
		});

		console.groupEnd();
	}]);
});