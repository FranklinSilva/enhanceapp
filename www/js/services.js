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

enhanceApp.service('bookmarking', function(){

  var self = this;

  this.isBookmarked = function(y){
    if (y == true) {
      return self.bookmarked = false;
    } else{
      return self.bookmarked = true;  
    }      
  }
})

enhanceApp.service('writeSmallCards', ['', function(){

  this.output = ''

}])

enhanceApp.factory('taskService', ['$q', function($q){
  var _db;
  var _tasks;

  return {
    initDB: initDB,

    getAllTasks: getAllTasks,
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask
  };

  function initDB() {
  // Creates the database or opens if it already exists
    _db = new PouchDB('tasks', {adapter: 'websql'});
  };

  function addTask(task) {
    _db.info().then(function (info) {
      console.log(info);
    });
    return $q.when(_db.post(task));
  };

  function updateTask(task) {
    return $q.when(_db.put(task));
  };

  function deleteTask(task) {
    return $q.when(_db.remove(task));
  };

  function getAllTasks() {
    if (!_tasks) {
      return $q.when(_db.allDocs({ include_docs: true}))
        .then(function(docs) {
        // Each row has a .doc object and we just want to send an 
        // array of task objects back to the calling controller,
        // so let's map the array to contain just the .doc objects.
          _tasks = docs.rows.map(function(row) {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

        // Listen for changes on the database.
          _db.changes({ live: true, since: 'now', include_docs: true})
          .on('change', onDatabaseChange);
        return _tasks;
        });
    } else {
      // Return cached data as a promise
      return $q.when(_tasks);
    }
  };

  function onDatabaseChange(change) {
    var index = findIndex(_tasks, change.id);
    var task = _tasks[index];

    if (change.deleted) {
      if (task) {
          _tasks.splice(index, 1); // delete
        }
      } else {
        if (task && task._id === change.id) {
          _tasks[index] = change.doc; // update
        } else {
          _tasks.splice(index, 0, change.doc) // insert
        }
      }
    }

    function findIndex(array, id) {
      var low = 0, high = array.length, mid;
      while (low < high) {
        mid = (low + high) >>> 1;
        array[mid]._id < id ? low = mid + 1 : high = mid
      }
      return low;
    }

}])