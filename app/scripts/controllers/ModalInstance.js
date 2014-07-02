'use strict';

angular.module('signupApp')
  .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.ok = function() {
      $modalInstance.close();
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }]);
