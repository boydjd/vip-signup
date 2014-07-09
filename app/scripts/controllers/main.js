'use strict';

/**
 * @author Josh Boyd <joshuab@joinvip.com>
 * @copyright VIP Communications, Inc. 2013
 * @module signupApp
 */

angular.module('signupApp')
.controller('MainCtrl', ['$rootScope', '$scope', '$window', '$filter', '$location', '$http', '$timeout', '$q', '$locale', '$anchorScroll',
    'alertService', '$state', '$idle', '$modal', 'API_ENDPOINT', 'Account', 'SignupService', 
    function ($rootScope, $scope, $window, $filter, $location, $http, $timeout, $q, $locale, $anchorScroll, alertService, $state, $idle, $modal, API_ENDPOINT, Account, SignupService) {
  $scope.state = $state;

  $scope.whatever = function() {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve(['Hello', 'world!']);
      $state.go('gca.payment');
    }, 5000);

    return deferred.promise;
  };

  $scope.dt = new Date();

  $scope.currentYear = $scope.dt.getFullYear();
  $scope.currentMonth = $scope.dt.getMonth() + 1;
  $scope.months = [
    {value: 1, text: '01 - January'},
    {value: 2, text: '02 - February'},
    {value: 3, text: '03 - March'},
    {value: 4, text: '04 - April'},
    {value: 5, text: '05 - May'},
    {value: 6, text: '06 - June'},
    {value: 7, text: '07 - July'},
    {value: 8, text: '08 - August'},
    {value: 9, text: '09 - September'},
    {value: 10, text: '10 - October'},
    {value: 11, text: '11 - November'},
    {value: 12, text: '12 - December'}
  ];

  // @todo remove this
  $scope.ccinfo = {type:undefined};

  $scope.cardTypes = [
    {value: 'Diners Club', text: 'Diners Club'},
    {value: 'JCB', text: 'JCB'},
    {value: 'Discover', text: 'Discover'},
    {value: 'MasterCard', text: 'MasterCard'},
    {value: 'Visa', text: 'Visa'}
  ];

  $scope.dlgCountries = [
    {name: 'Ghana'}
  ];

  /**
   * Expose alertService.closeAlert() to controller scope
   */
  $scope.closeAlert = alertService.closeAlert;

  $scope.openWarning = function () {
    var modalInstance = $modal.open({
      template: '<div class="modal-header"> <h3>Security Warning</h3> </div> <div ng-idle-countdown="countdown" ng-init="countdown=300" class="modal-body"> <div class="progress progress-striped active"><div class="bar" style="width:100%">Your session will expire in {{countdown/60|number:0}} <span ng-pluralize count="countdown/60|number:0" when="{\'1\': \'minute\', \'other\': \'minutes\'}".</div></div> </div> <div class="modal-footer"> <button class="btn btn-primary" ng-click="ok()">Continue</button></div>'
    });
    return modalInstance;
  };

  $scope.$on('$idleEnd', function() {
    $scope.warningModal.close();
  });

  $scope.$on('$idleStart', function() {
    $scope.warningModal = $scope.openWarning();
  });

  $scope.$on('$idleTimeout', function() {
    $scope.warningModal.close();
    $location.path('/sorry');
  });

  /**
   * Change location to the provided path.
   * @param {string} path - The path to go to.
   */
  $scope.go = function (path) {
    $location.path(path);
  };

  /**
   * Get the CSS classes based on a form element's validity
   * @param ngModelController
   * @returns {{error: boolean, success: boolean}}
   */
  $scope.getCssClasses = function (ngModelController) {
    if (!angular.isDefined(ngModelController)) {
      return;
    }

    return {
      error: ngModelController.$invalid && ngModelController.$dirty,
      success: ngModelController.$valid && (Boolean(ngModelController.$modelValue) || ngModelController.$dirty)
    };
  };

  /**
   * If element is invalid and dirty, return the state of the requested error.
   * @param ngModelController
   * @param {string} error The error to check
   * @returns {boolean} True if error should be shown, otherwise false.
   */
  $scope.showError = function (ngModelController, error) {
    if (!angular.isDefined(ngModelController)) {
      return;
    }

    if (ngModelController.$invalid && ngModelController.$dirty) {
      if (error !== 'required' && ngModelController.$error['required']) {
        return false;
      } else {
        return ngModelController.$error[error];
      }
    } else {
      return false;
    }
  };

  $scope.phoneTypes = [
    { value: 'mobile', text: 'Mobile' },
    { value: 'home', text: 'Home' },
    { value: 'work', text: 'Work' },
    { value: 'other', text: 'Other' }
  ];

  $scope.leadSources = [
    { value: 'referral', text: 'Referral' },
    { value: 'tv', text: 'TV' },
    { value: 'restaurant', text: 'Restaurant' },
    { value: 'print/radio', text: 'Print / Radio' },
    { value: 'website', text: 'Website Ad' },
    { value: 'search', text: 'Search Engine' },
    { value: 'social', text: 'Social Media' },
    { value: 'other', text: 'Other' }
  ];

  $scope.errorMap = {
    min: 'Too small',
    max: 'Too large',
    number: 'Must be a number',
    email: 'Invalid email address',
    phoneAvailable: 'Phone number not available',
    required: 'Required'
  };

  $scope.contacts = [
    { device: 'Mobile', country: 'US', name: '', phoneNumber: '' }
  ];

  $scope.contacts.addEmptyContact = function() {
    $scope.contacts.push({ device: 'Mobile', country: 'US', name: '', phoneNumber: '' });
  };

  $scope.signup = SignupService;
  $scope.signup.contact = {};
  $scope.signup.contact.device = 'Mobile';
  $scope.signup.contact.country = '';
  $scope.signup.payment = {};
  $scope.signup.payment.promotionCode = 'JOINVIP5';
  $scope.signup.payment.promotionType = 'DOLLAR_AMOUNT';
  $scope.signup.payment.saveCard = 'save';
  $scope.signup.payment.amount = parseInt(5, 10);
  $scope.signup.payment.country = 'US';
  $scope.signup.payment.bonus = '0';
  $scope.signup.payment.autoRecharge = {};
  $scope.signup.payment.Total = function() { return parseFloat($scope.signup.payment.amount) + parseFloat($scope.signup.payment.bonus);};
  $scope.signup.dlg = {};
  $scope.signup.dlg.country = $scope.dlgCountries[0];

  if ($location.search().device) {
    $scope.signup.callingMethod = $location.search().device;
  }

  if ($location.search().promo) {
    $scope.signup.payment.promotionCode = $location.search().promo;
  }

  $scope.today = new Date();

  $scope.checkUniquePhone = function(data, formModelCtrl, ngModelCtrl) {
    var d = $q.defer();

    if (data !== undefined && data !== ngModelCtrl) {
      $http.get(
        API_ENDPOINT + '/rest/v1/validate/uniquePhoneNumber',
        {
          params: {
            accountNumber: Account.accountId, 
            phoneNumber: data,
            country: SignupService.payment.country
          }
        }
      )
      .success(function(data, status, headers, config) {
        if (data.resultSet.unique == false) {
          d.resolve('Phone number is unavailable');
        } else {
          d.resolve($scope.checkEditableInput(data, formModelCtrl));
        }
      })
      .error(function(data, status, headers, config) {
        d.reject('Phone number is unavailable');
      });
    } else {
      d.resolve($scope.checkEditableInput(data, formModelCtrl));
    }

    return d.promise;
  };

  $scope.checkUniqueEmail = function(data, formModelCtrl, ngModelCtrl) {
    var d = $q.defer();

    if (data !== undefined && data !== ngModelCtrl) {
      $http.get(
        API_ENDPOINT + '/rest/v1/validate/uniqueEmail',
        {
          params: {
            accountNumber: Account.accountId,
            email: data 
          }
        }
      )
      .success(function(data, status, headers, config) {
        if (data.resultSet.unique == false) {
          d.resolve('Email address is unavailable');
        } else {
          d.resolve($scope.checkEditableInput(data, formModelCtrl));
        }
      })
      .error(function(data, status, headers, config) {
        d.reject('Email address is unavailable');
      });
    } else {
      d.resolve($scope.checkEditableInput(data, formModelCtrl));
    }

    return d.promise;
  };

  $scope.bxslider = function () {
    $('.bxslider').bxSlider({
      mode: 'horizontal',
      controls: false,
      auto: true
    });
  };

  $scope.checkEditableInput = function(data, form) {
    if (data === undefined) {
      for (var k in form.$error) {
        if (form.$error[k] === true) {
          if ($scope.errorMap[k] !== undefined) {
            return $scope.errorMap[k];
          } else {
            return 'Invalid';
          }
        }
      }
    }
  };

  $scope.countries = [];

  $scope.loadCountries = function() {
    var deferred = $q.defer();

    $scope.countries = [];

    for (var key in BFHCountriesList) {
      if (BFHCountriesList.hasOwnProperty(key)) {
        $scope.countries.push({ value: key, text: BFHCountriesList[key] });
      }
    }

    deferred.resolve(true);

    return deferred.promise;
  };

  $scope.states = [];

  $scope.loadStates = function() {
    var deferred = $q.defer();

    $scope.states = [];
    var states = BFHStatesList[$scope.signup.payment.country];
    for (var key in states) {
      if (states.hasOwnProperty(key)) {
        $scope.states.push({ value: states[key].code, text: states[key].name });
      }
    }

    deferred.resolve(true);

    return deferred.promise;
  };

  $scope.$watch('signup.offer', function (newValue, oldValue) {
    if (newValue === 'minutes') {
      SignupService.payment.promotionCode = undefined;
    }
  });

  $scope.$watch('signup.payment.amount', function (newValue, oldValue) {
    $scope.value = parseInt(newValue);
  });

  $scope.$watch('SignupService.payment.amount', function (newValue, oldValue) {
    $scope.value = parseInt(newValue);
  });

  $scope.$watch('signup.payment.amount', function(newValue, oldValue) {
    if (newValue !== oldValue && newValue !== 0 && typeof SignupService.payment.promotionCode !== 'undefined' && SignupService.payment.promotionCode.length > 0) {
        $http.get(
          API_ENDPOINT + '/rest/v1/validate/promotionCode',
          {
            params: {
              promotionCode: SignupService.payment.promotionCode,
              amount: newValue
            }
          }
          )
        .success(function(data, status, headers, config) {
          if (data.resultSet.type == 'VOUCHER') {
            SignupService.payment.amount = parseInt(0, 10);
            SignupService.payment.bonus = parseInt(data.resultSet.credit, 10);
            SignupService.payment.promomtionType = data.resultSet.type;
          } else if (data.resultSet.bonus) {
            if (SignupService.payment.amount < parseInt(data.resultSet.min_threshold)) {
              SignupService.payment.amount = parseInt(data.resultSet.min_threshold, 10);
              SignupService.payment.bonus = parseInt(data.resultSet.bonus, 10);
              SignupService.payment.promomtionType = data.resultSet.type;
            }
          } else {
            SignupService.payment.bonus = parseInt(0, 10);
          }
        })
    }
  }, true);

  $scope.$watch('signup.contact.country', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      SignupService.contact.phoneNumber = '';
    }
  });
  
  $scope.$watch('signup.payment.country', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      SignupService.payment.state = '';
    }
  });

  $scope.$watch('signup.callingMethod', function(newValue, oldValue) {
    if ($scope.state.current.name === 'gca.start') {
      $location.hash('selectOffer');
      $anchorScroll();
    }
  });

  $scope.$watch('signup.payment.amount', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      SignupService.payment.autoRecharge.amount = parseInt(newValue, 10);
    }
  });

  $scope.submitSignup = function () {
    var data = {
      accountNumber: Account.accountId,
      password: SignupService.user.password1,
      fName: SignupService.user.firstName,
      lName: SignupService.user.lastName,
      street: SignupService.payment.streetAddress,
      city: SignupService.payment.city,
      state: SignupService.payment.state,
      zipCode: SignupService.payment.zip,
      country: SignupService.payment.country,
      email: SignupService.user.email,
      phoneHome: SignupService.user.phoneNumber,
      guid: Account.guid,
      leadSource: SignupService.payment.leadSource
    };

    if (SignupService.payment.method === 'creditCard') {
      switch(SignupService.payment.saveCard) {
        case 'autoRecharge':
          data.isARCard = 1;
          data.arAmount = SignupService.payment.autoRecharge.amount;
        case 'save':
          data.saveCard = 'true';
        default:
          data.cardType = SignupService.payment.card;
          data.cardNumber = SignupService.payment.cardNumber;
          data.cardExpiryMonth = $scope.ccinfo.month.value;
          data.cardExpiryYear = $scope.ccinfo.year;
          data.cardSecurityCode = SignupService.payment.cardCvc;
          data.contactId = 0;
          data.amount = SignupService.payment.amount; 

          if (typeof SignupService.payment.promotionCode !== 'undefined') {
            data.promotionCode = SignupService.payment.promotionCode;
            data.promotionType = SignupService.payment.promotionType;
          }
          break;
      }
    } else {
      data.promotionCode = SignupService.payment.promotionCode;
      data.promotionType = SignupService.payment.promotionType;
    }

    if (typeof $scope.dlg !== 'undefined') {
      data.ddi = $scope.dlg.ddi;
    }

    if (typeof SignupService.payment.referral !== 'undefined') {
      data.referral = SignupService.payment.referral;
    }


    if (typeof SignupService.contact !== 'undefined' && SignupService.contact.firstName && SignupService.contact.phoneNumber) {
      data.tSPName = [];
      data.tSPNumber = [];
      data.tSPCountry = [];

      data.tSPName.push(SignupService.contact.firstName);
      data.tSPNumber.push(SignupService.contact.phoneNumber);
      data.tSPCountry.push(SignupService.contact.country);
    }

      var request = $http({
        method: 'POST',
          url: API_ENDPOINT + '/rest/v1/signup',
          data: data 
        }).then(
          function(response) {
            if (response.data.status === "Successful") {
              SignupService.payment.successful = true;

              if (SignupService.callingMethod === 'hotel' || SignupService.activation) {
                $state.go('gca.congrats');
              } else {
                $state.go('gca.validate');
              }
            } else {
              alertService.add('danger', 'Account creation failed. Please try again or contact customer service.');
            }
          },
          function(data) {
            alertService.add('danger', 'Account creation failed. Please try again or contact customer service.');
          });

      return request;
  };

  // Once account creation is complete, don't allow going anywhere other than the validation page
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.name !== 'gca.sorry') {
      if (toState.name !== 'gca.congrats' && SignupService.activation) {
        if (fromState.name !== 'gca.payment' && fromState.name !== 'gca.review') {
          if (fromState.name !== 'gca.congrats' && toState.name !== 'gca.payment') {
            event.preventDefault();
          }
        }
      }

      if (typeof SignupService.payment.successful !== 'undefined' && SignupService.payment.successful) {
        switch (toState.name) {
          case 'gca.congrats':
            break;
          case 'gca.validate':
            break;
          case 'gca.validate-retry':
            break;
          case 'sorry':
            break;
          default:
            event.preventDefault();
        }
      }

      if (fromState.name === 'gca.congrats') {
        if (toState.name === 'gca.validate' && SignupService.activation) {
          event.preventDefault();
        }

        if (toState.name !== 'gca.payment' && (toState.name !== 'gca.validate' && !SignupService.activation)) {
          event.preventDefault();
        }
      }
    }
  });

  // Remove all alerts on state change
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    while($rootScope.alerts.length > 0) {
      $rootScope.alerts.pop();
    }
  });

  $scope.isInternetExplorer = function() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true;
    }

    return false;
  }

  $scope.isIOS = /(iPad|iPhone|iPod)/g.test(window.navigator.userAgent);

  // IE doesn't like firing click events for images within labels for inputs, for some reason.
  // This sets the model to the correct view value
  $scope.fixIEClick = function(event) {
    if ($scope.isInternetExplorer()) {
      var inputElement = angular.element(event.target).prev('input');
      var ngModelCtrl = inputElement.data('$ngModelController');
      ngModelCtrl.$setViewValue(inputElement.val());
    }
  };

  // This prevents loading of different states
  // Need to change this to check for GUID in the URL and load the appropriate state, or check for cookies once we save data in the cookies
  $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (fromState.name === '' && toState.name !== "gca.start") {
      if (toState.name !== "dlg") {
        event.preventDefault();
        $state.go('gca.start');
      }
    }
  });
 
  
}]);
