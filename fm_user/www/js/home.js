'use strict';


angular.module('routerApp')
  .controller('homeCtrl', function($scope,$state,$api,localStorageService) {
    $scope.loading=true;
  	$scope.moveState=function(state){
  		$('.button-collapse').sideNav('hide');
  		$state.go(state);
  	};

    $scope.getCities=function(){
      var Api=new $api('cities');
      Api.list().then(function(response) {
        $scope.cities=response.data;
        if(angular.isDefined(localStorageService.get('city')) && localStorageService.get('city') !== null){
          $scope.currentCity=localStorageService.get('city');
          $scope.getAreas($scope.currentCity);
          $scope.getBanners($scope.currentCity);
        }else{
          $scope.currentCity=response.data[0].name;
          localStorageService.set('city',response.data[0].name);
          $scope.getAreas($scope.currentCity);
          $scope.getBanners($scope.currentCity);
        }        
      });
    };

  	$scope.getAreas=function(city){
      var Api=new $api('areas?city='+city);
      Api.list().then(function(response) {
        $scope.areas=response.data;
    });
  	};

    $scope.getBanners=function(city){
      var Api=new $api('banners?city='+city);
      Api.list().then(function(response) {
        $scope.banners=response.data;
        $scope.loading=false;
    });
    };
  	
  	$scope.changeCity=function(data){
      localStorageService.set('city',data.name);
  		$scope.currentCity=data.name;
      $scope.getAreas($scope.currentCity);
      $scope.getBanners($scope.currentCity);
  	};

     $scope.getCategory=function(){
      var Api=new $api('mainCategory');
      Api.list().then(function(response) {
        $scope.mainCategory=response.data;
      });
  	};

      $scope.getCategory();
      $scope.getCities();
});