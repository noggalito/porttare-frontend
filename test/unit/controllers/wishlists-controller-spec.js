(function () {
  'use strict';
  /*jshint camelcase:false */
  describe('WishlistsController', function () {
    var ctrl,
      dependencies,
      $controller,
      $scope,
      $ionicLoading,
      $ionicScrollDelegate,
      deferGetCategories,
      deferGetCategoryProviders,
      ModalServiceMock;

    beforeEach(module('porttare.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.value('data', {});
      $provide.value('APP', {
        defaultSlickConfig: {}
      });
      $provide.factory('ModalService', function () {
        return {
          showModal: sinon.stub(),
          closeModal: sinon.stub()
        };
      });
      $provide.factory('CategoriesService', function ($q) {
        return {
          getCategoryProviders: function () {
            deferGetCategoryProviders = $q.defer();
            return deferGetCategoryProviders.promise;
          },
          getCategories: function () {
            deferGetCategories = $q.defer();
            return deferGetCategories.promise;
          }
        };
      });
      $provide.factory('CategoryService', function () {
        return {};
      });
      $provide.factory('WishlistsService', function () {
        return {};
      });
      $provide.factory('$ionicPopup', function(){
        return {
          alert: sinon.stub()
        };
      });
    }));

    beforeEach(inject(function (_$rootScope_,
      _$controller_,
      data,
      APP,
      ModalService,
      CategoriesService,
      CategoryService,
      WishlistsService,
      _$ionicPopup_) {
      $ionicLoading = {
        show: sinon.stub(),
        hide: sinon.stub()
      };
      $ionicScrollDelegate = {
        scrollTop: sinon.stub()
      };
      ModalServiceMock = ModalService;
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      dependencies = {
        data: data,
        APP: APP,
        ModalService: ModalServiceMock,
        CategoriesService: CategoriesService,
        CategoryService: CategoryService,
        $ionicLoading: $ionicLoading,
        $ionicScrollDelegate: $ionicScrollDelegate,
        $scope: $scope,
        WishlistsService: WishlistsService,
        $ionicPopup: _$ionicPopup_
      };
      ctrl = $controller('WishlistsController', dependencies);
    }));

    describe('Modal events', function () {
      it('Should send the right params', function () {
        var newWishlist = {
          parentScope: $scope,
          fromTemplateUrl: 'templates/wishlist/new.html'
        };

        var editWishlist = {
          parentScope: $scope,
          fromTemplateUrl: 'templates/wishlist/edit.html'
        };

        var showWishlistItems= {
          parentScope: $scope,
          fromTemplateUrl: 'templates/wishlist/show.html'
        };

        ctrl.showModal(newWishlist);
        sinon.assert.calledWith(ModalServiceMock.showModal, newWishlist);
        ctrl.showModal(editWishlist);
        sinon.assert.calledWith(ModalServiceMock.showModal, editWishlist);
        ctrl.showModal(showWishlistItems);
        sinon.assert.calledWith(ModalServiceMock.showModal, showWishlistItems);

      });

      it('Should send a ID', function () {
        ctrl.closeModal();
        sinon.assert.calledOnce(ModalServiceMock.closeModal);
      });

      it('Should clear info', function () {
        ctrl.closeModal();
        expect(ctrl.query).to.equal('');
        expect(ctrl.wishlist).to.equal(null);
        expect(ctrl.messages).to.deep.equal({});
      });

      it('Should show the main modal', function () {
        var wlist = {
          'id': 1,
          'nombre': 'Parrillada del sábado',
          'items': [],
          'compartir_con': [],
          'fecha_entrega': '2016-10-02T10:44:18.609-05:00'
        };
        ctrl.modalSettings.editWishlist = {
          parentScope: $scope,
          fromTemplateUrl: 'templates/wishlist/edit.html'
        };
        sinon.stub(ctrl, 'showModal');
        ctrl.showEditModal(wlist);
        expect(ctrl.wishlist.id).to.deep.equal(wlist.id);
        sinon.assert.calledWith(ctrl.showModal, ctrl.modalSettings.editWishlist);
      });

    });

  });
})();
