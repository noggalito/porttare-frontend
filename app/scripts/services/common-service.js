(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('CommonService', CommonService);

  function CommonService($http, ENV) {

    var service = {
      editObject: editObject
    };

    return service;

    function editObject(data, url) {
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
