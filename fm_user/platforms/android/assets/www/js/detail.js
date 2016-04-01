'use strict';


angular.module('routerApp')
  .controller('detailCtrl', function($scope,$api,$state,localStorageService) {
    $scope.starRating=0;
    $scope.comment='';
    $scope.editComment='';
    $scope.mainCategories=[{id:'1',name:'Mens'},{id:'2',name:'Womens'},{id:'3',name:'Kids'}];
    $scope.mainCategory=$scope.mainCategories[0];
    $scope.starRating='';
    $scope.loginData=localStorageService.get('loginData');
    console.log($scope.loginData);
 

  	$scope.moveState=function(state){
  		$state.go(state);
  	};



    $scope.postRate=function(id){
      var api=new $api('ratings');
      api.save({value:$scope.starRating,shop_id:$scope.shop.id,user_id:$scope.loginData.id}).then(function(response){
        $scope.closeModal('rate-modal');
      });      
    };

    $scope.postComment=function(flag){
      var api=new $api('reviews');
      if(flag === 'edit'){
        api.save({id:$scope.editComment.id,reviews:$scope.editComment.reviews,shop_id:$scope.shop.id,user_id:$scope.loginData.id}).then(function(response){
        $scope.editComment='';
        $scope.getReviews("reviews?shop_id=1");
        $scope.closeModal('comment-modal');
      });
      }else{
        api.save({id:null,reviews:$scope.comment,shop_id:$scope.shop.id,user_id:$scope.loginData.id}).then(function(response){
        $scope.comment='';
        $scope.getReviews("reviews?shop_id=1");
        $scope.closeModal('comment-modal');
      });
      }      
    };

    $scope.openModal=function(id){
      $('#'+id).openModal();
    };

    $scope.closeModal=function(id){
      $('#'+id).closeModal();
    };

    $scope.editRate=function(id){
      var shopId='shop_id='+$scope.shop.id;
      var userId='user_id='+$scope.loginData.id;
      var api=new $api('ratings'+'?'+shopId+'&'+userId);
      api.list().then(function(response){
        if(response.data.length > 0){
          $scope.starRating=response.data[0].value;
        }
         $('#'+id).openModal({
        });
      });
    };

    $scope.editComments=function(value){
      $scope.editComment=value;
      $('#comment-modal').openModal({
      });
    };


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
      var message=shop.description;
      var subject=shop.name;
      var image=shop.banner;
      var link="";
      window.plugins.socialsharing.share(message,subject,image,link);
    };

  	$scope.getShop=function(data){
  		var getShop=new $api(data);
  		getShop.get('1').then(function(response) {
  			$scope.shop=response.data;
        
		});
  	};
    $scope.getReviews=function(item){
      var getReviews=new $api(item);
      getReviews.list().then(function(response) {
        $scope.reviews=response.data;    
    });
    };
    
    $scope.setCategory=function(cat){
        $scope.mainCategory=cat;
    }
  	$scope.getShop("shops");
    $scope.getReviews("reviews?shop_id=1");
    
  	

});

  angular.module('routerApp').directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;
      
      $scope.isolatedClick = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope.rating = $scope._rating = param;
        $scope.hoverValue = $scope.rating;
        $scope.click({
          param: param
        });
      };

      $scope.isolatedMouseHover = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope._rating = 0;
        $scope.hoverValue = param;
        $scope.mouseHover({
          param: param
        });
      };

      $scope.isolatedMouseLeave = function (param) {
        if ($scope.readOnly == 'true') return;

        $scope._rating = $scope.rating;
        $scope.hoverValue = $scope.rating;
        $scope.mouseLeave({
          param: param
        });
      };
        }
    };
});