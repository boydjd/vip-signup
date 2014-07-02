'use strict';

/**
 * A service for storing/displaying/closing alerts
 *
 * @author Josh Boyd <joshuab@joinvip.com>
 * @copyright VIP Communications, Inc. 2013
 * @module signupApp
 */

angular.module('signupApp')
.factory('alertService', ['$rootScope', '$location', '$anchorScroll', function ($rootScope, $location, $anchorScroll) {
  /** @type {object} */
  var alertService = {};

  /** @type {array} */
  $rootScope.alerts = [];

  /**
   * Add a message to the alerts array
   *
   * @param {string} type - Type of alert
   * @param {string} msg - Content of the alert
   */
  alertService.add = function (type, msg) {
    $rootScope.alerts.push({'type': type, 'msg': msg});
    $location.hash('alerts');
    $anchorScroll();
  };

  /**
   * Close a message.
   *
   * @param {number} index - Location of the alert to close in the alerts array
   */
  alertService.closeAlert = function (index) {
    $rootScope.alerts.splice(index, 1);
  };

  return alertService;
}]);
