define(['app/app'], function(app) {
	console.group('Loading NavCtrl');

	app.controller('NavCtrl', [
		"$scope", "$http", "sessionService",
		function NavCtrl($scope, $http, sessionService) {
			$scope.menunavs = sessionService.get("menu");
			console.log($scope.menunavs);
			$scope.$on('authChange', function(event) {
				$scope.menunavs = sessionService.get("menu");
				console.log($scope.menunavs);
			});
		}
	]);

	console.groupEnd();
});