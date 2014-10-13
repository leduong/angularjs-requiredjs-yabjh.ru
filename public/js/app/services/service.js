define(['app/app'], function(app) {
	console.group('Loading commonService');

	app.factory('AlertService', function($window) {
		return {
			log: function(text) {
				$window.alert(text);
			}
		};
	}).factory('LocalStorageService', [
		function() {
			return {
				isSupported: function() {
					try {
						return 'localStorage' in window && window['localStorage'] !== null;
					} catch (e) {
						return false;
					}
				},
				set: function(key, value) {
					sessionStorage[key] = JSON.stringify(value);
				},
				get: function(key) {
					return JSON.parse(sessionStorage[key]);
				},
				unset: function(key) {
					sessionStorage.removeItem(key);
				},
			};
		}
	]).factory('sessionService', [
		function() {
			return {
				isSupported: function() {
					try {
						return 'sessionStorage' in window && window['sessionStorage'] !== null;
					} catch (e) {
						return false;
					}
				},
				set: function(key, value) {
					sessionStorage[key] = JSON.stringify(value);
				},
				get: function(key) {
					var value = sessionStorage[key];
					if (value != undefined) {
						return value;//JSON.parse();
					} else{
						return false;
					}
				},
				unset: function(key) {
					sessionStorage.removeItem(key);
				},
			};
		}
	]).factory('uniqueIdService', [
		function() {
			var priv = {
				maxTries: 5,
				defaultLen: 5,
				history: {},
				generate: function(len) {
					var id = "";
					var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
					for (var i = 0; i < len; i++) {
						id += possible.charAt(Math.floor(Math.random() * possible.length));
					}
					return id;
				}
			};
			var exports = {
				generate: function(len) {
					if (!len) {
						len = priv.defaultLen;
					}
					var id, tries = 0;
					do {
						id = priv.generate(len);
						tries++;
					} while (priv.history.hasOwnProperty(id) && tries < priv.maxTries);

					if (tries > priv.maxTries) {
						throw new Error('uniqueIdService unable generate a unique ID.');
					}

					priv.history[id] = true;

					return id;
				}
			};
			return exports;
		}
	]).factory("securityService", [
		"userResource", "$http", "$cookieStore", "$rootScope", "SESSION_COOKIE_NAME",
		function(userResource, $http, $cookieStore, $rootScope, SESSION_COOKIE_NAME) {
			var exports, priv;
			priv = {
				session: null,
				currentUser: null,
				requestSent: false
			};
			exports = {
				init: function(session) {
					var authorization;
					priv.requestSent = false;
					if (!session) {
						if ($cookieStore.get(SESSION_COOKIE_NAME)) {
							session = angular.fromJson($cookieStore.get(SESSION_COOKIE_NAME)) || null;
						}
					} else {
						$cookieStore.put(SESSION_COOKIE_NAME, angular.toJson(session));
					}
					priv.session = session;
					if (priv.session && priv.session.id) {
						authorization = priv.session.id;
					}
					$http.defaults.headers.common["Authorization"] = authorization;
				},
				isAuthenticated: function() {
					return !!priv.session || !!priv.currentUser;
				},
				getSession: function() {
					return priv.session;
				},
				requestCurrentUser: function() {
					if (!priv.requestSent) {
						priv.requestSent = true;
						userResource.getMe().success(function(payload) {
							priv.currentUser = payload;
							$rootScope.$broadcast("authChange");
						});
					}
					return priv.currentUser;
				},
				setUser: function(user) {
					priv.currentUser = user;
				},
				destroySession: function() {
					priv.session = null;
					priv.currentUser = null;
					priv.requestSent = false;
					$cookieStore.remove(SESSION_COOKIE_NAME);
					$http.defaults.headers.common["Authorization"] = "";
					$rootScope.$broadcast("authChange");
				}
			};
			return exports;
		}
	]);

	console.groupEnd();
});