'use strict';

describe('Service: facebookservice', function () {

  // load the service's module
  beforeEach(module('shareLocApp'));

  // instantiate service
  var facebookservice;
  beforeEach(inject(function (_facebookservice_) {
    facebookservice = _facebookservice_;
  }));

  it('should do something', function () {
    expect(!!facebookservice).toBe(true);
  });

});
