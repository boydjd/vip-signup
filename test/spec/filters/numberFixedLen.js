'use strict';

describe('Filter: numberFixedLen', function () {

  // load the filter's module
  beforeEach(module('signupApp'));

  // initialize a new instance of the filter before each test
  var numberFixedLen;
  beforeEach(inject(function ($filter) {
    numberFixedLen = $filter('numberFixedLen');
  }));

  it('should return the input prefixed with "numberFixedLen filter:"', function () {
    var text = 'angularjs';
    expect(numberFixedLen(text)).toBe('numberFixedLen filter: ' + text);
  });

});
