define(['app/app', 'app/services/authResource'], function(app, authResource) {

	console.group('Load controller UserCtrl');
	app.controller('UserCtrl', function($scope, $http) {

	}).controller("SignoutCtrl", [
	"$rootScope", "$scope", "$location",
		function($rootScope, $scope, $location) {
			$rootScope.$broadcast("success", "You logout!");
			$location.path("/user/signin").search({
				ref: ref
			});
		}
	]).controller("SignLockCtrl", [
		"$scope", "$location",
		function($scope, $location) {
			var ref;
			ref = $location.$$url;
			$location.path("/user/lock").search({
				ref: ref
			});
		}
	]).controller("SigninCtrl", [
		"$rootScope", "$scope", "$location", "sessionService", "authResource",
		function($rootScope, $scope, $location, sessionService, authResource) {
			$scope.username = "cassej";
			$scope.password = "cassej7301554";
			$scope.submit = function() {
				$scope.form.$setDirty();
				if ($scope.form.$valid) {
					authResource.login({
						login: $scope.username,
						pass: $scope.password
					}).success(function(response) {
						$rootScope.$broadcast("success", "Welcome!");
						$rootScope.$broadcast('authChange');
						sessionService.set("authenticated", response.user);
						sessionService.set("menu", response.menu);
						$location.path("/");
					}).error(function(){
						$rootScope.$broadcast("danger", "Error: Invalid username or password!");
					});
				}
			};
		}
	]);

	console.groupEnd();
});