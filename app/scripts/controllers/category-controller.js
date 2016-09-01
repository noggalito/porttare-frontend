(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CategoryController', CategoryController);

  function CategoryController() {
    var categoryVm = this;

    //TODO remove this when we have the endpoint
    categoryVm.categories = [{id: 1, name: 'hola1', imagen: '../images/bg.png', provider: {id:1}},
                            {id: 1, name: 'hola2', imagen: '../images/bg.png', provider: {id:1}},
                            {id: 1, name: 'hola3', imagen: '../images/bg.png', provider: {id:1}},
                            {id: 1, name: 'hola4', imagen: '../images/bg.png', provider: {id:1}},
                            {id: 1, name: 'hola5', imagen: '../images/bg.png', provider: {id:1}}];

    categoryVm.slickConfig = {
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  }
})();
