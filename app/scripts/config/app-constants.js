(function() {

 'use strict';
 angular
  .module('porttare.config')
  .constant('APP', {
    successState: 'app.categories.index',
    preloginState: 'prelogin',
    defaultImage: '../images/404.png',
    defaultProfileImage: '../images/mysteryman.png',
    centsInDollar: '100',
    fbAuthScope: ['public_profile', 'email', 'user_birthday'],
    paymentMethods: ['efectivo'],
    deliveryMethods: ['shipping', 'pickup']
  });
})();
