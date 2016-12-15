(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('providerProfileSchedule', providerProfileSchedule);

  function providerProfileSchedule() {
    var directive = {
      restrict: 'EA',
      controller: providerProfileScheduleController,
      controllerAs: 'ppSVm',
      bindToController: true,
      scope: {
        providerProfile: '='
      },
      templateUrl: 'templates/directives/provider-profile-schedule/provider-profile-schedule.html'
    };

    return directive;

    function providerProfileScheduleController($translate) {
      // jshint validthis:true
      var ppSVm = this,
          providerOffices = ppSVm.providerProfile.provider_offices; // jshint ignore:line

      if (providerOffices.length > 0) {
        var mainOffice = providerOffices[0];

        // jshint ignore:start
        ppSVm.openingTime = mainOffice.hora_de_apertura;
        ppSVm.closingTime = mainOffice.hora_de_cierre;
        // jshint ignore:end

        $translate(
          'globals.shortDayNames.' + mainOffice.inicio_de_labores // jshint ignore:line
        ).then(function (dayName) {
          ppSVm.fromDay = dayName;
        });
        $translate(
          'globals.shortDayNames.' + mainOffice.final_de_labores // jshint ignore:line
        ).then(function (dayName) {
          ppSVm.toDay = dayName;
        });
      }
    }
  }
})();
