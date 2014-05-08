'use strict';

angular.module('shareLocApp')
  .factory('settingsservice', function ($http) {

    // Public API here
    return {
      crear:function(settings){
       return $http.post('http://sharelocapi.jit.su/user',settings);
      }
    };
  });
