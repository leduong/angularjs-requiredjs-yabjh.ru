define(['app/app'], function(app) {
  console.group('Loading service authResource');

  app.factory("authResource", [
    "$http",
    function($http) {
      var exports;
      exports = {
        login: function(params) {
          return $http.post("/api/login", params);
        },
        logout: function() {
          return $http.post("/api/logout");
        }
      };
      return exports;
    }
  ]);

  console.groupEnd();
});