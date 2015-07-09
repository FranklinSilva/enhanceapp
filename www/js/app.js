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

/* COMENTARIO DA CHATIACAO! Depois de passar o dia desenvolvendo a logica e fazendo a zorra, descubro que ja tem pronto e de facil acesso 

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
*/
/* CONTROLLERS */
// -----------------------------------------------------

enhanceApp.controller('mainController', ['$scope', '$log', '$ionicModal', function($scope, $log, $ionicModal) {
    
    $scope.swipeLeft = function () {
      window.location = "#/attention";
    };
    
    $scope.swipeRight = function () {
      window.location = "#/warning";
    };

    $scope.card = {
      name: 'Study Mathematics'
    }
    
    

    $scope.openModalCycle = function() {

      $ionicModal.fromTemplateUrl('pages/modalCycle.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });


      $scope.modal.show();
    };

/*        $ionicModal.fromTemplateUrl('pages/modalCardShow.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });*/


    // Modal 1
    $ionicModal.fromTemplateUrl('pages/modalCycle.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('pages/modalCardShow.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });


}]);

enhanceApp.controller('warningController', ['$scope', '$log', '$routeParams', '$ionicModal', function($scope, $log, $routeParams, $ionicModal) {
    $scope.swipeLeft = function () {
      window.location = "#/";
    };
    
    $scope.style ={
      myStyle: 'red'
    }

    $scope.card = {
      name: 'Study Mathematics'
    }

}]);

enhanceApp.controller('attentionController', ['$scope', '$log', '$routeParams','$ionicModal', function($scope, $log, $routeParams, $ionicModal) {
    
    $scope.swipeRight = function () {
      window.location = "#/";
    };

    $scope.style ={
      myStyle: 'yellow'
    }

    $scope.card = {
      name: 'Study Mathematics'
    }
    
}]);

enhanceApp.controller('headerController', ['$scope', '$log', '$routeParams','$ionicModal', function($scope, $log, $routeParams, $ionicModal) {

  $ionicModal.fromTemplateUrl('pages/modalCreatePage.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

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

enhanceApp.directive("cardBig", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/cardBig.html',
       replace: true
   }
});

/* SERVICES */
// -----------------------------------------------------
/*
enhanceApp.service('randomColor', ['', function(){
  
  var self = this;
  
  this.getRandom = function(min, max) {
    self.randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return self.value;    
  }
}])

enhanceApp.service('cycleBegin', ['', function(){
  var self = this;

  this.
}])*/