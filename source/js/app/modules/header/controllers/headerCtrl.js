define(['app/app'], function(app) {
	console.group('Loading HeaderCtrl');

	app.controller('HeaderCtrl', function HeaderCtrl($scope, $http) {
		"$scope", "$rootScope", "$location", "$interval", "sessionService",
		function($scope, $rootScope, $location, $interval, sessionService) {
			$scope.isAuthenticated = sessionService.get("authenticated");

			$scope.isActive = function(routePattern) {
				if ((new RegExp("^" + routePattern + ".*")).test($location.path())) {
					return true;
				}
				return false;
			};
			$scope.isAdmin = function() {
				if ($scope.isAuthenticated) {
					if ($scope.user.group.name === "admin") {
						return true;
					}
				}
				return false;
			};
			$scope.$on("authChange", function(event) {
				$scope.isAuthenticated = sessionService.get("authenticated");
				if ($scope.isAuthenticated) {
					$scope.user = $scope.isAuthenticated.user;
				} else {
					$scope.user = null;
				}
			});
		}
	});

	console.groupEnd();
});