define(['app/app'], function(app){
	console.group('Loading directive AppHeader');

	app.directive('appHeader', function ($compile){
		return {
			restrict: 'A',
			templateUrl: '/js/app/modules/header/views/header.html',
			controller: 'HeaderCtrl',
			replace: true
		};
	});

	console.groupEnd();
});