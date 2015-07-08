// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
/* angular.module('starter', ['ionic']):*/



var enhanceApp = angular.module('enhanceApp', ['ionic', 'ngRoute'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}) 

/*CONFIG*/
// -----------------------------------------------------

enhanceApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    
    .when('/warning', {
        templateUrl: 'pages/warning.html',
        controller: 'warningController'
    })
    
    .when('/attention', {
        templateUrl: 'pages/attention.html',
        controller: 'attentionController'
    })
    
});

/* CONTROLLERS */
// -----------------------------------------------------

enhanceApp.controller('mainController', ['$scope', '$log', function($scope, $log) {
    
    $scope.swipeLeft = function () {
      window.location = "#/attention";
    };
    
    $scope.swipeRight = function () {
      window.location = "#/warning";
    };

    $scope.card = {
      name: 'Study Mathematics'
    }
    
}]);

enhanceApp.controller('warningController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    $scope.swipeLeft = function () {
      window.location = "#/";
    };
    
    $scope.card = {
      name: 'RED Study Mathematics'
    }
    
}]);

enhanceApp.controller('attentionController', ['$scope', '$log', '$routeParams', function($scope, $log, $routeParams) {
    
    $scope.swipeRight = function () {
      window.location = "#/";
    };

    $scope.card = {
      name: 'YELLOW Study Mathematics'
    }
    
}]);

/* DIRECTIVES */
// -----------------------------------------------------

enhanceApp.directive("cardBookmarked", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/cardBookmarked.html',
       replace: true
   }
});

enhanceApp.directive("cardSmall", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/cardSmall.html',
       replace: true
   }
});

enhanceApp.directive("cardShow", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/cardShow.html',
       replace: true
   }
});

/* SERVICES */
// -----------------------------------------------------
