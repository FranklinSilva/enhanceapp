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

 /* $scope.keepName = function(task){
    taskService.keepName(task);
    console.log(task)
    $scope.task = task;
  }*/

    $scope.keepName = function(task){
    taskService.keepName = task;
    console.log(task)
    }

    // Modal 1
    $ionicModal.fromTemplateUrl('pages/modalCycle.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalCycle = modal;
    });

    $scope.openModal = function() {
      $scope.modalCycle.show(); 
    };

    $scope.closeModal = function() {
      $scope.modalCycle.hide();
    };


  }]);

enhanceApp.controller('warningController', ['$scope', '$log', '$routeParams', '$ionicModal','$ionicPlatform', 'bookmarking', 'taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, bookmarking, taskService) {

  $scope.isBookmarked = function(y){
    console.log($scope)
    $scope.tasks[y].Bookmarked = bookmarking.isBookmarked($scope.tasks[y].Bookmarked);
    taskService.updateTask($scope.tasks[y]);
  }

  $ionicPlatform.ready(function() {
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
    Bookmarked: false,
    Completed: false,
    Cycles: []
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

  $scope.$on('$destroy', function() {
    $scope.modal.remove(); 
  });

}]);

enhanceApp.controller('cardPageController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform','taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, taskService) {

  $scope.task = taskService.keepName;

  $scope.showNotes = false;
    console.log($scope.showNotes);

  $scope.openNotes = function(y){
    console.log($scope.showNotes);
    return $scope.showNotes = y;
  }

  $scope.getCycleInfo = function(y, x){
    $scope.note = x;
    $scope.nameC = y;
  }

    // Modal 1
    $ionicModal.fromTemplateUrl('pages/modalCycle.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('pages/modalCardEdit.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    // Modal 3
    $ionicModal.fromTemplateUrl('pages/modalNotes.html', {
      id: '3', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal3 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else if (index == 2) $scope.oModal2.show();
      else $scope.oModal3.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else if (index == 2) $scope.oModal2.hide();
      else $scope.oModal3.hide();
    };

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
      $scope.oModal3.remove();
    });

    $scope.deleteTask = function() {
      taskService.deleteTask($scope.task);      
    };

    $scope.completeTask = function(){
      $scope.task.Completed = true;
      taskService.addTask($scope.task); 
    }
  }]);

enhanceApp.controller('cycleController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform','$interval', '$timeout', '$filter', 'taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, $interval, $timeout, $filter, taskService) {
  
  console.log($scope.task)

   $scope.Note = 'default';
  $scope.teste = function(){
    console.log('teste')
  }

  $scope.cycle = function() {
    
    console.log('ENTREI dentro da funcao do ciclo')

  };

  $scope.cycleBegin = function() {
    $scope.counter = $scope.task.Cycles.length;
    console.log($scope.task.Cycles.length)
    console.log($scope.task)
    $scope.ifCancelled = 0;
    //adicionar frase CICLO COMECOU no HTML 
    $scope.tirthMinutes = 10;
    $scope.displayTime = '30:00';
    mins = 1;
    seconds = 1;
    count = 1
    $scope.ifCancelled = 0
    $scope.exit = $scope.counter;
    $scope.progress = 0;
    $scope.stopTime = $interval($scope.updateCycle, 1000);
    $scope.timeMax = 1500 //25 MINUTOS = 1500 SEG;
  };
  $scope.updateCycle = function() {
    console.log($scope.tirthMinutes);
    mins = parseInt($scope.tirthMinutes / 60);
    seconds = parseInt($scope.tirthMinutes % 60);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    $scope.displayTime = mins + ":" + seconds;

    $scope.tirthMinutes--;
    $scope.progress++;
    if ($scope.tirthMinutes < 0 && count < 3) {  
      if(count < 2){
          //alert cycle done
          console.log('done cycle!! Starting Countdown');
          count++;
          $scope.timeMax = 300;
          $scope.tirthMinutes = 5 ;
      } else {
          $interval.cancel($scope.stopTime);
          $scope.recordCycle($scope.counter);
        }
    }
    if ($scope.ifCancelled > 0) {
      function stopUpdating(){
          $interval.cancel($scope.stopTime);
       }
    
      $timeout(stopUpdating, 10);
    
    }; 
  };

  $scope.recordCycle = function(x){
    $scope.task.Cycles[x] = {
      Name: $filter('date')(new Date(), 'yyyy-MM-dd'),
      Note: $scope.Note
    }
   taskService.updateTask($scope.task);

  };
  
}]);/* CONTROLLERS */
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

  $scope.Refresh = function(){
    taskService.getAllTasks().then(function(tasks) {
      $scope.tasks = tasks;
      console.log('Update!')
    });
  }

 /* $scope.keepName = function(task){
    taskService.keepName(task);
    console.log(task)
    $scope.task = task;
  }*/

    $scope.keepName = function(task){
    taskService.keepName = task;
    console.log(task)
  }

    // Modal 1
    $ionicModal.fromTemplateUrl('pages/modalCycle.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalCycle = modal;
    });

    $scope.openModal = function() {
      $scope.modalCycle.show(); 
    };

    $scope.closeModal = function() {
      $scope.modalCycle.hide();
    };


  }]);

enhanceApp.controller('warningController', ['$scope', '$log', '$routeParams', '$ionicModal','$ionicPlatform', 'bookmarking', 'taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, bookmarking, taskService) {

  $scope.isBookmarked = function(y){
    console.log($scope)
    $scope.tasks[y].Bookmarked = bookmarking.isBookmarked($scope.tasks[y].Bookmarked);
    taskService.updateTask($scope.tasks[y]);
  }

  $ionicPlatform.ready(function() {
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
    Bookmarked: false,
    Completed: false,
    Cycles: []
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

  $scope.$on('$destroy', function() {
    $scope.modal.remove(); 
  });

}]);

enhanceApp.controller('cardPageController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform','taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, taskService) {

  $scope.task = taskService.keepName;

  $scope.getCycleInfo = function(y, x){
    $scope.note = x;
    $scope.nameC = y;
  }

    // Modal 1
    $ionicModal.fromTemplateUrl('pages/modalCycle.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('pages/modalCardEdit.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    // Modal 3
    $ionicModal.fromTemplateUrl('pages/modalNotes.html', {
      id: '3', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal3 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else if (index == 2) $scope.oModal2.show();
      else $scope.oModal3.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else if (index == 2) $scope.oModal2.hide();
      else $scope.oModal3.hide();
    };

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
      $scope.oModal3.remove();
    });

    $scope.deleteTask = function() {
      taskService.deleteTask($scope.task);      
    };

    $scope.completeTask = function(){
      $scope.task.Completed = true;
      taskService.addTask($scope.task); 
    }
  }]);

enhanceApp.controller('cycleController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform','$interval', '$timeout', '$filter', 'taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, $interval, $timeout, $filter, taskService) {
  
   $scope.Note = 'default';


  $scope.cycleBegin = function() {
    $scope.counter = $scope.task.Cycles.length;
    console.log($scope.task.Cycles.length)
    console.log($scope.task)
    $scope.ifCancelled = 0;
    //adicionar frase CICLO COMECOU no HTML 
    $scope.tirthMinutes = 10;
    $scope.displayTime = '30:00';
    mins = 1;
    seconds = 1;
    count = 1
    $scope.ifCancelled = 0
    $scope.exit = $scope.counter;
    $scope.progress = 0;
    $scope.stopTime = $interval($scope.updateCycle, 1000);
    $scope.timeMax = 1500 //25 MINUTOS = 1500 SEG;
  };
  $scope.updateCycle = function() {
    console.log($scope.tirthMinutes);
    mins = parseInt($scope.tirthMinutes / 60);
    seconds = parseInt($scope.tirthMinutes % 60);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    $scope.displayTime = mins + ":" + seconds;

    $scope.tirthMinutes--;
    $scope.progress++;
    if ($scope.tirthMinutes < 0 && count < 3) {  
      if(count < 2){
          //alert cycle done
          console.log('done cycle!! Starting Countdown');
          count++;
          $scope.timeMax = 300;
          $scope.tirthMinutes = 5 ;
      } else {
          $interval.cancel($scope.stopTime);
          $scope.recordCycle($scope.counter);
        }
    }
    if ($scope.ifCancelled > 0) {
      function stopUpdating(){
          $interval.cancel($scope.stopTime);
       }
    
      $timeout(stopUpdating, 10);
    
    }; 
  };

  $scope.recordCycle = function(x){
    $scope.task.Cycles[x] = {
      Name: $filter('date')(new Date(), 'yyyy-MM-dd'),
      Note: $scope.Note
    }
   taskService.updateTask($scope.task);

  };
  
}]);