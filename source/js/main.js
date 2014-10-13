require.config({
  baseUrl: 'js',
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: "$"
    },
    angularBootstrap: {
      deps: ['angular']
    },
    angularRoute: {
      deps: ['angular']
    },
    angularCookies: {
      deps: ['angular']
    },
    angular: {
      exports: "angular"
    }
  },

  paths: {
    // Librairies bower
    underscore: 'vendor/underscore/underscore',
    angular: 'vendor/angular/angular',
    angularRoute: 'vendor/angular-route/angular-route',
    angularCookies: 'vendor/angular-cookies/angular-cookies',
    angularBootstrap: 'vendor/angular-bootstrap/ui-bootstrap-tpls.min',
    jquery: 'vendor/jquery/dist/jquery.min',
    jqueryslim: 'vendor/jquery.slimscroll/jquery.slimscroll.min',
    moment: 'vendor/moment/min/moment.min',
    flot: 'vendor/flot/jquery.flot',
    flotresize: 'vendor/flot/jquery.flot.resize',
    flotpie: 'vendor/flot/jquery.flot.pie',
    flotstack: 'vendor/flot/jquery.flot.stack',
    flottooltip: 'vendor/flot.tooltip/js/jquery.flot.tooltip.min',
    flottime: 'vendor/flot/jquery.flot.time',
    // Librairies incluse
    Console: 'libs/console/console'
  },

  // config: {
  //   i18n: {
  //     locale: 'ru-ru'
  //   }
  // }

});
require([
  'jquery',
  'angular',
  'underscore',
  'angularRoute',
  'angularCookies',
  'angularBootstrap',
  'app/filters/filter',
  'app/directives/directive',
  'app/services/service',
  'app/modules/header/header',
  'app/modules/nav/nav',
  'app/pages/home/HomePage',
  'app/pages/user/page',
  'app/pages/billing/page',
  'app/pages/colet/page',
  'app/pages/security/page',
  'app/pages/support/page',
  'app/pages/account/page',
  'Console'
], function($, angular) {
  "use strict";
  angular.bootstrap(document.getElementById('app'), ['app']);
});