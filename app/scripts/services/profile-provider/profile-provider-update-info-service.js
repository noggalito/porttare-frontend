(function () {
    'use strict';

    angular
        .module('porttare.services')
        .factory('ProfileProviderUpdateService', ProfileProviderUpdateService);


    function ProfileProviderUpdateService($http,ENV,$q) {
        var service = {

            updateProfileProvider:updateProfileProvider
        };

        return service;

         function updateProfileProvider(providerData){
            return $http({
                method: 'PUT',
                url: ENV.apiHost + '/api/provider/profile' ,
                data: providerData

            }).then(function success(res) {
                return res.data;
                //console.log(res.data)
            }, function error(res) {
                return $q.reject(res.data);
            });

        }

    }
})();
