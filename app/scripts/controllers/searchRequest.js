'use strict';

angular.module('App')
  .controller('SearchRequestCtrl', ['$scope', '$http','uiGmapGoogleMapApi', 'destinationInfo', 'originalSearch', function ($scope, $http, uiGmapGoogleMapApi, destinationInfo, originalSearch) {
  		$scope.isHidden = true;
  		$scope.isHiddenFlightsPanel = true;
        $scope.isHiddenFuture = false;
        $scope.isHiddenPast = true;
         $scope.isPointOfSaleUS = true;
          $scope.isLoading = true;
        $scope.chartTabShow = false;
  		$scope.seasonalityURL ='';
        $scope.fareForcastURL ='';
        $scope.fareForcast = {Recommendation: ''};
		$scope.lastLabel ='';
        var today = moment();
        today.format("YYYY-MM-DD");

        $scope.destinationCard = {
            currencyCode: "USD"
        };
       
        $scope.plus190 =  today;
        $scope.plus190.add(190, 'days');
        $scope.instaFlightURL = '';
        $scope.instaFlight = {
            origin: '',
            destination: '',
            departureDate: '',
            lengthOfStay: '',
            arrivalDate: ''
        };

        $scope.searchInfo = {
            origin: {
                code: ''
            },       
            pointofsalecountry: {
                CountryCode: ''
            },
            lengthofstay: ''
     
        };



        $scope.firstChart = true;
        $scope.chartSets = [];
        $scope.chartSetIndex = 0;

        $scope.$on('searchRequestSet', function(){
            $scope.searchInfo =  originalSearch.getSearchRequest();
            $scope.instaFlight.origin = $scope.searchInfo.origin;
            $scope.instaFlight.pointofsalecountry = $scope.searchInfo.pointofsalecountry.CountryCode;
            $scope.instaFlight.lengthofstay = $scope.searchInfo.lengthofstay;
        });  

        $scope.chartData = {
            labels: ["23.02"],
            datasets: [
                {
                    label: "Destination fare differences dataset",
                    fillColor: "rgb(125,205,205)",
                    strokeColor: "rgb(125,205,205)",
                    highlightFill: "rgb(255,11,92)",
                    highlightStroke: "rgb(255,11,92)",
                    data: [390]
                }
            ]
        };

        $scope.tripInfo = {
            lowestFare: "0",
            departureDate: "0",
            arrivalDate: "0",
            destinationRank: "0",
            season: "0",
            fareForcastAdvise: "0"
        };

        $scope.options = {
            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero : true,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgb(114,114,114)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: false,

            //Boolean - If there is a stroke on each bar
            barShowStroke : true,

            //Number - Pixel width of the bar stroke
            barStrokeWidth : 1,

            //Number - Spacing between each of the X value sets
            barValueSpacing : 5,

            //Number - Spacing between data sets within X values
            barDatasetSpacing : 2,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

             // Boolean - Whether to animate the chart
            animation: true,

            // Number - Number of animation steps
            animationSteps: 20,

            // String - Animation easing effect
            animationEasing: "easeOutQuart",

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: false,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: null,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: null,
            // Number - The scale starting value
            scaleStartValue: null,

            // String - Colour of the scale line
            scaleLineColor: "rgb(255,255,255)",

            // Number - Pixel width of the scale line
            scaleLineWidth: 1,

            // Boolean - Whether to show labels on the scale
            scaleShowLabels: true,

            // Interpolated JS string - can access value
            scaleLabel: "  <%=value%> ",

            // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
            scaleIntegersOnly: true,

            // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            //scaleBeginAtZero: false,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Scale label font size in pixels
            scaleFontSize: 12,

            // String - Scale label font weight style
            scaleFontStyle: "normal",

            // String - Scale label font colour
            scaleFontColor: "rgb(114,114,114)",

            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: true,

            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: true,

            // Boolean - Determines whether to draw tooltips on the canvas or not
            showTooltips: true,

            // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
            customTooltips: false,

            // Array - Array of string names to attach tooltip events
            tooltipEvents: ["mousemove", "touchstart", "touchmove"],

            // String - Tooltip background colour
            tooltipFillColor: "rgb(224,239,238)",

            // String - Tooltip label font declaration for the scale label
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip label font size in pixels
            tooltipFontSize: 18,

            // String - Tooltip font weight style
            tooltipFontStyle: "normal",

            // String - Tooltip label font colour
            tooltipFontColor: "rgba(40,46,48,0.9)",

            // String - Tooltip title font declaration for the scale label
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip title font size in pixels
            tooltipTitleFontSize: 18,

            // String - Tooltip title font weight style
            tooltipTitleFontStyle: "bold",

            // String - Tooltip title font colour
            tooltipTitleFontColor: "rgba(40,46,48,0.9)",

            // Number - pixel width of padding around tooltip text
            tooltipYPadding: 10,

            // Number - pixel width of padding around tooltip text
            tooltipXPadding: 10,

            // Number - Size of the caret on the tooltip
            tooltipCaretSize: 8,

            // Number - Pixel radius of the tooltip border
            tooltipCornerRadius: 0,

            // Number - Pixel offset from point x to tooltip edge
            tooltipXOffset: 10,

            // String - Template string for single tooltips
            tooltipTemplate: "<%= value %>",

            // String - Template string for multiple tooltips
            multiTooltipTemplate: "<%= value %>",

            // Function - Will fire on animation progression.
            onAnimationProgress: function(){},

            // Function - Will fire on animation completion.
            onAnimationComplete: function(){}
        };

        $scope.ctx = $("#destination-chart").get(0).getContext("2d");
        $scope.myBarChart = new Chart($scope.ctx).Bar($scope.chartData, $scope.options);
        $scope.myCanvas =  document.getElementById('destination-chart');

					
  		$scope.$on('destinationInfoSet', function(){
  			$scope.isHidden = false;
            $scope.chartTabShow = true;
            $scope.chartSets = [];
            $scope.chartSetIndex = 0;
            
		 	$scope.destinationCard =  destinationInfo.getDestination();
            
            $scope.tripInfo.destinationRank = $scope.destinationCard.destinationRank;
    

            var dataLength = $scope.myBarChart.datasets[0].bars.length;       
            for(var j = 0; j < dataLength ; j++){
                  $scope.myBarChart.removeData();
            };

            $scope.newLabels = [];
            $scope.newReturnLabel = [];
            for (var i = 0; i < $scope.destinationCard.fares.length; i++){
                    var date = ($scope.destinationCard.fares[i].departureDateTime).substring(0,10);
                    var returnDate = ($scope.destinationCard.fares[i].returnDateTime).substring(0,10);
                    $scope.newLabels.push(date);
                    $scope.lastLabel = date;
                    $scope.newReturnLabel.push(returnDate);
            };

                       
            $scope.newData = [];

            for (var i = 0; i < $scope.destinationCard.fares.length; i++){
                    var fare = ($scope.destinationCard.fares[i].lowestFare);
                    if (fare == "N/A"){
                        fare = 0;
                    }
                    $scope.newData.push(fare);
            };

            $scope.chartData = {
                labels: $scope.newLabels,
                datasets: [
                    {
                        label: "Destination fare differences dataset",
                        fillColor: "rgb(125,205,205)",
                        strokeColor: "rgb(125,205,205)",
                        highlightFill: "rgb(255,11,92)",
                        highlightStroke: "rgb(255,11,92)",
                        data: $scope.newData
                    }
                ]
            };
          
            for (var i = 0; i < $scope.chartData.labels.length; i++){
                    $scope.myBarChart.addData([$scope.chartData.datasets[0].data[i]], $scope.chartData.labels[i]);
            };    
           
            $scope.newSet = {
                labels: $scope.newLabels,
                returns: $scope.newReturnLabel,
                fares: $scope.newData
            };

            $scope.chartSets.push($scope.newSet);
            $scope.chartSetIndex = 1;
            
            $scope.firstChart = true;
            $scope.myBarChart.update();
            
		    
            $scope.tripInfo.lowestFare = $scope.destinationCard.minFare;
               for (var i = 0; i < $scope.destinationCard.fares.length; i++){
                    if ($scope.destinationCard.fares[i].lowestFare == $scope.tripInfo.lowestFare){
                        $scope.tripInfo.departureDate = ($scope.destinationCard.fares[i].departureDateTime).substring(0,10);
                        $scope.tripInfo.arrivalDate = ($scope.destinationCard.fares[i].returnDateTime).substring(0,10);
                    }
                };

            if($scope.destinationCard.destinationRank == null){
                $scope.isDestinationRankChosen = true;

            };


            $scope.seasonalityURL = 'http://bridge.sabre.cometari.com/historical/flights/' + $scope.destinationCard.id +'/seasonality';
            $scope.seasonality = [];
            $http({
                  method: 'GET',
                  url: $scope.seasonalityURL
              }).success(function (result) {
              $scope.seasonality = result;
          
            $scope.departureDay = moment($scope.tripInfo.departureDate);
            $scope.tripInfo.season = $scope.seasonality.Seasonality[$scope.departureDay.week()-1].SeasonalityIndicator; 
            });


              if($scope.instaFlight.pointofsalecountry == "US"){
                $scope.isPointOfSaleUS = false;
                 $scope.fareforcastURL = 'http://bridge.sabre.cometari.com/forecast/flights/fares?origin='+ $scope.instaFlight.origin +
                '&destination=' + $scope.destinationCard.id +
                '&departuredate=' + $scope.tripInfo.departureDate+ 
                '&returndate=' + $scope.tripInfo.arrivalDate; 

                   $http({
                      method: 'GET',
                      url: $scope.fareforcastURL  
                  }).success(function (result) {
                  $scope.fareForcast = result;
                    if($scope.fareForcast.Recommendation == undefined){
                        $scope.tripInfo.fareForcastAdvise = "no forecast available"
                    }else{
                        $scope.tripInfo.fareForcastAdvise = $scope.fareForcast.Recommendation;
                    };                
                });
            };
		});

         $scope.nextChart = function(){
            if($scope.firstChart){
              $scope.isLoading = false;
                 $scope.leadPriceCalURL1 = 'http://bridge.sabre.cometari.com/shop/flights/fares?origin=' + $scope.instaFlight.origin + 
                        '&destination='+ $scope.destinationCard.id + 
                        '&lengthofstay='+ $scope.instaFlight.lengthofstay +
                          '&pointofsalecountry=' + $scope.instaFlight.pointofsalecountry;

                  var thisday = moment();
                  var lastday = moment($scope.lastLabel);
                  var myduration = lastday.diff(thisday);
                  var d = moment.duration(myduration);
             
                  var dayDiff = d._data.days;
                  dayDiff+=1;
                  
                 
                 $http.get($scope.leadPriceCalURL1).success(function (result) {

                        for(var i = dayDiff; i < result.length; i += 14){
                            var mynextLabels = [];
                            var mynextData = []; 
                            var mynextReturns = []; 
          
                                for(var j = 0;j<14 && i+j <result.length ;j++){
                                    var m = i+j;
                                    mynextLabels[j] = (result[m].fares[0].departureDateTime).substring(0,10);

                                    mynextReturns[j] =  (result[m].fares[0].returnDateTime).substring(0,10);
                                    mynextData[j] =  result[m].fares[0].lowestFare;
                                    if (mynextData[j] == "N/A"){
                                    mynextData[j] = 0;
                                    };
                                };
                              
                            $scope.chartSets.push({
                                    labels: mynextLabels,
                                    returns: mynextReturns,
                                    fares: mynextData
                                });
                    }; 
                

                    var datasetLength = $scope.myBarChart.datasets[0].bars.length;       
                    for(var j = 0; j < datasetLength ; j++){
                          $scope.myBarChart.removeData();
                    };
              
                    $scope.previousData = $scope.chartSets[$scope.chartSetIndex].fares;
                    $scope.previousLabels = $scope.chartSets[$scope.chartSetIndex].labels;
               
                    $scope.previousReturns = $scope.chartSets[$scope.chartSetIndex].returns;
                    for(var i=0; i < 14; i++){
                        $scope.myBarChart.addData([$scope.previousData[i]],$scope.previousLabels[i]);
                        $scope.lastLabel = $scope.previousLabels[i];
                    };
                    $scope.chartSetIndex++;
                    $scope.isLoading = true; 
                    $scope.isHiddenPast = false;  
                    $scope.myBarChart.update(); 
                  
                         
                    });
                
                $scope.firstChart = false;   
                       
            };
                if($scope.chartSets[$scope.chartSetIndex] != undefined){
    
                var datasetLength = $scope.myBarChart.datasets[0].bars.length;       
                for(var j = 0; j < datasetLength ; j++){
                      $scope.myBarChart.removeData();
                };
                
      
                $scope.previousData = $scope.chartSets[$scope.chartSetIndex].fares;
                $scope.previousLabels = $scope.chartSets[$scope.chartSetIndex].labels;
           
                $scope.previousReturns = $scope.chartSets[$scope.chartSetIndex].returns;
                for(var i=0; i < $scope.previousData.length; i++){
                    $scope.myBarChart.addData([$scope.previousData[i]],$scope.previousLabels[i]);
                    $scope.lastLabel = $scope.previousLabels[i];
                };
                $scope.chartSetIndex++;
                $scope.myBarChart.update(); 
                         
                $scope.isHiddenPast = false; 
                } 

    };



        $scope.previousChart = function(){
            if($scope.chartSetIndex > 1){

                $scope.chartSetIndex = $scope.chartSetIndex - 1;
          
                var datasetLength = $scope.myBarChart.datasets[0].bars.length;       
                for(var j = 0; j < datasetLength ; j++){
                      $scope.myBarChart.removeData();
                };
                var previousChartIndex = $scope.chartSetIndex - 1;
               
                if(previousChartIndex == 0)  $scope.isHiddenPast = true;
                $scope.previousData = $scope.chartSets[previousChartIndex].fares;
                $scope.previousLabels = $scope.chartSets[previousChartIndex].labels;
             
                $scope.previousReturns = $scope.chartSets[previousChartIndex].returns;
                for(var i=0; i <$scope.previousData.length ; i++){
                    $scope.myBarChart.addData([$scope.previousData[i]],$scope.previousLabels[i]);
                    $scope.lastLabel = $scope.previousLabels[i];
                };
                $scope.myBarChart.update();
                $scope.isHiddenFuture = false;  
            };
            if( $scope.chartSetIndex<1){
                 $scope.isHiddenPast = true;
            };
            
        };

        
        Chart.helpers.addEvent( $scope.myCanvas, 'mousemove', function(evt){
            var bars = $scope.myBarChart.getBarsAtEvent(evt);
            if (bars.length > 0){
                 $scope.myCanvas.style.cursor = "pointer";
            }
            else {
                 $scope.myCanvas.style.cursor = "default";
            } 
        });


        Chart.helpers.addEvent( $scope.myCanvas, 'click', function(evt){            
            var bars =  $scope.myBarChart.getBarsAtEvent(evt);
            Chart.helpers.each(bars, function(bar){
                $scope.tripInfo.lowestFare = bar.value; 
                $scope.tripInfo.departureDate = bar.label;

                for (var i = 0; i < $scope.myBarChart.datasets[0].bars.length; i++){
                    if ($scope.newLabels[i] == $scope.tripInfo.departureDate){
                        if($scope.chartSetIndex == 1){
                            $scope.tripInfo.arrivalDate = $scope.newReturnLabel[i];
                            $scope.departureDay = moment($scope.tripInfo.departureDate);
                            $scope.tripInfo.season = $scope.seasonality.Seasonality[$scope.departureDay.week()-1].SeasonalityIndicator; 
                        
                        };
                    };
                    if($scope.chartSetIndex > 1 && $scope.chartSets[$scope.chartSetIndex-1].labels[i] == $scope.tripInfo.departureDate){
                            $scope.tripInfo.arrivalDate = $scope.chartSets[$scope.chartSetIndex-1].returns[i];
                           
                            $scope.departureDay = moment($scope.tripInfo.departureDate);
                            $scope.tripInfo.season = $scope.seasonality.Seasonality[$scope.departureDay.week()-1].SeasonalityIndicator; 
                           
                        };
                };
                if($scope.instaFlight.pointofsalecountry == "US"){
                $scope.fareforcastURL = 'http://bridge.sabre.cometari.com/forecast/flights/fares?origin='+ $scope.instaFlight.origin +
                '&destination=' + $scope.destinationCard.id +
                '&departuredate=' + $scope.tripInfo.departureDate+ 
                '&returndate=' + $scope.tripInfo.arrivalDate; 

                $http({
                      method: 'GET',
                      url: $scope.fareforcastURL  
                  }).success(function (result) {
                  $scope.fareForcast = result;
                  if($scope.fareForcast.Recommendation == undefined){

                      $scope.tripInfo.fareForcastAdvise = "no forecast available"
                 }else{
                     $scope.tripInfo.fareForcastAdvise = $scope.fareForcast.Recommendation;
                 };
                
                });
              };
              console.log($scope.tripInfo.arrivalDate);
             $scope.$apply();
            });

         
        });
        


		 $scope.closePanel = function(){
		 	$scope.isHidden = true;
		 };

		 $scope.viewFlights = function(){
		 	$('#myFlightsLoaderModal').modal('show');

            $scope.instaFlightURL = 'http://bridge.sabre.cometari.com/shop/flights?origin=' + $scope.instaFlight.origin + 
            '&destination='+ $scope.destinationCard.id + 
            '&departuredate=' + $scope.tripInfo.departureDate + 
            '&returndate=' + $scope.tripInfo.arrivalDate +
            '&pointofsalecountry=' + $scope.instaFlight.pointofsalecountry +'&limit=10';

            $scope.instaFlightResponse = {
                PricedItineraries: []
            };
            $http({
                  method: 'GET',
                  url: $scope.instaFlightURL
              }).success(function (result) {
              $scope.instaFlightResponse = result;
              
              $scope.myFlights = [];
              var changes = "";
              var changesB = "";
              var flightTime;
              var flightTimeB;
              

              if($scope.instaFlightResponse.PricedItineraries[0] != undefined){
                     
                   for(var j = 0; j < $scope.instaFlightResponse.PricedItineraries.length && j<10; j++){
                            $scope.flightSegments = [];
                            $scope.flightSegmentsB = [];
                            if( $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment.length == 1 ){
                                changes = "non stop"
                            }else if($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment.length == 2) {
                                 changes = "1 stop"
                            }else {
                                changes = $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment.length + "stops"
                            };
                            if( $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment.length == 1 ){
                                changesB = "non stop"
                            }else if($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment.length == 2) {
                                 changesB = "1 stop"
                            }else {
                                changesB = $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment.length + "stops"
                            };
                            for(var i = 0, k = $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment.length; i<k; i++){
                                    $scope.flightSegments.push({
                                        departureAirport: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[i].DepartureAirport.LocationCode,
                                        departureTime: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[i].DepartureDateTime).substring(11,16),
                                        arrivalAirport: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[i].ArrivalAirport.LocationCode,
                                        arrivalTime: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[i].ArrivalDateTime).substring(11,16),
                                        length: parseInt($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[i].ElapsedTime/60) + " h  " + $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[i].ElapsedTime % 60  + " min",
                                        airline: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[i].MarketingAirline.Code,
                                        flightNo: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[i].FlightNumber
                                    });
                            };
                            for(var i = 0, k = $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment.length; i<k; i++){
                                    $scope.flightSegmentsB.push({
                                        departureAirport: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[i].DepartureAirport.LocationCode,
                                        departureTime: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[i].DepartureDateTime).substring(11,16),
                                        arrivalAirport: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[i].ArrivalAirport.LocationCode,
                                        arrivalTime: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[i].ArrivalDateTime).substring(11,16),
                                        length: parseInt($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[i].ElapsedTime/60) + " h  " + $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[i].ElapsedTime % 60  + " min",
                                        airline: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[i].MarketingAirline.Code,
                                        flightNo: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[i].FlightNumber
                                    });
                            };
                            flightTime = parseInt($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].ElapsedTime/60) + " h  " + $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].ElapsedTime % 60 + " min" ;
                            
                            flightTimeB = parseInt($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].ElapsedTime/60) + " h  " + $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].ElapsedTime % 60 + " min" ;
                            
                        $scope.myFlights.push( {
                            open: false,
                            origin: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].DepartureAirport.LocationCode,
                            destination:  $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[0].DepartureAirport.LocationCode,
                            departureDate:  ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].DepartureDateTime).substring(0,10),
                            departureTime: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].DepartureDateTime).substring(11,16),
                            arrivalDate: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].ArrivalDateTime).substring(0,10),
                            arrivalTime: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].ArrivalDateTime).substring(11,16),
                            noChanges:  changes,
                            carrier: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].MarketingAirline.Code,
                            flightLength: flightTime,
                            flightNo:   $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[0].FlightSegment[0].FlightNumber,
                            departureDateB: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[0].DepartureDateTime).substring(0,10),
                            departureTimeB:  ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[0].DepartureDateTime).substring(11,16),
                            arrivalDateB: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[0].ArrivalDateTime).substring(0,10),
                            arrivalTimeB: ($scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[0].ArrivalDateTime).substring(11,16),
                            noChangesB: changesB,
                            carrierB: $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[0].MarketingAirline.Code,
                            flightLengthB: flightTimeB,
                            flightNoB:  $scope.instaFlightResponse.PricedItineraries[j].AirItinerary.OriginDestinationOptions.OriginDestinationOption[1].FlightSegment[0].FlightNumber,
                            totalFare: $scope.instaFlightResponse.PricedItineraries[j].AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount,
                            currency: $scope.instaFlightResponse.PricedItineraries[j].AirItineraryPricingInfo.ItinTotalFare.TotalFare.CurrencyCode,
                            segments: $scope.flightSegments,
                            segmentsB: $scope.flightSegmentsB
                            }); 
                        };


                     $scope.isHidden = true;
                     $scope.isHiddenFlightsPanel = false;
                    $('#myFlightsLoaderModal').modal('hide');    
                    

                }else{
                    $('#myFlightsLoaderModal').modal('hide');
                    $('#myFlightsModal').modal('show')
                };
 
              
            });
         
           
		 };

		 $scope.hideFlights = function(){
		 	$scope.isHidden = false;
		 	$scope.isHiddenFlightsPanel = true;
		 };

      }]);