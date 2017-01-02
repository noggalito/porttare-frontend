(function () {
  'use strict';

  angular
    .module('porttare.services')
    .factory('ProviderCustomerOrdersService', ProviderCustomerOrdersService);

  function ProviderCustomerOrdersService($http, CommonService, ENV) {

    var service = {
      getProviderCustomerOrdersByStatus: getProviderCustomerOrdersByStatus,
      getCustomerOrder: getCustomerOrder,
      acceptOrder: acceptOrder,
      rejectOrder: rejectOrder
    };

    return service;

    function getProviderCustomerOrdersByStatus(status) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/provider/customer_orders?status='+status
      }).then(function success(resp) {
          return resp.data;
      });
    }

    function getCustomerOrder(id){
      var url = '/api/provider/customer_orders/';
      return CommonService.getObject(url, id).then(function (response){
        return response.customer_order; // jshint ignore:line
      });
    }

    function acceptOrder(customerOrder) {
      var url = '/api/provider/customer_orders/',
          id = customerOrder.id,
          method = '/accept';
      return $http({
        method: 'POST',
        url: ENV.apiHost + url + id + method
      }).then(function success(response){
        return response.data.customer_order; // jshint ignore:line
      });
    }

    function rejectOrder(customerOrder, reason) {
      var url = '/api/provider/customer_orders/',
          id = customerOrder.id,
          method = '/reject';
      return $http({
        method: 'POST',
        url: ENV.apiHost + url + id + method,
        data: { reason: reason }
      }).then(function success(response){
        return response.data.customer_order; // jshint ignore:line
      });
    }
  }
})();
