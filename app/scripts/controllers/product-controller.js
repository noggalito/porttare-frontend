(function () {
  'use strict';

  angular
    .module('porttare.controllers')
    .controller('ProductController', ProductController);

  function ProductController() {
    var productVm = this;
    productVm.more = false;
    productVm.moreLabel = 'mostrar mas';

    productVm.product = {
      id: 1,
      name: 'provider1',
      description: 'restaurant',
      images:[ '../images/bg.png',
        '../images/bg.png',
        '../images/bg.png',
        '../images/bg.png',
        '../images/bg.png'
      ],
      more: 'more information',
      amount: 0,
      unitPrice: 2.5,
      totalPrice: 0
    };

    productVm.slickConfig = {
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

    productVm.showMore = function () {
      if(productVm.more){
        productVm.more = false;
        productVm.moreLabel = 'mostrar mas';
      }else{
        productVm.more = true;
        productVm.moreLabel = 'mostrar menos';
      }
    };

    productVm.updatePrice = function (opt) {
      if(opt === 'add'){
        productVm.product.amount ++;
      }else if(opt === 'remove'){
        productVm.product.amount --;
      }
      productVm.product.totalPrice = (productVm.product.amount * productVm.product.unitPrice);
    };
  }
})();
