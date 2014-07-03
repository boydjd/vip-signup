'use strict';

/**
 * @author Josh Boyd <joshuab@joinvip.com>
 * @copyright VIP Communications, Inc. 2013
 * @module signupApp
 */

angular.module('signupApp', ['vipFilters', 'ui.bootstrap', 'ui.router', 'uuid4', 'xeditable', 'angularPayments', 'ngIdle', 'config', 'ngMessages'])
.config(['$idleProvider', function ($idleProvider) {
  $idleProvider.idleDuration(900);
  $idleProvider.warningDuration(300);
}])
.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
    * The workhorse; converts an object to x-www-form-urlencoded serialization.
    * @param {Object} obj
    * @return {String}
    *
    */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if(value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];

  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.config(['$urlRouterProvider', function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/gca/start');
}])
.config(['$stateProvider', function ($stateProvider) {
  $stateProvider
  .state('gca', {
    abstract: true,
    url: '/gca',
    template: '<div>\
    <div ui-view></div>\
    </div>'
  })
  .state('gca.start', {
    url: '/start',
    templateUrl: 'views/landing.html',
    controller: ['SignupService', function(SignupService) {
      if (typeof SignupService.user !== 'undefined') {
        SignupService.user.phoneNumber = undefined;
        SignupService.user.email = undefined;
      }
    }]
  })
  .state('gca.iphone', {
    url: '/iphone',
    templateUrl: 'views/iphone.html'
  })
  .state('gca.android', {
    url: '/android',
    templateUrl: 'views/android.html'
  })
  .state('gca.step1', {
    url: '/step1',
    templateUrl: 'views/step1.html'
  })
  .state('gca.step2', {
    url: '/step2',
    templateUrl: 'views/single-contact.html'
  })
  .state('gca.vipconnect', {
    url: '/vipconnect',
    templateUrl: 'views/vipconnect-congrats.html'
  })
  .state('gca.vipconnect-unavailable', {
    url: '/unavailable',
    templateUrl: 'views/vipconnect-sorry.html'
  })
  .state('gca.vipconnect-retry', {
    url: '/retry',
    templateUrl: 'views/vipconnect-resend.html'
  })
  .state('gca.validate', {
    url: '/validate',
    templateUrl: 'views/validate.html',
    controller: function(Validate) {
      Validate.sendPIN();
    }
  })
  .state('gca.validate-retry', {
    url: '/validate-retry',
    templateUrl: 'views/validate-retry.html'
  })
  .state('gca.congrats', {
    url: '/congrats',
    templateUrl: 'views/congrats.html'
  })
  .state('gca.payment', {
    url: '/payment',
    templateUrl: 'views/payment.html'
  })
  .state('gca.review', {
    url: '/review',
    templateUrl: 'views/review.html'
  })
  .state('sorry', {
    url: '/sorry',
    templateUrl: 'views/timeout.html'
  })
  .state('dlg', {
    url: '/dlg?device&promo',
    templateUrl: 'views/dlg-landing.html',
    resolve: {
      dlgPromise: ['$http', 'API_ENDPOINT', function ($http, API_ENDPOINT) {
        var dlgParams = $.param({func: "signup_getAvailableNumbers", page: "0", type: "ghana"});

        return $http({
          method: 'POST',
          url: API_ENDPOINT + '/myaccount/directLine_ajax.php',
          data: dlgParams
        });
      }]
    },
    controller: ['$scope', 'dlgPromise', function ($scope, dlgPromise) {
      $scope.$parent.dlg = {};
      $scope.$parent.dlg.ddi = dlgPromise.data.ddi;
      $scope.$parent.dlg.number = dlgPromise.data.number;
    }]
  })
}])
.run(['$idle', '$location', '$rootScope', function($idle, $location, $rootScope) {
  $rootScope.$watch(function() {
    return $location.path();
  },
  function(path) {
    if (path === '/sorry') {
      $idle.unwatch();
    } else {
      $idle.watch();
    }
  });

  if ($location.path() !== '/sorry') {
    $idle.watch();
  }
}])
.run(['$location', '$rootScope', '$window', function($location, $rootScope, $window) {
  // Send pageview data to GA
  $rootScope.$on('$stateChangeSuccess', function(event, toState, fromState, fromParams) {
    $window.ga('send', 'pageview', { page: $location.path()});
  });
}])
.run(['$rootScope', '$window', function($rootScope, $window) {
  $rootScope.$on('$viewContentLoaded', function() {
    $window.scrollTo(0,0);
  });
}])
.run(['$timeout', '$location', function($timeout, $location) {
  // Collect user timing information and fire off to GA
  $timeout(function() {
    window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};

    var timing = performance.timing || {};
    var parseTime = timing.loadEventEnd - timing.responseEnd;

    if (parseTime > 0) {
      ga('send', {
        'hitType': 'timing',
        'timingCategory': 'signupApp',
        'timingVar': 'Load Page',
        'timingValue': parseTime,
        'page': $location.path()
      });
    }
  }, 0, false);
}])
.run(['editableOptions', function(editableOptions) {
  editableOptions.theme = 'bs2';
}]);
