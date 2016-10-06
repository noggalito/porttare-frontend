(function () {
  'use strict';

  describe('ClientsController', function () {
    var ctrl,
      $q,
      $controller,
      dependencies,
      ClientsService,
      deferGetClients,
      ModalService,
      $ionicLoading,
      $ionicPopup,
      $scope,
      $rootScope;

    beforeEach(module('porttare.controllers'));
    beforeEach(module('porttare.services', function($provide){
      $provide.factory('ClientsService', function(){
        return {
          getClients: function(){
            deferGetClients = $q.defer();
            return deferGetClients.promise;
          }
        };
      });
      $provide.factory('ModalService', function(){
        return {
          showModal: function(){
            return null;
          },
          closeModal: function(){
            return null;
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$q_,
        _$rootScope_,
        _$controller_,
        _ClientsService_,
        _ModalService_) {
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $q = _$q_;
        deferGetClients = $q.defer();
        ClientsService = _ClientsService_;
        ModalService = _ModalService_;
        $controller = _$controller_;
        $ionicLoading = {
          show: sinon.stub(),
          hide: sinon.stub()
        };
        $ionicPopup = {
          alert: sinon.stub()
        };
      })
    );

    beforeEach(function () {
      dependencies = {
        $scope: $scope,
        ClientsService: ClientsService,
        ModalService: ModalService,
        $ionicLoading: $ionicLoading,
        $ionicPopup: $ionicPopup
      };

      ctrl = $controller('ClientsController', dependencies);
    });

    describe('Functions', function () {
      it('Get clients list', function () {
        var data = {provider_clients: []};
        deferGetClients.resolve(data);
        $scope.$digest();
        expect(ctrl.clients).to.equal(data);
      });
      it('Show modal', function () {
        var spy = sinon.spy(ModalService, 'showModal');
        ctrl.showNewModal();
        chai.expect(spy.called).to.be.equal(true);
      });
      it('Close modal', function () {
        var spy = sinon.spy(ModalService, 'closeModal');
        ctrl.closeModal();
        expect(ctrl.client).to.be.null;
        chai.expect(spy.called).to.be.equal(true);
      });
    });
  });
})();
