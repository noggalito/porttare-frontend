(function () {
  'use strict';

  angular
    .module('porttare') //porttare module has ENV config
    .factory('$exceptionHandler', exceptionHandler);

  function exceptionHandler($log, ENV) {
    var airbrake = new airbrakeJs.Client({
      projectId: ENV.projectId,
      projectKey: ENV.projectKey,
      reporter: 'xhr',
      host: ENV.airbrakeHost
    });
    airbrake.addFilter(function (notice) {
      notice.context.environment = ENV.name;
      return notice;
    });

    function notification(exception, cause) {
      $log.error(exception);
      airbrake.notify({error: exception, params: {angular_cause: cause}}); //jshint ignore:line
    }

    return notification;
  }
})();
