(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProviderService', ProviderService);

  function ProviderService($http,
                            $q,
                            ENV,
                            $filter) {

    var service = {
      createNewProvider: createNewProvider
    };

    return service;

    function createNewProvider(provider) {
      var data = angular.copy(provider);
      data.offices_attributes[0].hora_de_apertura = dateFormat(data.offices_attributes[0].hora_de_apertura);//jshint ignore:line
      data.offices_attributes[0].hora_de_cierre = dateFormat(data.offices_attributes[0].hora_de_cierre);//jshint ignore:line
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/provider/profile',
        data: data
      }).then(function success(res){
        return res.data;
      }, function error(res) {
        return $q.reject(res.data);
      });
    }

    function dateFormat(date) {
      var newDate = null;
      newDate = $filter('date')(date, 'HH:mm Z');
      return newDate;
    }

  }
})();
