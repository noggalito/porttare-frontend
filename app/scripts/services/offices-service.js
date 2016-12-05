(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('OfficesService', OfficesService);

  function OfficesService($http, ENV, $q, CommonService) {

    var service = {
      getOffices: getOffices,
      getOffice: getOffice,
      createOffice: createOffice,
      updateOffice: updateOffice
    };

    return service;

    function getOffices() {
      return CommonService.getObjects('/api/provider/offices');
    }

    function getOffice(officeId) {
      return CommonService.getObject('/api/provider/offices/', officeId);
    }

    function createOffice(office) {
      var data = convertDateToString(office);
      return CommonService.newObject(data, '/api/provider/offices');
    }

    function updateOffice(office) {
      var data = convertDateToString(office);
      return CommonService.editObject(data, '/api/provider/offices/');
    }

    function convertDateToString(office){
      var data = angular.copy(office);
      data.hora_de_apertura = moment(office.hora_de_apertura).format('HH:mm Z'); //jshint ignore:line
      data.hora_de_cierre = moment(office.hora_de_cierre).format('HH:mm Z'); //jshint ignore:line
      return data;
    }

  }
})();
