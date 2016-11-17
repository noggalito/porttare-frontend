(function () {
  'use strict';
  /*jshint camelcase:false */
  describe('ProfileAddressesService', function () {
    var service, $httpBackend, ENV;

    beforeEach(module('porttare.services'));
    beforeEach(module('porttare.services', function ($provide) {
      $provide.constant('ENV', {
        name: 'development',
        apiHost: 'http://localhost:3785'
      });
    }));

    beforeEach(inject(function (_ProfileAddressesService_, _$httpBackend_, _ENV_) {
      service = _ProfileAddressesService_;
      ENV = _ENV_;
      $httpBackend = _$httpBackend_;
    }));

    describe('Getting data', function () {
      var resData = null;
      beforeEach(function () {
        resData = {
          'customer_addresses': [{
            'id': 1,
            'nombre': 'Departamento',
            'ciudad': 'Quito',
            'parroquia': 'Quito',
            'barrio': 'Cumbayá',
            'direccion_uno': 'Calle Miguel Ángel',
            'direccion_dos': 'Lorem Impusm',
            'codigo_postal': '124455',
            'numero_convencional': '2342-5678',
            'referencia': 'Cerca a la cuchara, casa de 2 pisos amarilla'
          }, {
            'id': 2,
            'nombre': 'Casa',
            'ciudad': 'Quito',
            'parroquia': 'Quito',
            'barrio': 'Cumbayá',
            'direccion_uno': 'Calle Miguel Ángel',
            'direccion_dos': 'Lorem Impusm',
            'codigo_postal': '124455',
            'numero_convencional': '2342-4444',
            'referencia': 'Lorem Impusm'
          }]
        };
        var expectedUrl = ENV.apiHost + '/api/customer/addresses';
        $httpBackend.expectGET(expectedUrl).respond(resData);
      });

      it('should get all addresses', function () {
        service.getAddresses().then(function (response) {
          expect(response).to.be.an('object');
          expect(response).to.include.keys('customer_addresses');
          expect(response.customer_addresses.length).to.be.equal(2);
        });
        $httpBackend.flush();
      });
      it('should get an address', function () {
        var expectData = {
          'id': 2,
          'nombre': 'Casa',
          'ciudad': 'Quito',
          'parroquia': 'Quito',
          'barrio': 'Cumbayá',
          'direccion_uno': 'Calle Miguel Ángel',
          'direccion_dos': 'Lorem Impusm',
          'codigo_postal': '124455',
          'numero_convencional': '2342-4444',
          'referencia': 'Lorem Impusm'
        };
        service.getAddress('2').then(function (response) {
          expect(response).to.be.an('object');
          expect(response).to.deep.equal(expectData);
        });
        $httpBackend.flush();
      });
    });


    it('should create a new address', function () {
      var expectedUrl = ENV.apiHost + '/api/customer/addresses';
      var address = {
        'nombre': 'Casa',
        'ciudad': 'Quito',
        'parroquia': 'Quito',
        'barrio': 'Cumbayá',
        'direccion_uno': 'Calle Miguel Ángel',
        'direccion_dos': 'Lorem Impusm',
        'codigo_postal': '124455',
        'numero_convencional': '2342-4444',
        'referencia': 'Lorem Impusm'
      };
      var expectData = address;
      expectData.id = '1';

      $httpBackend.expectPOST(expectedUrl).respond(expectData);
      service.createAddresses(address).then(function (response) {
        expect(response).to.be.an('object');
        expect(response).to.deep.equal(expectData);
      });
      $httpBackend.flush();
    });

    it('should update an address', function () {
      var id = 1;
      var expectedUrl = ENV.apiHost + '/api/customer/addresses/' + id;
      var address = {
        'id': 1,
        'nombre': 'Casa',
        'ciudad': 'Quito',
        'parroquia': 'Quito',
        'barrio': 'Cumbayá',
        'direccion_uno': 'Calle Miguel Ángel',
        'direccion_dos': 'Lorem Impusm',
        'codigo_postal': '124455',
        'numero_convencional': '2342-4444',
        'referencia': 'Lorem Impusm'
      };

      $httpBackend.expectPUT(expectedUrl).respond(address);
      service.updateAddresses(address).then(function (response) {
        expect(response).to.be.an('object');
        expect(response).to.deep.equal(address);
      });
      $httpBackend.flush();
    });
  });
})();
