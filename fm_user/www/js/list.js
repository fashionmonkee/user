'use strict';

angular.module('routerApp').controller('listCtrl', function($scope,$api,$state,$location) {
    
    $scope.filterData={areas:'',categories:'',sortBy:''};
    $scope.searchData='';
    $scope.moveState=function(state,id){
      $state.go(state,{data:id});
    };
    $scope.gotoDetail=function(url,id){
       $location.path('/' + url + '/'+id);
    };

    $scope.getAreas=function(){
      var getAreas=new $api('areas');
      getAreas.list().then(function(response) {
        $scope.areas=response.data; 
         console.log($scope.areas);      
    });
    };
    $scope.getAreas();

    $scope.getItems=function(item){
      var getItems=new $api(item);
      getItems.list().then(function(response) {
        $scope.shops=response.data;
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
      query='shops?'
      if($scope.filterData.areas.length){
        query+="areas="+$scope.filterData.areas.toString();
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


  
});