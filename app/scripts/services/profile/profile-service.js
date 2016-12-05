/*jshint camelcase: false */
(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProfileService', ProfileService);

  function ProfileService($http,$q, ENV, CommonService, $auth,Upload) {
    var RESOURCE_URI = '/api/users/account';

    var service = {
      getProfile: getProfile,
      editProfile: editProfile
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

    function editProfile(user){
      if(!user) {return null;}

      var promise;
      if(user.custom_image){
        promise = Upload.upload({
          method: 'PUT',
          url: ENV.apiHost + RESOURCE_URI,
          data: user
        });

        /*
        $scope.upload = $upload.upload({
            url:     'api/users/update_image',
            method:  'POST',
            headers: $auth.retrieveData('auth_headers'),
            file:    file
        });
        */
      }
      else{
        promise = $auth.updateAccount(user);

      }

      return promise;
    }


  }
})();
