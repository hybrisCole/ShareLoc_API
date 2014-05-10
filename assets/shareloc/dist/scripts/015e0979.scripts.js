"use strict";angular.module("shareLocApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/settings",{templateUrl:"views/settings.html",controller:"SettingsCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("shareLocApp").controller("MainCtrl",["$scope","$window","$rootScope","Coordenadaservice",function(a,b,c,d){var e,f=function(b){a.borrarMarca&&(e.removeMarker(b),c.$apply(function(){a.borrarMarca=!1})),a.enviarMarca&&alert("marca")};a.crearMarca=!1,a.borrarMarca=!1,a.enviarMarca=!1,a.marcar=function(){a.crearMarca=!a.crearMarca,a.borrarMarca=!1,a.enviarMarca=!1},a.desmarcar=function(){a.crearMarca=!1,a.borrarMarca=!a.borrarMarca,a.enviarMarca=!1},a.enviar=function(){a.crearMarca=!1,a.borrarMarca=!1,a.enviarMarca=!a.enviarMarca},$("#share-loc-map").height(b.innerHeight-111),d.getUserPosition().then(function(b){e=new GMaps({div:"#share-loc-map",lat:b.coords.latitude,lng:b.coords.longitude,click:function(b){a.crearMarca&&(e.addMarker({lat:b.latLng.k,lng:b.latLng.A,title:"Seleccion",click:f}),c.$apply(function(){a.crearMarca=!1}))}})})}]),angular.module("shareLocApp").factory("Coordenadaservice",["$q","$window","$rootScope",function(a,b,c){var d={timestamp:1396975380431,coords:{speed:null,heading:null,altitudeAccuracy:null,accuracy:36,altitude:null,longitude:-84.04992109999999,latitude:9.932789}};return{getUserPosition:function(){var e=a.defer();return b.navigator&&b.navigator.geolocation?b.navigator.geolocation.getCurrentPosition(function(a){c.$apply(function(){e.resolve(a)})},function(a){console.log("ERROR: when geoloc..., sending default coords"+JSON.stringify(a)),c.$apply(function(){e.resolve(d)})}):(console.log("ERROR: dude you got no geoloc!"+JSON.stringify(error)),e.resolve(d)),e.promise}}}]),angular.module("shareLocApp").controller("SettingsCtrl",["$scope","settingsservice",function(a,b){a.guardarPreferencias=function(){b.crear(a.usuario).then(function(a){console.log(a)})}}]),angular.module("shareLocApp").factory("settingsservice",["$http",function(a){return{crear:function(b){return a.post("http://sharelocapi.jit.su/user",b)}}}]),angular.module("shareLocApp").factory("facebookservice",["$q","$location","$rootScope",function(a,b,c){var d="",e=function(a){"connected"==a.status?(d=a.authResponse.userID,c.$apply(function(){b.path("/main")})):"not_authorized"===a.status};return FB.init({appId:0x507cbe992b382,version:"v2.0",cookie:!0,xfbml:!0}),FB.Event.subscribe("auth.statusChange",function(a){e(a)}),FB.getLoginStatus(function(a){e(a)}),{login:function(){var b=a.defer();return FB.login(function(a){b.resolve(a)},{scope:"email,public_profile,user_friends"}),b.promise},getUserId:function(){return d},setUserId:function(a){d=a},friends:function(){var b=a.defer();return FB.api("/"+d+"/friends",function(a){a&&!a.error&&b.resolve(a)}),b.promise}}}]),angular.module("shareLocApp").controller("LoginCtrl",["$scope","facebookservice",function(a,b){a.facebookLogin=function(){b.login().then(function(a){a.authResponse&&b.setUserId(a.authResponse.userID)})}}]);