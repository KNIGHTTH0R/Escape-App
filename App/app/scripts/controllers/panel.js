'use strict';

angular.module('App')
  .controller('SearchCtrl', function ($scope, $http, searchResults, originalSearch) {
     


      $scope.pointsOfSale = [];

      //request to fill in the list of Point of Sale Countries
      $http({
              method: 'GET',
              url: 'http://bridge.sabre.cometari.com/lists/supported/pointofsalecountries'   
          }).success(function (result) {
          $scope.pointsOfSale = result;
      });


      $scope.themes = [];

      //request to fill in the list of possible trip themes
      $http({
              method: 'GET',
              url: 'http://bridge.sabre.cometari.com/lists/supported/shop/themes'   
          }).success(function (result) {
          $scope.themes = result;
      });


      $scope.plus7days = new Date();
      $scope.plus7days.setDate($scope.plus7days.getDate() + 7 );
      $scope.plus7days_date = ($scope.plus7days.toISOString()).substring(0,10);

      $scope.plus21days = new Date();
      $scope.plus21days.setDate($scope.plus21days.getDate() + 21 );
      $scope.plus21days_date = ($scope.plus21days.toISOString()).substring(0,10);
      $scope.additionalOptionsCheckbox = false;

      $scope.addOptions = function(){
        
        if($scope.additionalOptionsCheckbox){
         $scope.additionalOptionsCheckbox = false;
        }else{
         $scope.additionalOptionsCheckbox = true;
        } 
      };

      $scope.searchParameters = {origin: "DFW", earliestdeparturedate: $scope.plus7days_date,  latestdeparturedate: $scope.plus21days_date, lengthofstay: '', pointofsalecountry: {CountryCode: "US"}, theme: {Theme: ""}, maxfare: "",region: "" , topdestinations: ""}; 
      $scope.newAirport = '';


      //ajax call to fill in the list of matching airports when the user is typing
      var $select = $('#search_airport').selectize({
                valueField: 'code',
                labelField: 'code',
                searchField: 'code',
                options: [],
                create: false,
                onChange: function(value){
                  $scope.searchParameters.origin = value;
                },
                render: {
                    option: function(item, escape) {
                        return '<div>' +
                             escape(item.code) + ' - ' + escape(item.name) + ' - ' + escape(item.city) +
                        '</div>';
                    }
                },
                load: function(query, callback) {
                    if (!query.length) return callback();
                    $.ajax({
                        url: 'http://bridge.sabre.cometari.com/airports.php?code=' + encodeURIComponent(query.toUpperCase()),
                        type: 'GET',
                        error: function() {
                            callback();
                        },
                        success: function(res) {
                            callback(res);
                        }
                    });
                }
          });
      
      $scope.selectizeControl = $select[0].selectize;

      // ***
      //this function, invoked by clicking the search button,
      //creates a URL to make a request with all the parameters selected by the user.
      //If the user didn't select some of the required parameters the URL is filled with default values
      // ***

      $scope.searchRequest = function(){
        $('#loaderModal').modal({
            backdrop: 'static',
            keyboard: false 
        });
       
       
        $scope.searchRequestParameters = $scope.searchParameters;
        
        $scope.airport = '';

        if($scope.searchRequestParameters.origin === ""){
            $scope.airport = 'http://bridge.sabre.cometari.com/shop/flights/fares?origin=DFW';
            
        }else{
            $scope.airport = 'http://bridge.sabre.cometari.com/shop/flights/fares?origin='+$scope.searchRequestParameters.origin;
           
        };
          
        $scope.earliestdeparture = '';

        if($scope.searchRequestParameters.earliestdeparturedate === ""){
            $scope.earliestdeparture =  $scope.plus7days_date;
        }else{
            $scope.earliestdeparture = '&earliestdeparturedate='+$scope.searchRequestParameters.earliestdeparturedate;
        };
        
        $scope.latestdeparture = '';

        if($scope.searchRequestParameters.latestdeparturedate === ""){
            $scope.latestdeparture =  $scope.plus21days_date;
        }else{
            $scope.latestdeparture = '&latestdeparturedate='+$scope.searchRequestParameters.latestdeparturedate;
        };

        $scope.lengthStay = '';

        if($scope.searchRequestParameters.lengthofstay === ""){
            $scope.lengthStay = '&lengthofstay=4';
            $scope.searchRequestParameters.lengthofstay = 4;
        }else{
            $scope.lengthStay = '&lengthofstay='+$scope.searchRequestParameters.lengthofstay;
        };

        $scope.salePoint = "";

        if($scope.searchRequestParameters.pointofsalecountry.CountryCode === ""){
            $scope.salePoint = "US";
        }else{
            $scope.salePoint = '&pointofsalecountry='+$scope.searchRequestParameters.pointofsalecountry.CountryCode;
        };

        $scope.maximumFare =  new String("");
        if($scope.searchRequestParameters.maxfare !== ""){
            $scope.maximumFare=  new String('&maxfare='+$scope.searchRequestParameters.maxfare);
        };

        $scope.selectedTheme = new String("");

        if($scope.searchRequestParameters.theme.Theme !== ""){
            $scope.selectedTheme=  new String('&theme='+$scope.searchRequestParameters.theme.Theme);
        };

       $scope.topIndicator= new String("");

        if($scope.searchRequestParameters.topdestinations !== ""){
            $scope.topIndicator = new String('&topdestinations='+$scope.searchRequestParameters.topdestinations);
        };

        $scope.selectedRegion= new String("");

        if($scope.searchRequestParameters.region !== ""){
            $scope.selectedRegion = new String('&region='+$scope.searchRequestParameters.region);
        };

        $scope.destinations = "";
        if($scope.additionalOptionsCheckbox){
              $scope.destinationFinderURL = $scope.airport+ $scope.earliestdeparture+ $scope.latestdeparture+
                  $scope.lengthStay+$scope.salePoint+ $scope.maximumFare.toString() + $scope.selectedTheme.toString() + $scope.topIndicator.toString()+ $scope.selectedRegion.toString() +
                  '&ac2lonlat=1';
        }else{
            $scope.destinationFinderURL = $scope.airport+ $scope.earliestdeparture+ $scope.latestdeparture+
                  $scope.lengthStay+$scope.salePoint +
                  '&ac2lonlat=1';          
        };
        originalSearch.setSearchRequest($scope.searchRequestParameters);
        
        //get request to Destination Finder API via Cometari Bridge
        $http.get($scope.destinationFinderURL).
            success(function(data, status, headers, config) {
                    $scope.destinations = data;
                    if($scope.destinations.length != 0){
                      searchResults.setProperties($scope.destinations);
                    
                    $(".panel-info").removeClass("visible");
                    $(".panel-info").addClass("hidden");
                    $('#loaderModal').modal('hide')
                  }else{
                    $('#loaderModal').modal('hide');
                    $('#myModal').modal('show');
                  };
            }).
            error(function(data, status, headers, config) {
              console.log(status);
            });


            
        }

  });
