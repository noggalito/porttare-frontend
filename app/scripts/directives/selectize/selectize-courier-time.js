(function () {
  'use strict';

  angular
    .module('porttare.directives')
    .directive('selectizecouriertime', selectizeCourierTime);

  function selectizeCourierTime() {
    return {
      restrict: 'A',
      scope: {
        config: '=',
        time: '='
      },

      link: function(scope, elemento) {
        var selectize = elemento.selectize(scope.config)[0].selectize;

        selectize.addItem(scope.time,false);

        selectize.on('item_add', chooseTime);
        selectize.on('option_add', addTime);
        selectize.on('item_remove', deselectTime);

        function addTime(value) {
          scope.time = value;
        }

        function deselectTime(){
          scope.time = null;
        }

        function chooseTime(value) {
          scope.time = isFinite(value) ? value : undefined;
        }
      }
    };
  }
})();
