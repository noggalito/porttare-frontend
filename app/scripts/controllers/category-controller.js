(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CategoryController', CategoryController);

  function CategoryController() {
    var categoryVm = this;

    //TODO remove this when we have the endpoint
    categoryVm.categories = [{id: 1, name: 'hola1', imagen: '../images/bg.png'},
                            {id: 1, name: 'hola2', imagen: '../images/bg.png'},
                            {id: 1, name: 'hola3', imagen: '../images/bg.png'},
                            {id: 1, name: 'hola4', imagen: '../images/bg.png'},
                            {id: 1, name: 'hola5', imagen: '../images/bg.png'}];
  }
})();
