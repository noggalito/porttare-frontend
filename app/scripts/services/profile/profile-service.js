/*jshint camelcase: false */
(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProfileService', ProfileService);

  function ProfileService($http,$q, ENV) {
    var service = {
      getProfile: getProfile,
      updateProfileProvider:updateProfileProvider
    };

    return service;

    function getProfile() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/account'
      })
      .then(function success(resp){
        return resp.data.user;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function updateProfileProvider(providerData){
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/provider/profile' ,
        data: providerData

      }).then(function success(res) {
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }
  }
})();
