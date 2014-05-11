'use strict';

angular.module('shareLocApp')
  .controller('ShareCtrl', function ($scope, facebookservice,Coordenadaservice) {
    $scope.friends = [];
    facebookservice.friends().then(function(friends){
      //$scope.friends = friends;
    },function(error){
      console.log(error);
    },function(friend){
      $scope.friends.push(friend);
    });

    $scope.enviarMensaje = function(friend){

      var locacion = Coordenadaservice.getLocacionEnviar();
      console.log(locacion.lat());
      console.log(locacion.lng());
      /*Imaginate que FB.ui no deja mandar mensajes en mobile web...
      * Porque Zucarita? Porque?
      *
      * Integration Examples:
      * This dialog can be used with the JavaScript SDK and by performing a full
      * redirect to a URL.
      * It is not supported on mobile devices. -__________-
      * https://developers.facebook.com/docs/sharing/reference/send-dialog
      * */
      var obj = {
        method: 'feed',
        to: friend.id,
        link: 'http://sharelocapi.jit.su/shareloc/dist/#/location/'+locacion.lat()+'/'+locacion.lng(),
        picture:'http://www.omicrono.com/wp-content/uploads/2011/12/trololo.jpg',
        name: 'ShareLoc',
        caption: 'Compartir Ubicación',
        description: 'Comparte ubicaciones con ShareLoc.'
      };

      function callback(response) {

      }
      FB.ui(obj, callback);
    };
  });
