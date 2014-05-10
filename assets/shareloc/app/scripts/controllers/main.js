'use strict';

angular.module('shareLocApp')
  .controller('MainCtrl', function ($scope,$window,$rootScope,$location,Coordenadaservice) {

    var shareLocMap,
        marcaFuncion = function(marker){
      if($scope.borrarMarca){
        shareLocMap.removeMarker(marker);

        $rootScope.$apply(function(){
          $scope.borrarMarca = false;
        });
      }
      if($scope.enviarMarca){
        $location.path('/share');
      }
    };

    $scope.crearMarca = false;
    $scope.borrarMarca = false;
    $scope.enviarMarca = false;

    $scope.marcar = function(){
      $scope.crearMarca = !$scope.crearMarca;
      $scope.borrarMarca = false;
      $scope.enviarMarca = false;
    };

    $scope.desmarcar = function(){
      $scope.crearMarca = false;
      $scope.borrarMarca = !$scope.borrarMarca;
      $scope.enviarMarca = false;
    };

    $scope.enviar = function(){
      $scope.crearMarca = false;
      $scope.borrarMarca = false;
      $scope.enviarMarca = !$scope.enviarMarca;
    };

    $('#share-loc-map').height($window.innerHeight-111);
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
