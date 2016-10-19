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
      $rootScope,
      deferNewClient,
      deferEditClient,
      deferDeleteClient;

    beforeEach(module('porttare.controllers'));
    beforeEach(module('porttare.services', function($provide){
      $provide.factory('ClientsService', function($q){
        return {
          getClients: function(){
            deferGetClients = $q.defer();
            return deferGetClients.promise;
          },
          newClient: function(){
            deferNewClient = $q.defer();
            return deferNewClient.promise;
          },
          editClient: function(){
            deferEditClient = $q.defer();
            return deferEditClient.promise;
          },
          deleteClient: function(){
            deferDeleteClient = $q.defer();
            return deferDeleteClient.promise;
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

    describe('All functions', function () {
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

      describe('Get clients list', function () {
        it('Get clients list', function () {
          var data = {provider_clients: []}; //jshint ignore:line
          deferGetClients.resolve(data);
          $scope.$digest();
          expect(ctrl.clients).to.equal(data);
        });
      });

      describe('Create client', function () {

        beforeEach(inject(function () {
          ctrl.submitProcess(null);
        }));

        it('ionicLoading.show should be called', function () {
          sinon.assert.calledOnce($ionicLoading.show);
        });

        it('if successful, ionicLoading.hide should be called', function () {
          ctrl.clients = [];
          deferNewClient.resolve({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });

        it('if successful, response should be added to clients', function () {
          ctrl.clients = [];
          deferNewClient.resolve({data: 'data'});
          $scope.$digest();
          chai.assert.isArray(ctrl.clients);
        });

        it('if successful, ionicPopup.alert should be called', function () {
          ctrl.clients = [];
          deferNewClient.resolve({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.messages = {};
          var backendErrors = {
            status: 422,
            data: {
              errors: [
                { test: 'message' }
              ]
            }
          };
          deferNewClient.reject(backendErrors);
          $rootScope.$digest();
          expect(ctrl.messages).to.be.not.empty; //jshint ignore:line
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.clients = [];
          deferNewClient.reject({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });
      });

      describe('Edit client', function () {

        beforeEach(inject(function () {
          ctrl.submitProcess(1);
        }));

        it('ionicLoading.show should be called', function () {
          sinon.assert.calledOnce($ionicLoading.show);
        });

        it('if successful, ionicLoading.hide should be called', function () {
          ctrl.clients = [];
          deferEditClient.resolve({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });

        it('if successful, ionicPopup.alert should be called', function () {
          ctrl.clients = [];
          deferEditClient.resolve({id:0});
          $scope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.messages = {};
          var backendErrors = {
            status: 422,
            data: {
              errors: [
                { test: 'message' }
              ]
            }
          };
          deferEditClient.reject(backendErrors);
          $rootScope.$digest();
          expect(ctrl.messages).to.be.not.empty; //jshint ignore:line
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.clients = [];
          deferEditClient.reject({data: 'data'});
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });
      });

      describe('Delete client', function () {

        beforeEach(inject(function () {
          ctrl.deleteClient(0);
        }));

        it('ionicLoading.show should be called', function () {
          sinon.assert.calledOnce($ionicLoading.show);
        });

        it('if successful, ionicLoading.hide should be called', function () {
          ctrl.clients = [];
          deferDeleteClient.resolve();
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });

        it('if successful, ionicPopup.alert should be called', function () {
          ctrl.clients = [];
          deferDeleteClient.resolve();
          $scope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });

        it('if unsuccessful, ionicLoading.hide should be called', function () {
          ctrl.clients = [];
          deferDeleteClient.reject();
          $scope.$digest();
          sinon.assert.calledOnce($ionicLoading.hide);
        });
      });

      describe('Modal', function () {
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

        it('Show modal', function () {
          var spy = sinon.spy(ModalService, 'showModal');
          ctrl.showNewModal();
          chai.expect(spy.called).to.be.equal(true);
        });

        beforeEach(inject(function () {
          ctrl.clients = [];
          ctrl.showEditModal(0);
        }));

        it('Show edit modal', function () {
          var spy = sinon.spy(ModalService, 'showModal');
          ctrl.showNewModal();
          chai.expect(spy.called).to.be.equal(true);
        });

        it('Close modal', function () {
          var spy = sinon.spy(ModalService, 'closeModal');
          ctrl.closeModal();
          chai.assert.isNull(ctrl.client);
          chai.expect(spy.called).to.be.equal(true);
        });
      });
    });
  });
})();
