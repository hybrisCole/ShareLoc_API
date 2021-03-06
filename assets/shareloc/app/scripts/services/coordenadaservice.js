'use strict';

angular.module('shareLocApp')
  .factory('Coordenadaservice', function Coordenadaservice($q, $window, $rootScope) {
    var defaultCoord = {"timestamp":1396975380431,"coords":{"speed":null,"heading":null,"altitudeAccuracy":null,"accuracy":36,"altitude":null,"longitude":-84.04992109999999,"latitude":9.932789}}
      , locacionEnviar = {};
    return {
      getUserPosition:function(){
        var defer = $q.defer();
        if ($window.navigator && $window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition(function(position){
            $rootScope.$apply(function(){
              defer.resolve(position);
            });
          },function(error){
            console.log('ERROR: when geoloc..., sending default coords'+ JSON.stringify(error));
            $rootScope.$apply(function(){
              defer.resolve(defaultCoord);
            });
          });
        }else{
          console.log('ERROR: dude you got no geoloc!'+ JSON.stringify(error));
          defer.resolve(defaultCoord);
        }
        return defer.promise;
      },
      setLocacionEnviar:function(locacion){
        locacionEnviar = locacion;
      },
      getLocacionEnviar:function(){
        return locacionEnviar;
      }
    };
  });
