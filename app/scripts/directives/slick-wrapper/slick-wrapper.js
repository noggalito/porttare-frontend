(function () {
  'use strict';
  /* jshint validthis:true */
  angular
    .module('porttare.directives')
    .directive('slickWrapper', slickWrapper);

  function slickWrapper() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/slick-wrapper/slick-wrapper.html',
      scope: {
        settings: '='
      },
      controller: slickWrapperController,
      controllerAs: 'swcVm',
      bindToController: true,
      transclude: true
    };

    return directive;
  }

  function slickWrapperController() {
    var swcVm = this;
    var defaultSlickConfig = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      swipeToSlide: true,
      mobileFirst: true
    };
    swcVm.customSettings = angular.merge({}, defaultSlickConfig, swcVm.settings);

  }
})();
