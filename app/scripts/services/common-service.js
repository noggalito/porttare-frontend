(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('CommonService', CommonService);

  function CommonService($http, ENV) {

    var service = {
      getObjects: getObjects,
      newObject: newObject,
      editObject: editObject
    };

    return service;

    function getObjects(url) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + url
      })
        .then(function success(resp) {
          return resp.data;
        });
    }

    function newObject(data, url) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + url,
        data: data
      })
        .then(function success(resp){
          return resp.data;
        });
    }

    function editObject(data, url) {
      console.log(data, url)
      return $http({
        method: 'PUT',
        url: ENV.apiHost + url + data.id,
        data: data
      })
        .then(function success(resp){
          return resp.data;
        });
    }
  }
})();
