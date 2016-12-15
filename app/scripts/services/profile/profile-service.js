/*jshint camelcase: false */
(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProfileService', ProfileService);

  function ProfileService($http,$q, ENV, $auth,Upload, APP) { //jshint ignore: line

    var service = {
      getProfile: getProfile,
      updateProfileProvider:updateProfileProvider,
      editProfile: editProfile,
      getUserImageURL : getUserImageURL,
      hasImageFile : hasImageFile
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
        url: ENV.apiHost + '/api/provider/profile',
        data: providerData

      }).then(function success(res) {
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function editProfile(user){
      var promise;
      if(user.custom_image){
        promise = Upload.upload({
          method: 'PUT',
          url: ENV.apiHost + '/api/users/account',
          data: user
        });
      }
      else{
        promise = $auth.updateAccount(user);

      }
      return promise;
    }

    function getUserImageURL(user){ //jshint ignore: line
      /* jshint ignore:start */
      return user.custom_image_url 
              || ( user.custom_image && user.custom_image.url ) 
              || user.image 
              || APP.defaultProfileImage;
      /* jshint ignore:end */
    }

    function hasImageFile(user){
      return user.custom_image && !user.custom_image.url;
    }
  }
})();
