define(['app/app'], function(app){
	
	app.config(['$routeProvider', function ($routeProvider) {
		
		console.group('Configuring Routes Page Billing');
		
		//Si la page est la route principale
		console.debug('definition of default route : /billing');
		/*$routeProvider.otherwise({
			redirectTo: '/billing'
		});*/

		//Ajout de la liste des routes possibles
		console.debug('Add route /billing');
		$routeProvider.when('/billing', {
			templateUrl: '/js/app/pages/billing/views/view.html',
			controller: 'BillingCtrl'
		});

		console.groupEnd();
	}]);
});