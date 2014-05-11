"use strict";angular.module("shareLocApp",["ngCookies","ngResource","ngSanitize","ngRoute","angular-gestures","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/settings",{templateUrl:"views/settings.html",controller:"SettingsCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/share",{templateUrl:"views/share.html",controller:"ShareCtrl"}).otherwise({redirectTo:"/"})}]).run(["$location","facebookservice","$rootScope",function(a,b,c){var d=function(d){"connected"==d.status?(b.setUserId(d.authResponse.userID),b.setUserAccessToken(d.authResponse.accessToken),c.$apply(function(){a.path("/main")})):"not_authorized"===d.status};FB.init({appId:0x507cbe992b382,version:"v2.0",cookie:!0,xfbml:!0}),FB.Event.subscribe("auth.statusChange",function(a){d(a)}),FB.getLoginStatus(function(a){d(a)})}]),angular.module("shareLocApp").controller("MainCtrl",["$scope","$window","$rootScope","$location","Coordenadaservice",function(a,b,c,d,e){var f,g=function(b){a.borrarMarca&&(f.removeMarker(b),c.$apply(function(){a.borrarMarca=!1})),a.enviarMarca&&c.$apply(function(){d.path("/share")})};a.crearMarca=!1,a.borrarMarca=!1,a.enviarMarca=!1,a.marcar=function(){a.crearMarca=!a.crearMarca,a.borrarMarca=!1,a.enviarMarca=!1},a.desmarcar=function(){a.crearMarca=!1,a.borrarMarca=!a.borrarMarca,a.enviarMarca=!1},a.enviar=function(){a.crearMarca=!1,a.borrarMarca=!1,a.enviarMarca=!a.enviarMarca},$("#share-loc-map").height(b.innerHeight-114),e.getUserPosition().then(function(b){f=new GMaps({div:"#share-loc-map",lat:b.coords.latitude,lng:b.coords.longitude,click:function(b){a.crearMarca&&(f.addMarker({lat:b.latLng.k,lng:b.latLng.A,title:"Seleccion",click:g}),c.$apply(function(){a.crearMarca=!1}))}})})}]),angular.module("shareLocApp").factory("Coordenadaservice",["$q","$window","$rootScope",function(a,b,c){var d={timestamp:1396975380431,coords:{speed:null,heading:null,altitudeAccuracy:null,accuracy:36,altitude:null,longitude:-84.04992109999999,latitude:9.932789}};return{getUserPosition:function(){var e=a.defer();return b.navigator&&b.navigator.geolocation?b.navigator.geolocation.getCurrentPosition(function(a){c.$apply(function(){e.resolve(a)})},function(a){console.log("ERROR: when geoloc..., sending default coords"+JSON.stringify(a)),c.$apply(function(){e.resolve(d)})}):(console.log("ERROR: dude you got no geoloc!"+JSON.stringify(error)),e.resolve(d)),e.promise}}}]),angular.module("shareLocApp").controller("SettingsCtrl",["$scope","settingsservice",function(a,b){a.guardarPreferencias=function(){b.crear(a.usuario).then(function(a){console.log(a)})}}]),angular.module("shareLocApp").factory("settingsservice",["$http",function(a){return{crear:function(b){return a.post("http://sharelocapi.jit.su/user",b)}}}]),angular.module("shareLocApp").factory("facebookservice",["$q",function(a){var b="",c="";return{login:function(){var b=a.defer();return FB.login(function(a){b.resolve(a)},{scope:"email,public_profile,user_friends,publish_actions, publish_stream"}),b.promise},getUserId:function(){return b},setUserId:function(a){b=a},getUserAccessToken:function(){return c},setUserAccessToken:function(a){c=a},friends:function(){var c=a.defer();return FB.api("/"+b+"/friends",function(a){a&&!a.error?_.each(a.data,function(a){FB.api("/"+a.id+"/picture?height=100&width=100",function(b){a.selected=!1,a.img_url=b.data.url,c.notify(a)})}):c.reject(a)}),c.promise}}}]),angular.module("shareLocApp").controller("LoginCtrl",["$scope","facebookservice",function(a,b){a.facebookLogin=function(){b.login().then(function(a){a.authResponse&&(b.setUserId(a.authResponse.userID),b.setUserAccessToken(a.authResponse.accessToken))})}}]),angular.module("shareLocApp").controller("ShareCtrl",["$scope","facebookservice",function(a,b){a.friends=[],b.friends().then(function(){},function(a){console.log(a)},function(b){a.friends.push(b)}),a.enviarMensaje=function(a){function b(a){alert(JSON.stringify(a))}var c={method:"feed",to:a.id,link:"http://www.facebook.com/thepcwizardblog",picture:"http://fbrell.com/f8.jpg",name:"Feed Dialog",caption:"Tagging Friends",description:"Using Dialogs for posting to friends timeline."};FB.ui(c,b)}}]);