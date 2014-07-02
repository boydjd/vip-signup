'use strict';

angular.module('signupApp', ['ngIdle', 'ui.bootstrap'])
  .controller('IdleCtrl', ['$scope', '$idle', '$modal', '$location', function ($scope, $idle, $modal, $location) {
    function closeModals() {
      if ($scope.warning) {
        $scope.warning.close();
        $scope.warning = null;
      }

      if ($scope.timeout) {
        $scope.timedout.close();
        $scope.timedout = null;
      }
    }

    $scope.$on('$idleStart', function() {
      closeModals();

      $scope.warning = $modal.open({
        templateUrl: 'warning-dialog.html',
        windowClass: 'modal-danger'
      });
    });

    $scope.$on('$idleEnd', function() {
      closeModals();
    });

    $scope.$on('$idleTimeout', function() {
      closeModals();
      $scope.timeout = $modal.open({
        templateUrl: 'timeout-dialog.html',
        windowClass: 'modal-danger'
      });
    });

    $scope.start = function() {
      closeModals();
      $idle.watch();
      $scope.started = true;
    };

    $scope.stop = function() {
      closeModals();
      $idle.unwatch();
      $scope.started = false;
    };
  }])
  .config(function ($idleProvider) {
    $idleProvider.idleDuration(5);
    $idleProvider.warningDuration(5);
  });
