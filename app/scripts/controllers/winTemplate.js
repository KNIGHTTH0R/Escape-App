'use strict';


angular.module('App')
  .controller('InfoController', ['$scope', 'uiGmapGoogleMapApi', 'destinationsResults', 'destinationInfo', function ($scope,  uiGmapGoogleMapApi, destinationsResults, destinationInfo) {
       	$scope.myDesinationsInfo =  destinationsResults.getDestinationsProperties(); 
    	   $scope.clickedButtonInWindow = function (destinationParams) {
    		 		  destinationInfo.setDestination(destinationParams);
		    };
  }]);
