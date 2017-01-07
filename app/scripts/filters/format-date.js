(function () {
  'use strict';

  angular
    .module('porttare.filters')
    .filter('formatDate', formatDate);

  function formatDate() {
    return function (currentValue, formatStr) {
      var _date = new Date(currentValue),
          defaultFormat = 'DD/MM/YYYY HH:mm',
          timeScheduleFormat = 'HH:mm Z';

      if (formatStr === undefined) {
        formatStr = defaultFormat;
      } else if (formatStr === 'timeSchedule') {
        formatStr = timeScheduleFormat;
      }

      return moment(_date).format(formatStr);
    };
  }

})();
