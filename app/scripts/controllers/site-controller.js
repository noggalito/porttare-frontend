(function(){
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope, $ionicLoading, $auth, $scope) {
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
        var attributes = [
          'custom_image_url'
        ];

        return getUserAttributes(attributes);
      }
    }


    $scope.$on('userUpdated',function(event, data){
      currentUser = data;

    });
  }
})();
