(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('OfficesService', OfficesService);

  function OfficesService($q,
                          $http,
                          $filter,
                          ENV,
                          CommonService) {

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
      return CommonService.newObject(office, '/api/provider/offices');
    }

    function updateOffice(office) {
      var data = convertDateToString(office);
      return CommonService.editObject(data, '/api/provider/offices/');
    }

    function convertDateToString(office){
      var data = angular.copy(office);
      // jshint ignore:start
      data.hora_de_apertura = $filter('formatDate')(
        office.hora_de_apertura,
        'HH:mm Z'
      );
      data.hora_de_cierre = $filter('formatDate')(
        office.hora_de_cierre,
        'HH:mm Z'
      );
      // jshint ignore:end
      return data;
    }

  }
})();
