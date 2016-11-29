(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CategoryController', CategoryController);

  function CategoryController(data) {
    var categoryVm = this;

    categoryVm.category = data.provider_category;//jshint ignore:line
    categoryVm.providers = data.provider_category.provider_profiles;//jshint ignore:line

    // use centerMode only if there's more than
    // one provider. Otherwise unique provider
    // is moved to the left
    var centerMode = categoryVm.providers.length > 1;
    categoryVm.options = {
      data: {
        category: categoryVm.category,
        providers: categoryVm.providers
      },
      slickSettings: {
        centerMode: centerMode,
        slidesToShow: 4,
        responsive: [
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4
            }
          }
        ]
      }
    };
  }
})();
