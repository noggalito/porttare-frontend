(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth) {
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

    function getUserAttributes(attributes){

      var presentAttribute = attributes.find(function(attribute) {
        return !angular.element.isEmptyObject(
          angular.element.trim(currentUser[attribute])
        );
      });

      return currentUser[presentAttribute];
    }

    function userName () {
      if (currentUser) {
        var attributes = [
          'name',
          'nickname',
          'email'
        ];
        return getUserAttributes(attributes);
      }
    }

    function getUserImageURL(){
      if (currentUser) {
        var customImageUrl = getUserAttributes(['custom_image_url']);

        if(customImageUrl){
          return customImageUrl;
        }
        else{
          var customImage = getUserAttributes(['custom_image']);

          if(customImage){
            return customImage.url;
          }
          else{
            return currentUser.image;
          }
        }
      }
    }

    $rootScope.$on('currentUserUpdated',function(event, updatedCurrentUser){
      currentUser = updatedCurrentUser;
    });
  }
})();
