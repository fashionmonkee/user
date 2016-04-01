'use strict';


angular.module('routerApp')
  .controller('mapCtrl', function($scope,$state,$api) {
  	$scope.moveState=function(state){
  		$state.go(state);
  	};
    $scope.shop=$state.params.data;
    $scope.locationPlace={};
    $scope.map = {
          center: {
            latitude: $state.params.data.address.latitude,
            longitude: $state.params.data.address.longitude
          },
          zoom: 10,
        };
        $scope.locationPlace.coords = {
        'latitude': $state.params.data.address.latitude,
        'longitude': $state.params.data.address.longitude
        };
        $scope.locationPlace.icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + '' + '|FF7D72|';
        $scope.locationPlace.title = "shops";

});
