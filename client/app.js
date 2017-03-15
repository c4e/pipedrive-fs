angular.module('pipedrive', ['lfNgMdFileInput', 'ngMaterial'])
  .controller('MainCtrl', function ($http, $timeout, $q, $log, $mdToast) {
    var self = this;
    self.upload = upload;
    self.isDisabled = false;

    // list of `state` value/display objects
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;

    // ******************************
    // Internal methods
    // ******************************
    function querySearch(query) {
      return $http.post('/search', {query: {name: query}})
      .then((response) => {
        return response.data;
      });
      var results = query ? self.states.filter(createFilterFor(query)) : self.states,
        deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    function upload() {
      var formData = new FormData();
      self.uploading = true;
      angular.forEach(self.files, function (obj) {
        if (!obj.isRemote) {
          formData.append('files[]', obj.lfFile);
        }
      });
      $http.post('/import', formData, {
        transformRequest: angular.identity,
        uploadEventHandlers: {
          progress: function (e) {
            if (e.lengthComputable) {
              self.progressBar = (e.loaded / e.total) * 100;
              self.progressCounter = self.progressBar;
            }
          }
        },
        headers: { 'Content-Type': undefined }
      }).then(function (result) {
        self.response = result;
        resetValues();
        showToast(`Import successful ${result.data.imported} users`); 
        $log.info(result);
        // do sometingh                   
      }, function (err) {
        resetValues();
        $log.error(err);
        // do sometingh
      });
    }

    function showToast(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position('bottom right')
          .hideDelay(3000)
      );
    }

    function resetValues() {
      self.uploading = false;
      self.progressBar = 0;
      self.progressCounter = 0;
    }


  });