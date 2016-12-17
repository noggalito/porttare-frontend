(function () {
  'use strict';
  /* jshint validthis:true */
  angular
    .module('porttare.directives')
    .directive('slickItem', slickItem);

  function slickItem($window,$translate,$ionicPopup,$ionicLoading,CartService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/slick-item/slick-item.html',
      scope: {
        settings: '=',
        data: '=',
        onClick: '&'
      },
      controller: slickItemController,
      controllerAs: 'sicVm',
      bindToController: true
    };

    return directive;

    function slickItemController() {
      var sicVm=this;
      sicVm.deleteItem=deleteItem;
      sicVm.askTodeleteItem=askTodeleteItem;

      function askTodeleteItem(element){
        $translate('globals.confirmTitle').then(function(confirmationTitle) {
          $ionicPopup.confirm({
            title: confirmationTitle,
            template: '{{::("cart.confirmDelete"|translate)}}'
          }).then(function (confirmed) {
            if (confirmed) {
              deleteItem(element);
            }
          });
        });
      }

      function  deleteItem(element){
        $ionicLoading.show({
          template: '{{::("globals.deleting"|translate)}}'
        });
        CartService.deleteItem(element.id).then(function success(){
          $window.location.reload();
          $ionicLoading.hide();
        },
        function error(){
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Error',
            template: '{{::("globals.pleaseTryAgain"|translate)}}'
          });
        });
      }
    }
  }
})();
