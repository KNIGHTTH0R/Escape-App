'use strict';

/**
 * @ngdoc overview
 * @name App
 * @description
 * # App
 *
 * Main module of the application.
 */


angular
  .module('App', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'uiGmapgoogle-maps',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url:'/home',
        views:{
          '':{
            templateUrl: 'views/main.html',
          },
          'panel@home':{
            templateUrl: 'views/panel.html',
            controller: 'SearchCtrl'
          },
          'destination_panel@home':{
            templateUrl: 'views/destination_panel.html',
            controller: 'SearchRequestCtrl'
          },    
          'map@home':{
            templateUrl: 'views/map.html',
            controller: 'MapCtrl'
          }  
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });
  })

  .service('searchResults', function ($rootScope) {
        var destinationsProperties;
        return {
            getProperties: function () {
                return destinationsProperties;
            },
            setProperties: function(value) {
                destinationsProperties = value;
                $rootScope.$broadcast("searchResultsSet");
            }
        };
    })

  .service('destinationsResults', function ($rootScope) {
        var destinations;
        return {
            getDestinationsProperties: function () {
                return destinations;
            },
            setDestinationsProperties: function(value){
                destinations = value;
                $rootScope.$broadcast("destinationsSet");
            }

        };
    })

    .service('destinationInfo', function ($rootScope) {
        var destination;
        return {
            getDestination: function () {
                return destination;
            },
            setDestination: function(value){
                destination = value;
                $rootScope.$broadcast("destinationInfoSet");
            }

        };
    })

    .service('originalSearch', function ($rootScope) {
        var searchRequest;
        return {
            getSearchRequest: function () {
                return searchRequest;
            },
            setSearchRequest: function(value){
                searchRequest = value;
                
                $rootScope.$broadcast("searchRequestSet");
            }

        };
    })

    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
    GoogleMapApi.configure({
  //    key: 'your api key',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
        });
    }]);
 

