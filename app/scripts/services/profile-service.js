/*jshint camelcase: false */
(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProfileService', ProfileService);

  function ProfileService($q) {
    var service = {
      getProfile: getProfile
    };

    return service;

    function getProfile() {
      var user = {
        user_id: 1,
        name: 'Jorge',
        ciudad:'Loja',
        fecha_de_nacimiento:'1988/04/23',
        email:'snake3201@yahoo.es',
        customer_addresses: [
          {
            'id':1,
            'ciudad':'Quito',
            'parroquia':'Quito',
            'barrio':'Cumbayá',
            'direccion_uno':'Calle Miguel Ángel',
            'direccion_dos':'Lorem Impusm',
            'codigo_postal':'124455',
            'referencia':'La Primavera',
            'numero_convencional':'2342-5678'
          }
        ]
      };
      return $q(function(resolve) {
        resolve(user);
      });
    }

  }
})();
