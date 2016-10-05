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
        listener: createWishlist,
        modalId: wishlistsVm.modalSettings.newWishlist.id
      },
      edit: {
        listener: updateWishlist,
        modalId: wishlistsVm.modalSettings.editWishlist.id
      },
      remove: {
        listener: removeWishlist,
        modalId: wishlistsVm.modalSettings.editWishlist.id
      },
      cancel: {
        listener: cancelAction,
        modalId: wishlistsVm.modalSettings.newWishlist.id
      }
    };

    function showModal(options) {
      ModalService.showModal(options);
    }

    function runAction(action) {
      action.listener(action.modalId);
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

    function removeWishlist(modalId) {
      WishlistsService.removeWishlist(wishlistsVm.wishlist.id)
        .then(function success() {
          wishlistsVm.wishlists.splice(currentIndex, 1);
          cancelAction(modalId);
        }, onError);
    }

    function updateWishlist(modalId) {
      WishlistsService.updateWishlist(wishlistsVm.wishlist)
        .then(function success(res) {
          wishlistsVm.wishlists[currentIndex] = res.customer_wishlist; //jshint ignore: line
          cancelAction(modalId);
        }, onError);
    }

    function createWishlist(modalId) {
      WishlistsService.createWishlist(wishlistsVm.wishlist)
        .then(function success(res) {
          wishlistsVm.wishlists.push(res.customer_wishlist); //jshint ignore: line
          cancelAction(modalId);
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
