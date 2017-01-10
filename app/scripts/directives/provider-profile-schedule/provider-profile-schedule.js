(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('providerProfileSchedule', providerProfileSchedule);

  function providerProfileSchedule() {
    var directive = {
      restrict: 'EA',
      controller: ['$translate', providerProfileScheduleController],
      controllerAs: 'ppSVm',
      bindToController: true,
      scope: {
        providerProfile: '='
      },
      templateUrl: 'templates/directives/provider-profile-schedule/provider-profile-schedule.html'
    };

    return directive;

    function providerProfileScheduleController($translate,APP) {
      // jshint validthis:true
      var ppSVm = this;
      ppSVm.getDayText = getDayText;
      var providerOffices = ppSVm.providerProfile.provider_offices; // jshint ignore:line

      function getDayText(dayOfWeek){
        var dayText = '';
        switch (dayOfWeek){
          case 0:
          case 7:
            dayText = "sun";
            break;
          case 1:
            dayText = "mon";
            break;
          case 2:
            dayText = "tue";
            break;
          case 3:
            dayText = "wed";
            break;
          case 4:
            dayText = "thu";
            break;
          case 5:
            dayText = "fri";
            break;
          case 6:
            dayText = "sat";
            break;
        };
        return dayText;
      };

      if (providerOffices.length > 0) {
        var mainOffice = providerOffices[0];
        var fechaActual=new Date();
        var dia=fechaActual.getDay();
        var textDay=getDayText(dia);

        var office=mainOffice.weekdays.filter(function (wday){
          if(wday.day===textDay){
            return wday;
          }
        });

        if(office.length!==0){
          // jshint ignore:start
          ppSVm.openingTime = office[0].hora_de_apertura;
          ppSVm.closingTime = office[0].hora_de_cierre;
          // jshint ignore:end
          if(office[0].abierto){
            ppSVm.openStatus='Abierto';
          }else{
            ppSVm.openStatus='Cerrado';
          }
        }else{
          ppSVm.openStatus='Cerrado';
        }

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
