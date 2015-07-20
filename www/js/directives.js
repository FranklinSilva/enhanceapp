/* DIRECTIVES */
// -----------------------------------------------------

enhanceApp.directive("cardBookmarked", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/cardBookmarked.html',
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

enhanceApp.directive("cardBig", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/cardBig.html',
       replace: true
   }
});

enhanceApp.directive("editAdd", function() {
   return {
       restrict: 'AE',
       templateUrl: 'directives/taskEditAdd.html',
       replace: true
   }
});