(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('CategoriesController', CategoriesController);

  function CategoriesController($scope) {

    var categoryVm = this;
    var cacheInit = moment();
    categoryVm.categories = function () { return $scope.$parent.menuVm.categories; };

    $scope.$on('$ionicView.enter', function() {
      if (moment().diff(cacheInit, 'minutes') > 10) {
        $scope.$emit('update-categories');
      }
    });

    $scope.$watch('$parent.menuVm.categories', function(){
      categoryVm.categories();
    });
  }
})();
