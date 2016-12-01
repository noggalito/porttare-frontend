(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProductController', ProductController);

  function ProductController( data, CartService, $ionicPopup, $state,
                              $scope, WishlistsService, ModalService,
                              ErrorHandlerService, $ionicLoading) {
    var productVm = this;
    productVm.more = false;
    productVm.toggleShow = toggleShow;
    productVm.product = data;
    productVm.runAction = runAction;
    productVm.closeModal = closeModal;
    productVm.item = {};
    productVm.item.provider_item_id = productVm.product.id; //jshint ignore:line
    productVm.item.cantidad = 0;
    productVm.wishlists = [];
    productVm.onWishlistSelect = onWishlistSelect;

    productVm.options = {
      priceCents: data.precio_cents, // jshint ignore:line
      onChangeValue: function (data) {
        productVm.item.cantidad = data.itemsCount;
      }
    };

    productVm.slickConfig = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    };

    productVm.actions = {
      cart: {
        onActionSelect: addToCart
      },
      wishlist: {
        onActionSelect: addToWishlist
      }
    };

    function runAction(action) {
      if (action && action.onActionSelect) {
        action.onActionSelect();
      }
    }

    function toggleShow() {
      productVm.more = !productVm.more;
    }

    function addToCart() {
      CartService.addItem(productVm.item)
        .then(onSuccess, onError);
    }

    function getWishlists() {
      $ionicLoading.show({
        template: '{{::("globals.loading"|translate)}}'
      });
      WishlistsService.getWishlists()
        .then(function success(res) {
          $ionicLoading.hide();
          productVm.wishlists = res.customer_wishlists;//jshint ignore:line
        }, ErrorHandlerService.handleCommonErrorGET);
    }

    function addToWishlist() {

      getWishlists();

      ModalService.showModal({
        parentScope: $scope,
        fromTemplateUrl: 'templates/product/add-to-wishlist.html'
      });

    }

    function onSuccess() {
      var providerRoute = 'app.categories.provider';
      var params = {
        categoryId: $state.params.categoryId,
        providerId: $state.params.providerId
      };
      $state.go(providerRoute, params)
        .then(function () {
          $ionicPopup.alert({
            title: 'Alerta',
            template: '{{::("cart.successfullyAdded"|translate)}}'
          });
        });
    }

    function onError() {
      $ionicPopup.alert({
        title: 'Error',
        template: '{{::("globals.pleaseTryAgain"|translate)}}'
      });
    }

    function closeModal() {
      ModalService.closeModal();
    }

    function onWishlistSelect(wlist) {
      var wishlist = angular.copy(wlist);
      var item = productVm.item.provider_item_id;//jshint ignore:line
      wishlist.provider_items_ids = filterItemsIds(wlist) ;//jshint ignore:line
      wishlist.provider_items_ids.push(item);//jshint ignore:line
      WishlistsService.updateWishlist(wishlist)
      .then(function success() {
        closeModal();
        onSuccess();
      }, onError);
    }

    //jshint ignore:start
    function filterItemsIds(wlist) {
      var ids = [];
      if (wlist.provider_items) {
        angular.forEach(wlist.provider_items, function(item) {
          ids.push(item.id);
        });
      }

      return ids;

    }
    //jshint ignore:end
  }
})();
