(function () {
  'use strict';
  /* jshint validthis:true */
  angular
    .module('porttare.directives')
    .directive('card', card);

  function card() {
    var directive = {
      restrict: 'E',
      templateUrl: 'templates/directives/card/card.html',
      scope: {
        options: '='
      },
      controller: cardController,
      controllerAs: 'vm',
      bindToController: true,
      transclude: true
    };

    return directive;

    function cardController(APP) {
      var vm = this;
      var defaultOptions = {
        headerImage: APP.defaultImage,
        bodyText: null,
        footerText: null,
        headerButton: {
          show: false,
          icon: 'ion-close'
        }
      };
      vm.onCardClick = onCardClick;
      vm.onHeaderButtonClick = onHeaderButtonClick;
      vm.enableCardPointer = false;
      vm.options = angular.merge(defaultOptions, vm.options);

      if (vm.options.onCardClick) {
        vm.enableCardPointer = true;
      }

      function onCardClick() {
        if (angular.isFunction(vm.options.onCardClick)) {
          vm.options.onCardClick();
        }
      }

      function onHeaderButtonClick(event) {
        event.stopPropagation();
        if (angular.isFunction(vm.options.headerButton.onClick)) {
          vm.options.headerButton.onClick();
        }
      }
    }
  }
})();
