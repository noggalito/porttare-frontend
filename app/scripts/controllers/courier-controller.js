(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CourierController', CourierController);

  function CourierController(CourierService,
                            $ionicPopup,
                            $state,
                            $auth,
                            $ionicLoading) {
    var courierVm = this;
    var stateRedirect = 'courier.orders';
    courierVm.createCourier = createCourier;
    courierVm.courierForm = {};
    courierVm.messages = {};
    courierVm.locations = [
      'Loja',
      'Quito'
    ];
    courierVm.licenses = [
      'A',
      'A1',
      'B',
      'C1',
      'C',
      'D1',
      'D',
      'E1',
      'E',
      'F',
      'G'
    ];
    courierVm.mobilization = [
      'Motocicleta particular',
      'Motocicleta comercial',
      'Automóvil particular',
      'Automóvil estatal',
      'Automóvil comercial',
      'Bus escolar / turismo',
      'Bus pasajeros',
      'Pesado',
      'Especiales'
    ];

    function createCourier() {
      $ionicLoading.show({
        template: '{{::("globals.sending"|translate)}}'
      });

      CourierService.createNewCourier(courierVm.courierForm)
        .then(function success(courier) {
          //update auth user
          $auth.user.courier_profile = courier.courier_profile; //jshint ignore:line
          $ionicLoading.hide();
          $state.go(stateRedirect).then(function () {
            $ionicPopup.alert({
              title: 'Alerta',
              template: '{{::("courier.successCourierSave"|translate)}}'
            });
          });
        },
        function error(resp) {
          if (resp && resp.errors) {
            courierVm.messages = resp.errors;
          } else {
            $ionicPopup.alert({
              title: 'Error',
              template: resp && resp.error ? resp.error :
                '{{::("globals.pleaseTryAgain"|translate)}}'
            });
          }
          $ionicLoading.hide();
        });
    }
  }
})();
