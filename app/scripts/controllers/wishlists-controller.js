(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('WishlistsController', WishlistsController);

  function WishlistsController( ModalService,
                                $ionicLoading,
                                $ionicScrollDelegate,
                                $scope,
                                $ionicPopup,
                                data,
                                CategoriesService,
                                CategoryService,
                                WishlistsService) {

    var wishlistsVm = this;
    var currentIndex = null;
    wishlistsVm.query = '';
    wishlistsVm.wishlists = data.customer_wishlists; //jshint ignore:line
    wishlistsVm.wishlist = null;
    wishlistsVm.closeModal = closeModal;
    wishlistsVm.showEditModal = showEditModal;
    wishlistsVm.showModal = showModal;
    wishlistsVm.runAction = runAction;
    wishlistsVm.messages = {};
    wishlistsVm.modalSettings = {
      newWishlist: {
        parentScope: $scope,
        fromTemplateUrl: 'templates/wishlist/new.html'
      },
      editWishlist: {
        parentScope: $scope,
        fromTemplateUrl: 'templates/wishlist/edit.html'
      },
      showWishlistItems: {
        parentScope: $scope,
        fromTemplateUrl: 'templates/wishlist/show.html'
      }
    };

    wishlistsVm.actions = {
      new: {
        listener: createWishlist
      },
      edit: {
        listener: updateWishlist
      },
      remove: {
        listener: removeWishlist
      },
      cancel: {
        listener: cancelAction
      }
    };

    function showModal(options) {
      ModalService.showModal(options);
    }

    function runAction(action) {
      if (action && action.listener) {
        action.listener();
      }
    }

    function closeModal() {
      ModalService.closeModal();
      clearData();
    }

    function clearData() {
      wishlistsVm.query = '';
      wishlistsVm.wishlist = null;
      wishlistsVm.messages = {};
      currentIndex = null;
    }

    function showEditModal(wlist, index) {
      currentIndex = index;
      wishlistsVm.wishlist = angular.copy(wlist);
      wishlistsVm.showModal(wishlistsVm.modalSettings.editWishlist);
    }

    function removeWishlist() {
      WishlistsService.removeWishlist(wishlistsVm.wishlist.id)
        .then(function success() {
          wishlistsVm.wishlists.splice(currentIndex, 1);
          cancelAction();
        }, onError);
    }

    function updateWishlist() {
      WishlistsService.updateWishlist(wishlistsVm.wishlist)
        .then(function success(res) {
          wishlistsVm.wishlists[currentIndex] = res.customer_wishlist; //jshint ignore: line
          cancelAction();
        }, onError);
    }

    function createWishlist() {
      WishlistsService.createWishlist(wishlistsVm.wishlist)
        .then(function success(res) {
          wishlistsVm.wishlists.push(res.customer_wishlist); //jshint ignore: line
          cancelAction();
        }, onError);
    }

    function cancelAction() {
      $ionicLoading.hide();
      closeModal();
    }

    function onError(res) {
      $ionicLoading.hide();
      if (res && res.errors) {
        wishlistsVm.messages = res.errors;
      }else {
        var message = '{{::("globals.pleaseTryAgain"|translate)}}';
        $ionicPopup.alert({
          title: 'Error',
          template: message
        });
      }
    }
  }
})();