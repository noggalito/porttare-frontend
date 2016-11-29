(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('DispatchersService', DispatchersService);

  function DispatchersService(CommonService) {

    var service = {
      getDispatchers: getDispatchers,
      getProviderOffices: getProviderOffices,
      newDispatcher: newDispatcher,
      editDispatcher: editDispatcher,
      deleteDispatcher: deleteDispatcher
    };

    return service;

    function getDispatchers() {
      return CommonService.getObjects('/api/provider/dispatchers');
    }

    function getProviderOffices() {
      return CommonService.getObjects('/api/provider/offices');
    }

    function newDispatcher(data) {
      return CommonService.newObject(data, '/api/provider/dispatchers');
    }

    function editDispatcher(data) {
      return CommonService.editObject(data, '/api/provider/dispatchers/');
    }

    function deleteDispatcher(id) {
      return CommonService.deleteObject(id, '/api/provider/dispatchers/');
    }
  }
})();
