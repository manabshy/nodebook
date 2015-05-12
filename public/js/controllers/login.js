	// define angular module/app
    var signupApp = angular.module('signupApp', []);

    // create angular controller and pass in $scope and $http
    
    function signupController($scope, $http) {

      // create a blank object to hold our form information
      // $scope will allow this to pass between controller and view
      $scope.signupData = {};
      $scope.loginData = {};

    }