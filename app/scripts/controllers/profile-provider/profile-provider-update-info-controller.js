    (function () {
        'use strict';

        angular
            .module('porttare.controllers')
            .controller('ProfileProviderUpdateController', ProfileProviderUpdateController);

        function ProfileProviderUpdateController(ProfileProviderUpdateService,
                                   ModalService,
                                   $ionicLoading,
                                   $ionicPopup,
                                   $scope,
                                   $auth
                                   ) {
            var providerProfileVm = this;
            providerProfileVm.showNewModal = showNewModal;
            providerProfileVm.showEditModal = showEditModal;
            providerProfileVm.closeModal = closeModal;
            providerProfileVm.edit = editProfile;

            init();

            function init(){

                $auth.validateUser()
                    .then(function userAuthorized(user) {
                        providerProfileVm.profileProvider  = user.provider_profile;
                        console.log(providerProfileVm.profileProvider)
                    });
            }

            function editProfile() {
                $ionicLoading.show({
                    template: '{{::("globals.updating"|translate)}}'
                });
                ProfileProviderUpdateService.updateProfileProvider(providerProfileVm.profileProvider)
                    .then(function success(resp) {
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Éxito',
                                template: '{{::("provider.successUpdateProfileProvider"|translate)}}'
                            });
                            providerProfileVm.profileProvider = resp.profileProvider;
                            closeModal();
                        },
                        function error(resp){
                            providerProfileVm.messages = resp.status===422 ? resp.data.errors:undefined;
                           console.log(providerProfileVm)
                            $ionicLoading.hide();
                        });
            }


            function showNewModal() {
                ModalService.showModal({
                    parentScope: $scope,
                    fromTemplateUrl: 'templates/profile-provider/edit.html'
                });
            }

            function showEditModal() {

                providerProfileVm.profileProvider = angular.copy(providerProfileVm.profileProvider);
                providerProfileVm.showNewModal();
            }

            function closeModal() {
                ModalService.closeModal();

                providerProfileVm.profile = null;
                providerProfileVm.messages = {};
                providerProfileVm.query = '';
            }
        }
    })();