define(['app/app'], function(app) {
  console.group('Loading directives common');

  app.directive("maskinput", function() {
    return {
      restrict: "A",
      link: function(scope, element, attr) {
        element.inputmask();
      }
    };
  }).directive("logOut", [
    "$location", "sessionService", "DEFAULT_ROUTE",
    function($location, sessionService, DEFAULT_ROUTE) {
      return function(scope, element, attrs) {
        element.bind("click", function() {
          sessionService.get("authenticated");
          scope.$apply(function() {
            $location.path(DEFAULT_ROUTE);
          });
        });
      };
    }
  ]).directive("lockPage", [
    "$location", "sessionService", "DEFAULT_ROUTE",
    function($location, sessionService, DEFAULT_ROUTE) {
      return function(scope, element, attrs) {
        var ref;
        ref = $location.$$url;
        element.bind("click", function() {
          sessionService.get("authenticated");
          scope.$apply(function() {
            $location.path("/user/lock").search({
              ref: ref
            });
          });
        });
      };
    }
  ]).directive("goClick", [
    "$location",
    function($location) {
      return function(scope, element, attrs) {
        var path;
        path = void 0;
        attrs.$observe("goClick", function(val) {
          path = val;
        });
        return element.bind("click", function() {
          scope.$apply(function() {
            $location.path(path);
          });
        });
      };
    }
  ]).directive('taskFocus', [
    '$timeout',
    function($timeout) {
      return {
        link: function(scope, ele, attrs) {
          return scope.$watch(attrs.taskFocus, function(newVal) {
            if (newVal) {
              return $timeout(function() {
                return ele[0].focus();
              }, 0, false);
            }
          });
        }
      };
    }
  ]).directive('gaugeChart', [

    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, gauge, options;
          data = scope.data;
          options = scope.options;
          gauge = new Gauge(ele[0]).setOptions(options);
          gauge.maxValue = data.maxValue;
          gauge.animationSpeed = data.animationSpeed;
          return gauge.set(data.val);
        }
      };
    }
  ]).directive('flotChart', [

    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, options, plot;
          data = scope.data;
          options = scope.options;
          return plot = $.plot(ele[0], data, options);
        }
      };
    }
  ]).directive('flotChartRealtime', [

    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var data, getRandomData, plot, totalPoints, update, updateInterval;
          data = [];
          totalPoints = 300;
          getRandomData = function() {
            var i, prev, res, y;
            if (data.length > 0) {
              data = data.slice(1);
            }
            while (data.length < totalPoints) {
              prev = (data.length > 0 ? data[data.length - 1] : 50);
              y = prev + Math.random() * 10 - 5;
              if (y < 0) {
                y = 0;
              } else {
                if (y > 100) {
                  y = 100;
                }
              }
              data.push(y);
            }
            res = [];
            i = 0;
            while (i < data.length) {
              res.push([i, data[i]]);
              ++i;
            }
            return res;
          };
          update = function() {
            plot.setData([getRandomData()]);
            plot.draw();
            setTimeout(update, updateInterval);
          };
          data = [];
          totalPoints = 300;
          updateInterval = 200;
          plot = $.plot(ele[0], [getRandomData()], {
            series: {
              lines: {
                show: true,
                fill: true
              },
              shadowSize: 0
            },
            yaxis: {
              min: 0,
              max: 100
            },
            xaxis: {
              show: false
            },
            grid: {
              hoverable: true,
              borderWidth: 1,
              borderColor: '#eeeeee'
            },
            colors: ["#5BDDDC"]
          });
          return update();
        }
      };
    }
  ]).directive('sparkline', [

    function() {
      return {
        restrict: 'A',
        scope: {
          data: '=',
          options: '='
        },
        link: function(scope, ele, attrs) {
          var data, options, sparkResize, sparklineDraw;
          data = scope.data;
          options = scope.options;
          sparkResize = void 0;
          sparklineDraw = function() {
            return ele.sparkline(data, options);
          };
          $(window).resize(function(e) {
            clearTimeout(sparkResize);
            return sparkResize = setTimeout(sparklineDraw, 200);
          });
          return sparklineDraw();
        }
      };
    }
  ]).directive('morrisChart', [

    function() {
      return {
        restrict: 'A',
        scope: {
          data: '='
        },
        link: function(scope, ele, attrs) {
          var colors, data, func, options;
          data = scope.data;
          switch (attrs.type) {
            case 'line':
              if (attrs.lineColors === void 0 || attrs.lineColors === '') {
                colors = null;
              } else {
                colors = JSON.parse(attrs.lineColors);
              }
              options = {
                element: ele[0],
                data: data,
                xkey: attrs.xkey,
                ykeys: JSON.parse(attrs.ykeys),
                labels: JSON.parse(attrs.labels),
                lineWidth: attrs.lineWidth || 2,
                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed']
              };
              return new Morris.Line(options);
            case 'area':
              if (attrs.lineColors === void 0 || attrs.lineColors === '') {
                colors = null;
              } else {
                colors = JSON.parse(attrs.lineColors);
              }
              options = {
                element: ele[0],
                data: data,
                xkey: attrs.xkey,
                ykeys: JSON.parse(attrs.ykeys),
                labels: JSON.parse(attrs.labels),
                lineWidth: attrs.lineWidth || 2,
                lineColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                behaveLikeLine: attrs.behaveLikeLine || false,
                fillOpacity: attrs.fillOpacity || 'auto',
                pointSize: attrs.pointSize || 4
              };
              return new Morris.Area(options);
            case 'bar':
              if (attrs.barColors === void 0 || attrs.barColors === '') {
                colors = null;
              } else {
                colors = JSON.parse(attrs.barColors);
              }
              options = {
                element: ele[0],
                data: data,
                xkey: attrs.xkey,
                ykeys: JSON.parse(attrs.ykeys),
                labels: JSON.parse(attrs.labels),
                barColors: colors || ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
                stacked: attrs.stacked || null
              };
              return new Morris.Bar(options);
            case 'donut':
              if (attrs.colors === void 0 || attrs.colors === '') {
                colors = null;
              } else {
                colors = JSON.parse(attrs.colors);
              }
              options = {
                element: ele[0],
                data: data,
                colors: colors || ['#0B62A4', '#3980B5', '#679DC6', '#95BBD7', '#B0CCE1', '#095791', '#095085', '#083E67', '#052C48', '#042135']
              };
              if (attrs.formatter) {
                func = new Function('y', 'data', attrs.formatter);
                options.formatter = func;
              }
              return new Morris.Donut(options);
          }
        }
      };
    }
  ]).directive("imgOnLoad", function() {
    return {
      restrict: "C",
      link: function(scope, element, attrs) {
        element.bind("load", function(e) {
          element.addClass("loaded");
        });
      }
    };
  }).directive('imgHolder', [

    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return Holder.run({
            images: ele[0]
          });
        }
      };
    }
  ]).directive('customBackground', function() {
    return {
      restrict: "A",
      controller: [
        '$scope', '$element', '$location',
        function($scope, $element, $location) {
          var addBg, path;
          path = function() {
            return $location.path();
          };
          addBg = function(path) {
            $element.removeClass('body-home body-special body-tasks body-lock');
            switch (path) {
              case '/':
                return $element.addClass('body-home');
              case '/404':
              case '/500':
              case '/user/signin':
              case '/user/signup':
              case '/user/forgot':
                return $element.addClass('body-special');
              case '/user/lock-screen':
                return $element.addClass('body-special body-lock');
              case '/tasks':
                return $element.addClass('body-tasks');
            }
          };
          addBg($location.path());
          return $scope.$watch(path, function(newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            return addBg($location.path());
          });
        }
      ]
    };
  }).directive('uiColorSwitch', [

    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.find('.color-option').on('click', function(event) {
            var $this, hrefUrl, style;
            $this = $(this);
            hrefUrl = void 0;
            style = $this.data('style');
            if (style === 'loulou') {
              hrefUrl = 'styles/main.css';
              $('link[href^="styles/main"]').attr('href', hrefUrl);
            } else if (style) {
              style = '-' + style;
              hrefUrl = 'styles/main' + style + '.css';
              $('link[href^="styles/main"]').attr('href', hrefUrl);
            } else {
              return false;
            }
            return event.preventDefault();
          });
        }
      };
    }
  ]).directive('toggleMinNav', [
    '$rootScope',
    function($rootScope) {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var $content, $nav, $window, Timer, app, updateClass;
          app = $('#app');
          $window = $(window);
          $nav = $('#nav-container');
          $content = $('#content');
          ele.on('click', function(e) {
            if (app.hasClass('nav-min')) {
              app.removeClass('nav-min');
            } else {
              app.addClass('nav-min');
              $rootScope.$broadcast('minNav:enabled');
            }
            return e.preventDefault();
          });
          Timer = void 0;
          updateClass = function() {
            var width;
            width = $window.width();
            if (width < 768) {
              return app.removeClass('nav-min');
            }
          };
          return $window.resize(function() {
            var t;
            clearTimeout(t);
            return t = setTimeout(updateClass, 300);
          });
        }
      };
    }
  ]).directive('collapseNav', [

    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          var $a, $aRest, $lists, $listsRest, app;
          $lists = ele.find('ul').parent('li');
          $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>');
          $a = $lists.children('a');
          $listsRest = ele.children('li').not($lists);
          $aRest = $listsRest.children('a');
          app = $('#app');
          $a.on('click', function(event) {
            var $parent, $this;
            if (app.hasClass('nav-min')) {
              return false;
            }
            $this = $(this);
            $parent = $this.parent('li');
            $lists.not($parent).removeClass('open').find('ul').slideUp();
            $parent.toggleClass('open').find('ul').slideToggle();
            return event.preventDefault();
          });
          $aRest.on('click', function(event) {
            return $lists.removeClass('open').find('ul').slideUp();
          });
          return scope.$on('minNav:enabled', function(event) {
            return $lists.removeClass('open').find('ul').slideUp();
          });
        }
      };
    }
  ]).directive('highlightActive', [

    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$attrs', '$location',
          function($scope, $element, $attrs, $location) {
            var highlightActive, links, path;
            links = $element.find('a');
            path = function() {
              return $location.path();
            };
            highlightActive = function(links, path) {
              path = '#' + path;
              return angular.forEach(links, function(link) {
                var $li, $link, href;
                $link = angular.element(link);
                $li = $link.parent('li');
                href = $link.attr('href');
                if ($li.hasClass('active')) {
                  $li.removeClass('active');
                }
                if (path.indexOf(href) === 0) {
                  return $li.addClass('active');
                }
              });
            };
            highlightActive(links, $location.path());
            return $scope.$watch(path, function(newVal, oldVal) {
              if (newVal === oldVal) {
                return;
              }
              return highlightActive(links, $location.path());
            });
          }
        ]
      };
    }
  ]).directive('toggleOffCanvas', [

    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.on('click', function() {
            return $('#app').toggleClass('on-canvas');
          });
        }
      };
    }
  ]).directive('slimScroll', [

    function() {
      return {
        restrict: 'A',
        link: function(scope, ele, attrs) {
          return ele.slimScroll({
            height: attrs.scrollHeight || '100%'
          });
        }
      };
    }
  ]).directive('goBack', [

    function() {
      return {
        restrict: "A",
        controller: [
          '$scope', '$element', '$window',
          function($scope, $element, $window) {
            return $element.on('click', function() {
              return $window.history.back();
            });
          }
        ]
      };
    }
  ]);

  console.groupEnd();
});