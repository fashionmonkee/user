'use strict';

angular.module('routerApp').controller('listCtrl', function($scope,$api,$state,$location,localStorageService) {
    $scope.loading=true;
    $scope.filterData={areas:[],categories:[],sortBy:''};
    $scope.filterData.areas[0]=($state.params.area)?$state.params.area:'';
    $scope.filterData.categories[0]=($state.params.category)?parseInt($state.params.category):'';
    $scope.searchData='';
    $scope.moveState=function(state,id){
      $state.go(state,{data:id});
    };
    $scope.gotoDetail=function(url,id){
       $location.path('/' + url + '/'+id);
    };

    $scope.getAreas=function(){
      var getAreas=new $api('areas?city='+localStorageService.get('city'));
      getAreas.list().then(function(response) {
        $scope.areas=response.data; 
         console.log($scope.areas);      
    });
    };
    $scope.getAreas();

     $scope.getCategory=function(){
      var Api=new $api('mainCategory');
      Api.list().then(function(response) {
        $scope.mainCategory=response.data;
      });
    };

    $scope.getCategory();


    $scope.getItems=function(item){
      var getItems=new $api(item);
      getItems.list().then(function(response) {
        $scope.shops=response.data;
        $scope.loading=false;
        console.log($scope.shops);
    });
    };
    $scope.getItems("shops");



    $scope.callMap=function(shop){
      $state.go('map',{data: shop});
    };

     $scope.callNumber=function(number){
      var onSuccess=function(){
      }
      var onError=function(){
      }
      window.plugins.CallNumber.callNumber(onSuccess, onError, number);
    };
     

    $scope.share=function(shop){
      var message=shop.name+','+shop.description;
      var image=shop.banner_image;
      var link='';
      window.plugins.socialsharing.share(message,null,'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl');
    };

    $scope.search=function(){
      $scope.getItems("shops?name="+$scope.searchData);
    }

    $scope.advanceFilter=function(){
      var areas,categories,sortBy,query;
      query='shops?city='+localStorageService.get('city');
      if($scope.filterData.areas.length){
        query+="&areas="+$scope.filterData.areas.toString();
      }
      if($scope.filterData.categories.length){
        query+="&categories="+$scope.filterData.categories.toString();
      }
      if($scope.filterData.sortBy.length){
        query+="&sortBy="+$scope.filterData.sortBy;
      }
      console.log(query);
      $scope.getItems(query);
      $('.button-filter').sideNav('hide');
    };

        $scope.advanceFilter();


  
});