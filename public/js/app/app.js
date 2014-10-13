define(['angular'], function() {

	var dependances = ['ngRoute', 'ngCookies', 'ui.bootstrap'];

	console.group('Application Initialization');
	app = angular.module("app", dependances)
		.constant("DOMAIN", "")
		.constant("API_KEY", "1234567890")
		.constant("SESSION_COOKIE_NAME", "session")
		.constant("DELAY", 5000)
		.constant("DEFAULT_ROUTE", "/dashboard")
		.constant("REQUIRE_AUTH", "/user/signin")
		.constant("PERPAGE", [10, 20, 50, 100])
		.constant("version", "© 2014 beesightsoft.com");
	// $httpProvider configuration
	app.config(['$httpProvider',
		function($httpProvider) {
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

			/*
			 *  Set common http headers
			 */
			$httpProvider.defaults.transformRequest = function(data) {
				if (data === undefined) {
					return data;
				}
				return $.param(data);
			}
			// $httpProvider.defaults.useXDomain = true;
			// delete $httpProvider.defaults.headers.common['X-Requested-With'];
		}
	]);
	app.run([
		"$rootScope", "$location", "sessionService", "REQUIRE_AUTH",
		function($rootScope, $location, sessionService, REQUIRE_AUTH) {
			var skipAuth;
			skipAuth = ["/user/signin", "/user/signout", "/user/lock"];
			$rootScope.isPath = null;
			return $rootScope.$on("$routeChangeStart", function(event, next, current) {
				var isAuthenticated, query;
				isAuthenticated = void 0;
				query = void 0;
				$rootScope.isPath = $location.path();
				isAuthenticated = sessionService.get("authenticated");
				if (isAuthenticated != null) {
					query = $location.search();
					if (query.ref) {
						$location.search({}).path(query.ref);
					}
				} else {
					if (!_(skipAuth).contains($rootScope.isPath)) {
						$location.path(REQUIRE_AUTH);
					}
				}
			});
		}
	]);
	app.controller('AppCtrl', [
		'$scope', '$location',
		function($scope, $location) {
			$scope.isHide = function() {
				var path;
				path = $location.path();
				return _.contains(['/404', '/500', '/user/lock', '/user/signin', '/user/signup', '/user/forgot'], path);
			};
			return $scope.main = {
				brand: 'SEO index',
				name: 'SEO'
			};
		}
	]).controller('FlashCtrl', [
		'$scope', '$location', '$rootScope', 'uniqueIdService', '$sce', 'DELAY',
		function($scope, $location, $rootScope, uniqueIdService, $sce, DELAY) {
			$scope.messages = {};
			$scope.$on('success', function(event, msg) {
				var id = uniqueIdService.generate();
				$scope.messages[id] = {
					class: 'alert-success',
					msg: $sce.trustAsHtml(msg)
				};
				setTimeout(function() {
					$scope.close(id);
				}, DELAY);
			});
			$scope.$on('notify', function(event, msg) {
				var id = uniqueIdService.generate();
				$scope.messages[id] = {
					class: 'alert-info',
					msg: $sce.trustAsHtml(msg)
				};
				setTimeout(function() {
					$scope.close(id);
				}, DELAY);
			});
			$scope.$on('warning', function(event, msg) {
				var id = uniqueIdService.generate();
				$scope.messages[id] = {
					class: 'alert-warning',
					msg: $sce.trustAsHtml(msg)
				};
				setTimeout(function() {
					$scope.close(id);
				}, DELAY);
			});
			$scope.$on('error', function(event, msg) {
				var id = uniqueIdService.generate();
				$scope.messages[id] = {
					class: 'alert-danger',
					msg: $sce.trustAsHtml(msg)
				};
				setTimeout(function() {
					$scope.close(id);
				}, DELAY);
			});

			$scope.close = function(id) {
				if ($scope.messages.hasOwnProperty(id)) {
					delete $scope.messages[id];
					//$scope.$apply(); // force refresh
				}
			};
		}
	]);
	console.groupEnd();
	return app;
});