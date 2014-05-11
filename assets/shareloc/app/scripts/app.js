'use strict';

angular
  .module('shareLocApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'angular-gestures',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/share', {
        templateUrl: 'views/share.html',
        controller: 'ShareCtrl'
      })
      .when('/location/:lat/:lng', {
        templateUrl: 'views/location.html',
        controller: 'LocationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function($location,facebookservice,$rootScope){
    var loginDetectedFunction = function(response){
      if(response.status == 'connected'){
        facebookservice.setUserId(response.authResponse.userID);
        facebookservice.setUserAccessToken(response.authResponse.accessToken);
        if($location.path().indexOf('location')===-1){
          $rootScope.$apply(function(){
            $location.path('/main');
          });
        }
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }
    };
    FB.init({
      appId: 1415947262014338,
      version    : 'v2.0',
      cookie: true,
      xfbml: true
    });
    FB.Event.subscribe('auth.statusChange', function(response) {
      loginDetectedFunction(response);
    });

    FB.getLoginStatus(function(response) {
      loginDetectedFunction(response);
    });
  });
