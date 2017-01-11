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

    function providerProfileScheduleController() {
      // jshint validthis:true
      var ppSVm = this,
          providerOffices = ppSVm.providerProfile.provider_offices; // jshint ignore:line

      ppSVm.isOpen = false;

      if (providerOffices.length > 0) {
        var mainOffice = providerOffices[0];
        var dia = getCurrentDay();

        var officeWeekday = mainOffice.weekdays.find(function(wday){
          return wday.day === dia;
        });

        if (officeWeekday) {
          ppSVm.isOpen = getIsOpen(officeWeekday);
          // jshint ignore:start
          ppSVm.openingTime = officeWeekday.hora_de_apertura;
          ppSVm.closingTime = officeWeekday.hora_de_cierre;
          // jshint ignore:end
        }
      }
    }

    function getCurrentDay(){
      return moment().locale('en').format('ddd').toLowerCase();
    }

    function getIsOpen(officeWeekday) {
      // TODO it's open if right now it's open
      return officeWeekday.abierto;
    }
  }
})();
