'use strict';


angular.module('App')
  .controller('MapCtrl',['$scope', 'uiGmapGoogleMapApi', 'searchResults', 'destinationsResults', function ($scope, uiGmapGoogleMapApi, searchResults, destinationsResults) {
         

    // Settings for the map styles and options
    var styleArray = [
   {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
     {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
      {
        "featureType": "transit.station",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }

  ];
        

        $scope.map = {
            center: {latitude: 32.8972,  longitude: -97.03769}, 
            zoom: 5
        };
        $scope.map.options = {
            styles: styleArray,
            backgroundColor: '#7dcdcd',
            maxZoom: 9,
            minZoom: 2
        };


     
        $scope.myMarkers =[];

        $scope.$on('searchResultsSet', function(){
                $scope.locations = searchResults.getProperties();
                var markers = [];
                for (var i = 0; i < $scope.locations.length; i++){
                    $scope.destination = $scope.locations[i];
                    $scope.minFare = "100000000";
                    for (var j = 0; j < $scope.destination.fares.length; j++){
                   
                        $scope.fares = $scope.destination.fares[j];                    
                        if($scope.fares.lowestFare < $scope.minFare){
                                $scope.minFare = $scope.fares.lowestFare;
                        }
                    }
                    if($scope.minFare == "100000000"){
                        $scope.minFare = "unknown fare";
                    };
                    $scope.locations[i].minFare = $scope.minFare;
                   // $scope.locations[i].icon = 'images/pin.svg';
                    $scope.locations[i].tmpl = 'views/window_template.html';                          
                    $scope.locations[i].options = {
                       labelClass:'marker-labels',
                       labelAnchor:'25 0',
                       labelContent: $scope.minFare + $scope.destination.currencyCode
                    };
                    var tempLocations =  $scope.locations[i];
                    var newObject = jQuery.extend(true, {}, tempLocations);
                    $scope.locations[i].tmplParams = newObject;
                    markers.push($scope.locations[i]);
                }   

                $scope.myMarkers = markers;
                destinationsResults.setDestinationsProperties($scope.myMarkers);
                $scope.myDestinations = destinationsResults.getDestinationsProperties();
                 
                

        });

     uiGmapGoogleMapApi.then(function(maps) {

     });



  }]);
