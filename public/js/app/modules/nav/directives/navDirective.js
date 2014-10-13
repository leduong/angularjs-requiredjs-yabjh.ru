define(['app/app'], function(app){
	console.group('Loading directive appNav');

	app.directive('appNav', function ($compile){
		return {
			restrict: 'A',
			templateUrl: '/js/app/modules/nav/views/nav.html',
			controller: 'NavCtrl',
			replace: true
		};
	});

	console.groupEnd();
});