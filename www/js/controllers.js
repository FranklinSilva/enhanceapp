/* CONTROLLERS */
// -----------------------------------------------------

enhanceApp.controller('mainController', ['$scope', '$log', '$ionicModal', '$route','$ionicPlatform', 'bookmarking', 'taskService', function($scope, $log, $ionicModal, $route, $ionicPlatform, bookmarking, taskService) {

  $scope.isBookmarked = function(y){
    $scope.tasks[y].bookmarked = bookmarking.isBookmarked($scope.tasks[y].bookmarked);

  }

  $ionicPlatform.ready(function() {
    taskService.initDB();

    // Get all task records from the database.
    taskService.getAllTasks().then(function(tasks) {
      $scope.tasks = tasks;
      console.log('entrei!')
    });
  });

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

enhanceApp.controller('warningController', ['$scope', '$log', '$routeParams', '$ionicModal', 'bookmarking', function($scope, $log, $routeParams, $ionicModal, bookmarking) {

  $scope.isBookmarked = function(y){
    $scope.groupTask[y].bookmarked = bookmarking.isBookmarked($scope.groupTask[y].bookmarked);

  }

  $scope.style ={
    myStyle: '#FF6F5C'
  }

  $scope.groupTask = [
  {
    name: 'Study Mathematics',
    description: 'Minions ipsum potatoooo daa poulet tikka masala. Tatata bala tu bananaaaa la bodaaa jiji underweaaar. Tank yuuu! poopayee jeje bappleees baboiii para tú baboiii bee do bee do bee do uuuhhh. Hana dul sae poulet tikka masala me want bananaaa! Pepete belloo! Poulet tikka masala jeje. Hahaha jiji hahaha jiji poulet tikka masala hahaha me want bananaaa! Belloo! Tank yuuu! la bodaaa bappleees belloo! Hana dul sae hahaha. Potatoooo gelatooo bappleees bappleees tank yuuu! Underweaaar uuuhhh hana dul sae. Para tú para tú bappleees hahaha gelatooo chasy la bodaaa para tú aaaaaah uuuhhh butt. Gelatooo belloo! Tank yuuu! Poulet tikka masala tatata bala tu tatata bala tu potatoooo jeje uuuhhh jeje wiiiii.',
    important: true,
    urgent: false,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: true
  },

  {
    name: 'Buy Beer for Sunday',
    description: 'Minions ipsum esse tempor bee do bee do bee do bee do bee do bee do minim para tú esse minim. Irure uuuhhh consectetur aaaaaah belloo! Poopayee duis elit pepete officia ti aamoo! Nostrud incididunt potatoooo cillum ut butt commodo. Enim bee do bee do bee do aute tulaliloo. Tempor reprehenderit bappleees nisi. Incididunt sed incididunt la bodaaa chasy qui sed ad ti aamoo! Consequat la bodaaa la bodaaa et. Tatata bala tu bappleees baboiii ullamco.',
    important: false,
    urgent: true,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: false
  },

  {
    name: 'Work on Project',
    description: 'Minions ipsum esse tempor bee do bee do bee do bee do bee do bee do minim para tú esse minim. Irure uuuhhh consectetur aaaaaah belloo! Poopayee duis elit pepete officia ti aamoo! Nostrud incididunt potatoooo cillum ut butt commodo. Enim bee do bee do bee do aute tulaliloo. Tempor reprehenderit bappleees nisi. Incididunt sed incididunt la bodaaa chasy qui sed ad ti aamoo! Consequat la bodaaa la bodaaa et. Tatata bala tu bappleees baboiii ullamco. ',
    important: true,
    urgent: false,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: false
  },

  {
    name: 'Meeting with Mayor',
    description: 'Minions ipsum esse tempor bee do bee do bee do bee do bee do bee do minim para tú esse minim. Irure uuuhhh consectetur aaaaaah belloo! Poopayee duis elit pepete officia ti aamoo! Nostrud incididunt potatoooo cillum ut butt commodo. Enim bee do bee do bee do aute tulaliloo. Tempor reprehenderit bappleees nisi. Incididunt sed incididunt la bodaaa chasy qui sed ad ti aamoo! Consequat la bodaaa la bodaaa et. Tatata bala tu bappleees baboiii ullamco. ',
    important: true,
    urgent: true,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: false
  }

  ]

}]);

enhanceApp.controller('attentionController', ['$scope', '$log', '$routeParams','$ionicModal', 'bookmarking', function($scope, $log, $routeParams, $ionicModal, bookmarking) {

  $scope.isBookmarked = function(y){
    $scope.groupTask[y].bookmarked = bookmarking.isBookmarked($scope.groupTask[y].bookmarked);

  }

  $scope.style ={
    myStyle: '#edc85f'
  }

  $scope.groupTask = [
  {
    name: 'Study Mathematics',
    description: 'Minions ipsum potatoooo daa poulet tikka masala. Tatata bala tu bananaaaa la bodaaa jiji underweaaar. Tank yuuu! poopayee jeje bappleees baboiii para tú baboiii bee do bee do bee do uuuhhh. Hana dul sae poulet tikka masala me want bananaaa! Pepete belloo! Poulet tikka masala jeje. Hahaha jiji hahaha jiji poulet tikka masala hahaha me want bananaaa! Belloo! Tank yuuu! la bodaaa bappleees belloo! Hana dul sae hahaha. Potatoooo gelatooo bappleees bappleees tank yuuu! Underweaaar uuuhhh hana dul sae. Para tú para tú bappleees hahaha gelatooo chasy la bodaaa para tú aaaaaah uuuhhh butt. Gelatooo belloo! Tank yuuu! Poulet tikka masala tatata bala tu tatata bala tu potatoooo jeje uuuhhh jeje wiiiii.',
    important: true,
    urgent: false,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: true
  },

  {
    name: 'Buy Beer for Sunday',
    description: 'Minions ipsum esse tempor bee do bee do bee do bee do bee do bee do minim para tú esse minim. Irure uuuhhh consectetur aaaaaah belloo! Poopayee duis elit pepete officia ti aamoo! Nostrud incididunt potatoooo cillum ut butt commodo. Enim bee do bee do bee do aute tulaliloo. Tempor reprehenderit bappleees nisi. Incididunt sed incididunt la bodaaa chasy qui sed ad ti aamoo! Consequat la bodaaa la bodaaa et. Tatata bala tu bappleees baboiii ullamco.',
    important: false,
    urgent: true,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: false
  },

  {
    name: 'Work on Project',
    description: 'Minions ipsum esse tempor bee do bee do bee do bee do bee do bee do minim para tú esse minim. Irure uuuhhh consectetur aaaaaah belloo! Poopayee duis elit pepete officia ti aamoo! Nostrud incididunt potatoooo cillum ut butt commodo. Enim bee do bee do bee do aute tulaliloo. Tempor reprehenderit bappleees nisi. Incididunt sed incididunt la bodaaa chasy qui sed ad ti aamoo! Consequat la bodaaa la bodaaa et. Tatata bala tu bappleees baboiii ullamco. ',
    important: true,
    urgent: false,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: false
  },

  {
    name: 'Meeting with Mayor',
    description: 'Minions ipsum esse tempor bee do bee do bee do bee do bee do bee do minim para tú esse minim. Irure uuuhhh consectetur aaaaaah belloo! Poopayee duis elit pepete officia ti aamoo! Nostrud incididunt potatoooo cillum ut butt commodo. Enim bee do bee do bee do aute tulaliloo. Tempor reprehenderit bappleees nisi. Incididunt sed incididunt la bodaaa chasy qui sed ad ti aamoo! Consequat la bodaaa la bodaaa et. Tatata bala tu bappleees baboiii ullamco. ',
    important: true,
    urgent: true,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: false
  }

  ]

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
      Urgent: false
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

enhanceApp.controller('cardPageController', ['$scope', '$log', '$routeParams','$ionicModal', function($scope, $log, $routeParams, $ionicModal) {

  $scope.card =     {
    name: 'Study Mathematics',
    description: 'Minions ipsum potatoooo daa poulet tikka masala. Tatata bala tu bananaaaa la bodaaa jiji underweaaar. Tank yuuu! poopayee jeje bappleees baboiii para tú baboiii bee do bee do bee do uuuhhh. Hana dul sae poulet tikka masala me want bananaaa! Pepete belloo! ',
    important: true,
    urgent: false,
    cyclesNeeded: 4,
    cyclesCurrent: 2,
    bookmarked: true
  }

}]);