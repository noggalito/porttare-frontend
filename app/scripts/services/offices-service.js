(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('OfficesService', OfficesService);

  function OfficesService($http, ENV, CommonService, $filter) {

    var service = {
      getOffices: getOffices,
      newOffice: newOffice
    };

    return service;

    function getOffices() {
      return CommonService.getObjects('/api/provider/offices');
    }

    function newOffice(office) {
      var data = angular.copy(office);
      data.hora_de_apertura = $filter('date')(office.hora_de_apertura, "HH:mm Z");//jshint ignore:line
      data.hora_de_cierre = $filter('date')(office.hora_de_cierre, "HH:mm Z");//jshint ignore:line
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/offices',
        data: data
      }).then(function success(res){
        return res.data;
      });
    }

  }
})();
