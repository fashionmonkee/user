/*
'use strict';
var userAgent = navigator.userAgent.toLowerCase();
var gaplugin;
var deviceId;
if(true && (/(android)/.test(userAgent) || /(ipad|iphone|ipod)/.test(userAgent))) {
  document.addEventListener('deviceready', function () {
    deviceId = window.device.uuid;
    angular.bootstrap(document, ['routerApp']);
    document.addEventListener('backbutton', function () {}, false);
  }, false);
} else {
  console.log('Bootstrapping routerApp for non-android devices');
  setTimeout(function () {
    deviceId = 'web';
    angular.bootstrap(document, ['routerApp']);
  }, 500);
}
*/

var routerApp = angular.module('routerApp', ['ui.router','ngAnimate', 'satellizer' ,'geolocation', 'google-maps','ui.materialize','LocalStorageModule']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home'); 
    $stateProvider

        .state('main', {
            url: '/main',
            templateUrl: null,
            controller:'mainCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller:'homeCtrl'
        })    
         .state('list', {
            url: '/list',
            templateUrl: 'list.html',
            controller:'listCtrl'
        }) 
         .state('detail', {
            url: '/detail',
            templateUrl: 'detail.html',
            params : { data: null, },
            controller:'detailCtrl'
        })
         .state('map', {
            url: '/map',
            templateUrl: 'map.html',
            params : { data: null, },
            controller:'mapCtrl'
        })
         .state('profile', {
            url: '/profile',
            templateUrl: 'profile.html',
            controller:'profileCtrl'
        }) 
         .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller:'loginCtrl'
        })
         .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
            controller:'signupCtrl'
        })
         .state('logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutCtrl'
      });
        
});

routerApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('fm');
});

