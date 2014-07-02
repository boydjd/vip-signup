'use strict';

angular.module('signupApp')
.controller('PrivacyModalCtrl', ['$scope', '$modal', function ($scope, $modal) {
  $scope.open = function () {
    var modalInstance = $modal.open({
      templateUrl: 'views/privacy.html',
        controller: 'ModalInstanceCtrl'
    });
  };
}]);
