/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('pipedrive', ['lfNgMdFileInput', 'ngMaterial']).controller('MainCtrl', function ($http, $timeout, $q, $log, $mdToast) {
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
    return $http.post('/search', { query: { name: query } }).then(function (response) {
      return response.data;
    });
    var results = query ? self.states.filter(createFilterFor(query)) : self.states,
        deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () {
        deferred.resolve(results);
      }, Math.random() * 1000, false);
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
        progress: function progress(e) {
          if (e.lengthComputable) {
            self.progressBar = e.loaded / e.total * 100;
            self.progressCounter = self.progressBar;
          }
        }
      },
      headers: { 'Content-Type': undefined }
    }).then(function (result) {
      self.response = result;
      resetValues();
      showToast('Import successful ' + result.data.imported + ' users');
      $log.info(result);
      // do sometingh                   
    }, function (err) {
      resetValues();
      $log.error(err);
      // do sometingh
    });
  }

  function showToast(message) {
    $mdToast.show($mdToast.simple().textContent(message).position('bottom right').hideDelay(3000));
  }

  function resetValues() {
    self.uploading = false;
    self.progressBar = 0;
    self.progressCounter = 0;
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map