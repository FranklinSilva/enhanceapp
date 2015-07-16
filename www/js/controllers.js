/* CONTROLLERS */
// -----------------------------------------------------

enhanceApp.controller('mainController', ['$scope', '$log', '$ionicModal', '$route','$ionicPlatform', 'bookmarking', 'taskService', function($scope, $log, $ionicModal, $route, $ionicPlatform, bookmarking, taskService) {

  $scope.isBookmarked = function(y){
    console.log($scope)
    $scope.tasks[y].Bookmarked = bookmarking.isBookmarked($scope.tasks[y].Bookmarked);
    taskService.updateTask($scope.tasks[y]);
  }

  $ionicPlatform.ready(function() {
    taskService.initDB();

    // Get all task records from the database.
    taskService.getAllTasks().then(function(tasks) {
      $scope.tasks = tasks;
      console.log('entrei! Meio')
    });
  });

  $scope.keepName = function(task){
    taskService.keepName = task;
    console.log(task)
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

enhanceApp.controller('warningController', ['$scope', '$log', '$routeParams', '$ionicModal','$ionicPlatform', 'bookmarking', 'taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, bookmarking, taskService) {

  $scope.isBookmarked = function(y){
    console.log($scope)
    $scope.tasks[y].Bookmarked = bookmarking.isBookmarked($scope.tasks[y].Bookmarked);
    taskService.updateTask($scope.tasks[y]);
  }

  $ionicPlatform.ready(function() {
    taskService.initDB();

    // Get all task records from the database.
    taskService.getAllTasks().then(function(tasks) {
      $scope.tasks = tasks;
      console.log('entrei! Vermelho')
    });
  });

  $scope.style ={
    myStyle: '#FF6F5C'
  }

}]);

enhanceApp.controller('attentionController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform', 'bookmarking','taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, bookmarking, taskService) {

  $scope.isBookmarked = function(y){
    console.log($scope)
    $scope.tasks[y].Bookmarked = bookmarking.isBookmarked($scope.tasks[y].Bookmarked);
    taskService.updateTask($scope.tasks[y]);
  }

  $ionicPlatform.ready(function() {
    taskService.initDB();

    // Get all task records from the database.
    taskService.getAllTasks().then(function(tasks) {
      $scope.tasks = tasks;
      console.log('entrei! Amarelo')
    });
  });

  $scope.style ={
    myStyle: '#edc85f'
  }


}]);

enhanceApp.controller('headerController', ['$scope', '$log', '$routeParams','$ionicModal', 'taskService', function($scope, $log, $routeParams, $ionicModal, taskService) {

  $ionicModal.fromTemplateUrl('pages/modalCreatePage.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  /* $scope.showAddTaskModal = function() {
    $scope.task = {};
    $scope.action = 'Add';
    $scope.isAdd = true;
    $scope.modal.show();      
  };
  
  $scope.showEditTaskModal = function(task) {
    $scope.task = task;
    $scope.action = 'Edit';
    $scope.isAdd = false;     
    $scope.modal.show();
  };*/

    $scope.task = {
      Important: false,
      Urgent: false,
      Bookmarked: false
    };

  $scope.saveTask = function() {
    taskService.addTask($scope.task); 

/*    if ($scope.isAdd) {
      taskService.addTask($scope.task);       
    } else {
      taskService.updateTask($scope.task);        
    }           */
    $scope.modal.hide();
  };
  
  $scope.deleteTask = function() {
    taskService.deleteTask($scope.task);      
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove(); 
  });

}]);

enhanceApp.controller('cardPageController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform','taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, taskService) {

 $ionicPlatform.ready(function() {
    taskService.initDB();

    // Get all task records from the database.
    taskService.getAllTasks().then(function(tasks) {
      $scope.tasks = tasks;
      console.log('entrei! Big')
    });
  });

 $scope.task = taskService.keepName;

}]);