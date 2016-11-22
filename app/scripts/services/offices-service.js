(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('OfficesService', OfficesService);

  function OfficesService($http, ENV, $q, CommonService, $filter) {

    var service = {
      getOffices: getOffices,
      createOffice: createOffice,
      updateOffice: updateOffice
    };

    return service;

    function getOffices() {
      return CommonService.getObjects('/api/provider/offices');
    }

    function createOffice(office) {
      var data = convertDateToString(office);
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/offices',
        data:data
      }).then(function success(res){
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function updateOffice(office) {
      var data = convertDateToString(office);
      return CommonService.editObject(data, '/api/provider/offices/');
    }

    function convertDateToString(office){
      var data = angular.copy(office);
      data.hora_de_apertura = $filter('date')(office.hora_de_apertura, "HH:mm Z");//jshint ignore:line
      data.hora_de_cierre = $filter('date')(office.hora_de_cierre, "HH:mm Z");//jshint ignore:line
      return data;
    }

  }
})();
