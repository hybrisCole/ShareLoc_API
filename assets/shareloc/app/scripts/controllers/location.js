'use strict';

angular.module('shareLocApp')
  .controller('LocationCtrl', function ($scope,$routeParams,$window,$timeout,Coordenadaservice) {
    var locationMap;
    $('#location-map').height($window.innerHeight);
    Coordenadaservice.getUserPosition().then(function(position){
      locationMap = new GMaps({
        div: '#location-map',
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      locationMap.drawRoute({
        origin: [position.coords.latitude, position.coords.longitude],
        destination: [$routeParams.lat, $routeParams.lng],
        travelMode: 'driving',
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });
      $timeout(function(){
        google.maps.event.trigger(locationMap.map, 'resize');
        var bounds = new google.maps.LatLngBounds ();
        bounds.extend(new google.maps.LatLng (position.coords.latitude,position.coords.longitude));
        bounds.extend(new google.maps.LatLng ($routeParams.lat, $routeParams.lng));
        //Calculando la distancia entre los dos puntos para ajustar el zoom del mapa...
        locationMap.map.fitBounds(bounds);
      },100);
    });
  });