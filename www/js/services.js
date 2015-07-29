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
      return self.Bookmarked = false;
    } else{
      return self.Bookmarked = true;  
    }      
  }
})

enhanceApp.factory('taskService', ['$q', function($q){
  var _db;
  var _tasks;

  return {
    initDB: initDB,

    getAllTasks: getAllTasks,
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
    keepName: keepName
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

    function keepName(task) {
      keepName = task;
      console.log('passei por aqui' + task)
      return keepName
    }

}])

//Audio Service from Apache Cordova
enhanceApp.factory('MediaSrv', function($q, $ionicPlatform, $window) {
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };

  function loadMedia(src, onError, onStatus, onStop) {
    var defer = $q.defer();
    $ionicPlatform.ready(function() {
      var mediaSuccess = function() {
        if (onStop) {
          onStop();
        }
      };
      var mediaError = function(err) {
        _logError(src, err);
        if (onError) {
          onError(err);
        }
      };
      var mediaStatus = function(status) {
        if (onStatus) {
          onStatus(status);
        }
      };

      if ($ionicPlatform.is('android')) {
        src = '/android_asset/www/' + src;
      }
      defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
    });
    return defer.promise;
  }

  function _logError(src, err) {
    console.error('media error', {
      code: err.code,
      message: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status) {
    if (status === 0) {
      return 'Media.MEDIA_NONE';
    } else if (status === 1) {
      return 'Media.MEDIA_STARTING';
    } else if (status === 2) {
      return 'Media.MEDIA_RUNNING';
    } else if (status === 3) {
      return 'Media.MEDIA_PAUSED';
    } else if (status === 4) {
      return 'Media.MEDIA_STOPPED';
    } else {
      return 'Unknown status <' + status + '>';
    }
  }

  function getErrorMessage(code) {
    if (code === 1) {
      return 'MediaError.MEDIA_ERR_ABORTED';
    } else if (code === 2) {
      return 'MediaError.MEDIA_ERR_NETWORK';
    } else if (code === 3) {
      return 'MediaError.MEDIA_ERR_DECODE';
    } else if (code === 4) {
      return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';
    } else {
      return 'Unknown code <' + code + '>';
    }
  }

  return service;
})