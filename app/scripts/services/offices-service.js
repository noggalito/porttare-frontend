(function () {
  'use strict';

  // jshint camelcase:false

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
      var uri = '/api/provider/offices',
          formattedOffice = formatOffice(office);
      return CommonService.newObject(formattedOffice, uri);
    }

    function updateOffice(office) {
      if(office.hora_de_apertura && office.hora_de_cierre){ // jshint ignore:line
        var data = convertDateToString(office);
        return CommonService.editObject(data, '/api/provider/offices/');
      }else{
       return $http({
          method: 'PATCH',
          url: ENV.apiHost + '/api/provider/offices/' + office.id,
          data: office
        });
      }
    }

    function formatOffice(office) {
      var formattedOffice = angular.copy(office);
      formatWeekdayHours(formattedOffice);
      return formattedOffice;
    }

    function formatWeekdayHours(office){
      angular.forEach(
        office.weekdays_attributes,
        function (weekdayAttributes){
          if (weekdayAttributes.hora_de_apertura) {
            weekdayAttributes.hora_de_apertura = formatOpeningTimeForApi(
              weekdayAttributes.hora_de_apertura
            );
          }
          if (weekdayAttributes.hora_de_cierre) {
            weekdayAttributes.hora_de_cierre = formatOpeningTimeForApi(
              weekdayAttributes.hora_de_cierre
            );
          }
        }
      );
    }

    function formatOpeningTimeForApi(openingTime){
      return $filter('formatDate')(openingTime, 'timeSchedule');
    }
  }
})();
