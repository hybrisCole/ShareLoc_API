'use strict';

angular.module('shareLocApp')
  .controller('SettingsCtrl', function ($scope,settingsservice) {

    $scope.guardarPreferencias = function(){
      settingsservice.crear($scope.usuario).then(function(data){
        console.log(data);
      });
    };
});
