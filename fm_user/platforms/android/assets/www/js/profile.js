'use strict';


angular.module('routerApp').controller('profileCtrl', function($scope,$state,$api,localStorageService) {
  	$scope.loginData=localStorageService.get('loginData');

    $scope.moveState=function(state){
  		$('.button-collapse').sideNav('hide');
  		$state.go(state);
  	};
    $scope.base_url= window.location.origin;


     $(function () {
        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

    function imageIsLoaded(e) {
      $scope.user.profile_url=e.target.result;
      $('#preview').attr('src', e.target.result);
      $scope.$apply();
    };

    $scope.reset=function(){
      $('#preview').attr('src','images/user.png');
      $scope.user.profile_url='';
    };


  	$scope.getItems=function(item){
  		var getItems=new $api(item);
  		getItems.get($scope.loginData.id).then(function(response) {
  			$scope.user=response.data;
  			console.log($scope.user);
		});
  	};

    $scope.update=function(){
      var postItems=new $api('users');
      postItems.save($scope.user).then(function(response){
        console.log(response);
      });
    }
  	$scope.getItems("users");
   
});

