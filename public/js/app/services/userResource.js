define(['app/app'], function(app) {
  console.group('Loading service userResource');

  var userResource = angular.module('resources.user', []);

  userResource.factory('userResource', ['$http',
    function($http) {
      var api = {
        baseUrl: "/api/users"
      };

      var exports = {
        defaults: {},
        find: function(params) {
          return $http.get(api.baseUrl, {
            params: params
          });
        },
        create: function(params) {
          return $http.post(api.baseUrl, params);
        },
        getMe: function() {
          return $http.get(api.baseUrl + "/me");
        },
        get: function(id, params) {
          return $http.get(api.baseUrl + "/" + id, {
            params: params
          });
        },
        updateMe: function(params) {
          return $http.put(api.baseUrl + "/me", params);
        },
        update: function(id, params) {
          return $http.put(api.baseUrl + "/" + id, params);
        },
        delete: function(id) {
          return $http.delete(api.baseUrl + "/" + id);
        }
      };

      return exports;
    }
  ]);
  console.groupEnd();
  return userResource;
});