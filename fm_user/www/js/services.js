'use strict';

angular.module('routerApp').service('$api', function($http, $q) {
  var baseUrl="http://fashionmonkee.com/";
  var currentdate = new Date(); 
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

  var $api = function(endPoint) {
    var _endpointUrl = baseUrl + endPoint;

  this.list = function() {
    return $http.get(_endpointUrl ,{cache:false});
  };

  this.get = function(id) {
    return $http.get(_endpointUrl+'/'+id, {cache:false});
  };

  this.delete = function() {
    return $http.delete(_endpointUrl, {cache:false});
  };

  this.save = function(object,id) {
    if (!!id) {
      return $http.put(_endpointUrl + '/' + id, object,{cache:false});
    } else {
      return $http.post(_endpointUrl, object);
    }
    };
  };
  return $api;
});
