'use strict';

angular.module('shareLocApp')
  .controller('MainCtrl', function ($scope,$window,$rootScope,Coordenadaservice) {
    var shareLocMap;
    var marcaFuncion = function(ev){
      if($scope.borrarMarca){
        var length = shareLocMap.markers.length,
          elemToRemove = -1,
          i = 0;

        while(i<length){
          if(ev.__gm_id === shareLocMap.markers[i].__gm_id){
            elemToRemove = shareLocMap.markers[i];
          }
          i++;
        }
        shareLocMap.removeMarkers([elemToRemove]);

        $rootScope.$apply(function(){
          $scope.borrarMarca = false;
        });
      }
    };
    $scope.crearMarca = false;
    $scope.borrarMarca = false;
    $scope.marcar = function(){
      $scope.crearMarca = true;
    };

    $scope.desmarcar = function(){
      $scope.borrarMarca = true;
    };

    $('#share-loc-map').height($window.innerHeight-100);
    Coordenadaservice.getUserPosition().then(function(position){
      shareLocMap = new GMaps({
        div: '#share-loc-map',
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        click:function(ev){
          if($scope.crearMarca){
            shareLocMap.addMarker({
              lat: ev.latLng.k,
              lng: ev.latLng.A,
              title: 'Seleccion',
              click: marcaFuncion
            });
            $rootScope.$apply(function(){
              $scope.crearMarca = false;
            });
          }
        }
      });
    });
  });
