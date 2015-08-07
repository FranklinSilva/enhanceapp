/* CONTROLLERS */
// -----------------------------------------------------

enhanceApp.controller('mainController', ['$scope', '$log', '$ionicModal', '$route','$ionicPlatform', 'bookmarking', 'taskService', '$filter', '$ionicPopup', function($scope, $log, $ionicModal, $route, $ionicPlatform, bookmarking, taskService, $filter, $ionicPopup) {

  $scope.isBookmarked = function(y){
    $scope.tasks[y].Bookmarked = bookmarking.isBookmarked($scope.tasks[y].Bookmarked);
    taskService.updateTask($scope.tasks[y]);
  }

  $ionicPlatform.ready(function() {
    taskService.initDB();

    // Get all task records from the database.
    taskService.getAllTasks().then(function(tasks) {
      $scope.tasks = tasks;
      console.log($scope.tasks.length)
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
    $scope.task = task;
    //Regra de mudanca de quadrante
    $scope.task.Date = new Date($scope.task.Endate);
    $scope.task.arrayDate = $scope.task.Endate.split('-');
    $scope.task.arrayDate2 = $scope.task.arrayDate[2].split('T');
    $scope.task.limitDayMath = $scope.task.arrayDate[1] * 30 + parseInt($scope.task.arrayDate2[0]);

    $scope.task.currentDate = $filter('date')(new Date(), 'dd,MM,yyyy').split(',');
    $scope.task.todayMath = $scope.task.currentDate[1] * 30 + parseInt($scope.task.currentDate[0]); 
    twentyPercent = ($scope.task.limitDayMath * 1) / 100; 
    if ($scope.task.limitDayMath - twentyPercent <= $scope.task.todayMath && $scope.task.Urgent == false) {
      console.log('Se tornou Urgente');
      $scope.task.Urgent = true;
      taskService.addTask($scope.task); 
      $scope.showAlert();
    };
  }

  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Atenção!',
     cssClass: 'alert-dark-blue',
     template: 'Movemos esta atividade para a seção de Emergência, devido a sua data limite estar próxima.',
     okType: 'button-balanced button-clear'
   });
 };

    // Modal 1
    $ionicModal.fromTemplateUrl('pages/modalCycle.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    $scope.openModal = function(index) {

      if (index == 4) $scope.oModal4.show();
      else $scope.oModal1.show();
    };

    $scope.closeModal = function() {
      $scope.oModal1.hide();
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

enhanceApp.controller('headerController', ['$scope', '$log', '$routeParams','$ionicModal', '$ionicPopup', 'taskService', function($scope, $log, $routeParams, $ionicModal, $ionicPopup, taskService) {

  $ionicModal.fromTemplateUrl('pages/modalCreatePage.html', {
    id: '2',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModal2 = modal;
  });

  $scope.closeModal = function(x) {
    $scope.oModal2.hide();
  };

  $scope.openModal = function(x) {
    $scope.oModal2.show();
  };

  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Parabéns!',
     cssClass: 'alert-dark-blue',
     template: 'Tarefa Adicionada com sucesso',
     okType: 'button-positive button-clear'
   });
   alertPopup.then(function(res) {
     console.log('Adicionei uma Tarefa no Banco');
   });
 };

 $scope.task = {
  Important: false,
  Urgent: false,
  Bookmarked: false,
  Completed: false,
  Cycles: [],
};

$scope.showHint = false;
console.log($scope)

$scope.saveTask = function() {
  taskService.addTask($scope.task); 
  $scope.modal.hide();
  $scope.showAlert();
};

$scope.$on('$destroy', function() {
  $scope.modal.remove(); 
});

}]);

enhanceApp.controller('cardPageController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform', '$ionicPopup', 'taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, $ionicPopup, taskService) {

  $scope.task = taskService.keepName;

  $scope.showButtons = true;
  $scope.showNotes = false;

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
    $scope.alertDelete();      
  };
  $scope.completeTask = function(){
    $scope.task.Completed = true;
    $scope.alertCompleteChangeTask('Concluir Tarefa', 'Parabéns por Concluir uma tarefa. Realize uma reflexao sobre seu rendimento utilizando o Enhance', 'Conclui uma Tarefa')
    taskService.addTask($scope.task); 
  }
  $scope.saveTask = function() {
    $scope.alertCompleteChangeTask('Salvar Dados', 'Dados Atualizados com sucesso', 'Dados Alterados')
    taskService.addTask($scope.task); 

  };

  $scope.alertCompleteChangeTask = function(titleText, templateText, logMsg) {
   var alertPopup = $ionicPopup.alert({
     title: titleText,
     cssClass: 'alert-dark-blue',
     template: templateText,
     okType: 'button-positive button-clear'
   });
   alertPopup.then(function(res) {
     console.log(logMsg);
   });
 };

 $scope.alertDelete = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Deletar Tarefa',
     cssClass: 'alert-dark-blue',
     template: 'Você tem certeza que deseja deletar a tarefa selecionada?',
     cancelText: 'Cancelar', // String (default: 'Cancel'). The text of the Cancel button.
     cancelType: 'button-energized button-clear', // String (default: 'button-default'). The type of the Cancel button.
     okText: 'Deletar', // String (default: 'OK'). The text of the OK button.
     okType: 'button-balanced button-clear', // String (default: 'button-positive'). The type of the OK button.
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
       taskService.deleteTask($scope.task);      
     } else {
       console.log('You are not sure');
     }
   });
 };
}]);

enhanceApp.controller('cycleController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform','$interval', '$timeout', '$filter','$ionicPopup', 'taskService','$cordovaMedia', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, $interval, $timeout, $filter, $ionicPopup, taskService, $cordovaMedia) {

  $scope.Note = '';
  $scope.teste = function(){
    console.log('teste')
  }


$scope.displayTime = '24:00';
  $scope.cycleBegin = function() {
    $scope.alertBeginCycle(); //Alerta ciclo iniciou
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
          $scope.alertBeginRest(); //alert begin rest time
         // $scope.play('www/sounds/simplest.mp3'); WORKS only on MOBILE
          count++;
          $scope.timeMax = 300;
          $scope.tirthMinutes = 5 ;
        } else {
          $interval.cancel($scope.stopTime);
         // $scope.play('www/sounds/simplest.mp3'); WORKS only on MOBILE
          $scope.alertEndCycle(); //alert end cycle 
          $scope.closeModal(1);
          $scope.recordCycle($scope.counter);
        }
      }
      $scope.cancelCycle = function(){
        $scope.alertDelete();
      }

      $scope.alertDelete = function() {
       var confirmPopup = $ionicPopup.confirm({
        title: 'Cancelar Ciclo',
         cssClass: 'alert-dark-blue',
         template: 'Você tem certeza que deseja Cancelar o ciclo que esta sendo realizado?',
         cancelText: 'Voltar', // String (default: 'Cancel'). The text of the Cancel button.
         cancelType: 'button-positive button-clear', // String (default: 'button-default'). The type of the Cancel button.
         okText: 'Cencelar', // String (default: 'OK'). The text of the OK button.
         okType: 'button-balanced button-clear', // String (default: 'button-positive'). The type of the OK button.
       });
       confirmPopup.then(function(res) {
         if(res) {
            $scope.ifCancelled++
         }
       });
     };

     if ($scope.ifCancelled > 0) {
      function stopUpdating(){
        $interval.cancel($scope.stopTime);
        $scope.closeModal(1);
      }

      $timeout(stopUpdating, 10);

    }; 
  };



  $scope.recordCycle = function(x){
    $scope.task.Cycles[x] = {
      Name: $filter('date')(new Date(), 'yyyy-MM-dd'),
      Note: $scope.Note
    }
    taskService.saveTask($scope.task);

  };

  $scope.alertBeginCycle = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Preparado?',
     cssClass: 'alert-dark-blue',
     template: 'Ciclo Iniciando...',
     okType: 'button-positive button-clear'
   });
   alertPopup.then(function(res) {
     console.log('Comecei ciclo');
   });
   $timeout(function() {
     alertPopup.close();
   }, 1000);
 };

 $scope.alertBeginRest = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Bom Trabalho!',
     cssClass: 'alert-dark-blue',
     template: 'Iniciando tempo de descanso, seu ciclo será concluido automaticamente após o término desde tempo.',
     okType: 'button-positive button-clear'
   });
   alertPopup.then(function(res) {
     console.log('Comecei Descanso');
   });
   $timeout(function() {
     alertPopup.close();
   }, 5000);
 };

 $scope.alertEndCycle = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Parabéns!',
     cssClass: 'alert-dark-blue',
     template: 'Ciclo finalizado. Se a tarefa não foi concluida em sua totalidade, inicie um novo ciclo ou complete a atividade.',
     okType: 'button-positive button-clear'
   });
   alertPopup.then(function(res) {
     console.log('Terminei ciclo');
   });
 };

  /*$scope.play = function(src) {
        var media = new Media(src, null, null, mediaStatusCallback);
        media.play();
    }*/

}]);

enhanceApp.controller('tourController', ['$scope', '$log', '$routeParams','$ionicModal','$ionicPlatform','$interval', '$timeout', '$filter', 'taskService', function($scope, $log, $routeParams, $ionicModal,$ionicPlatform, $interval, $timeout, $filter, taskService) {

  $ionicModal.fromTemplateUrl('pages/modalTour.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.$on('$destroy', function() {
    $scope.modal.remove(); 
  });

}]);

enhanceApp.controller('historyController', ['$scope', '$log', '$ionicModal', '$route','$ionicPlatform', 'bookmarking', 'taskService', '$filter', '$ionicPopup', function($scope, $log, $ionicModal, $route, $ionicPlatform, bookmarking, taskService, $filter, $ionicPopup) {
 $scope.isBookmarked = function(y){
    $scope.tasks[y].Bookmarked = bookmarking.isBookmarked($scope.tasks[y].Bookmarked);
    taskService.updateTask($scope.tasks[y]);
  }

  $ionicPlatform.ready(function() {
    taskService.initDB();

    // Get all task records from the database.
    taskService.getAllTasks().then(function(tasks) {
      $scope.tasks = tasks;
      console.log($scope.tasks.length)
    });
  });

$scope.showButtons = false;
$scope.showNotes = false;

  $scope.openNotes = function(y){
    console.log($scope.showNotes);
    return $scope.showNotes = y;
  }

  $scope.getCycleInfo = function(y, x){
    $scope.note = x;
    $scope.nameC = y;
  }

    $scope.alertPerformance = function(x, y) {
      console.log(x);
   var alertPopup = $ionicPopup.alert({
     title: 'Seu Desempenho',
     cssClass: 'alert-dark-blue',
     template: 'Para esta atividade, você definiu que seriam necessárias <span style="color: #3D9788">'+x+' horas</span> para sua realização.<br>Você Utilizou <span style="color: #FF6F5C">'+ y + ' ciclos</span> para conclui-la, ou seja: <span style="color: #edc85f">'+ y/2 + ' horas</span>',
     okType: 'button-positive button-clear'
   });
   alertPopup.then(function(res) {
     console.log('Terminei ciclo');
   });
 };

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
    $scope.oModal3.remove();
  });


}]);

enhanceApp.controller('settingsController', ['$scope', '$log', '$ionicModal', '$route','$ionicPlatform', 'bookmarking', 'taskService', '$filter', '$ionicPopup', function($scope, $log, $ionicModal, $route, $ionicPlatform, bookmarking, taskService, $filter, $ionicPopup) {



}]);

