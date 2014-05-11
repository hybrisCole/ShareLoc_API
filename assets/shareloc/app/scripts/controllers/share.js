'use strict';

angular.module('shareLocApp')
  .controller('ShareCtrl', function ($scope, facebookservice) {
    $scope.friends = [];
    facebookservice.friends().then(function(friends){
      //$scope.friends = friends;
    },function(error){
      console.log(error);
    },function(friend){
      $scope.friends.push(friend);
    });

    $scope.enviarMensaje = function(friend){
      /*Imaginate que FB.ui no deja mandar mensajes en mobile web...
      * Porque Zucarita? Porque?
      *
      * Integration Examples:
      * This dialog can be used with the JavaScript SDK and by performing a full redirect to a URL.
      * It is not supported on mobile devices. -__________-
      * https://developers.facebook.com/docs/sharing/reference/send-dialog
      * */
      var obj = {
        method: 'feed',
        to: friend.id,
        link: 'http://www.facebook.com/thepcwizardblog',
        picture: 'http://sharelocapi.jit.su/shareloc/dist/#/location/lat/long',
        name: 'ShareLoc',
        caption: 'Compartir Ubicación',
        description: 'Comparte ubicaciones con ShareLoc.'
      };

      function callback(response) {
        //alert(JSON.stringify(response));
      }
      FB.ui(obj, callback);
    };
  });
