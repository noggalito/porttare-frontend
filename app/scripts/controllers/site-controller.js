(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth, APP) {// jshint ignore:line
    var siteVm = this,
        currentUser = null;

    siteVm.userName = userName;
    siteVm.getUserImageURL = getUserImageURL;

    init();

    function init() {
      currentUser = $auth.user;
    }

    $rootScope.$on('$stateChangeStart', function(){
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

    function userName () {
      if (currentUser) {
        var attributes = [
          'name',
          'nickname',
          'email'
        ];
        var presentAttribute = attributes.find(function(attribute) {
          return !angular.element.isEmptyObject(
            angular.element.trim(currentUser[attribute])
          );
        });
        return currentUser[presentAttribute];
      }
    }

    function getUserImageURL(){
      /* jshint ignore:start */
      return currentUser.custom_image_url 
              || ( currentUser.custom_image && currentUser.custom_image.url ) 
              || currentUser.image 
              || APP.defaultProfileImage;
      /* jshint ignore:end */
    }

    $rootScope.$on('currentUserUpdated',function(event, updatedCurrentUser){
      currentUser = updatedCurrentUser;
    });
  }
})();
