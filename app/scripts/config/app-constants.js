(function() {

 'use strict';
 angular
  .module('porttare.config')
  .constant('APP', {
    successState: 'app.categories.index',
    preloginState: 'prelogin',
    defaultImage: '../images/bg.png',
    abbrDays: [
      'mon',
      'tue',
      'wed',
      'thu',
      'fri',
      'sat',
      'sun'
    ],
    cities: [
      'Loja',
      'Quito'
    ]
  });
})();
