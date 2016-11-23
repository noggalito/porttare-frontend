(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CategoryController', CategoryController);

  function CategoryController(data) {
    var categoryVm = this;

    categoryVm.category = data.provider_category;//jshint ignore:line
    categoryVm.providers = data.provider_category.provider_profiles;//jshint ignore:line
    categoryVm.slickConfig = {
      slidesToShow: 1,
      arrows: false,
      centerMode: true,
      mobileFirst: true,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    };
  }
})();
