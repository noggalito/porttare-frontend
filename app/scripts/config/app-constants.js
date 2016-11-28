(function() {

 'use strict';
 angular
  .module('porttare.config')
  .constant('APP', {
    successState: 'app.categories.index',
    preloginState: 'prelogin',
    defaultImage: '../images/404.png',
    centsInDollar: '100'
  });
})();
