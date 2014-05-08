'use strict';

describe('Service: Coordenadaservice', function () {

  // load the service's module
  beforeEach(module('shareLocApp'));

  // instantiate service
  var Coordenadaservice;
  beforeEach(inject(function (_Coordenadaservice_) {
    Coordenadaservice = _Coordenadaservice_;
  }));

  it('should do something', function () {
    expect(!!Coordenadaservice).toBe(true);
  });

});
