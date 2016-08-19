(function () {
'use strict';

  angular
    .module('porttare.translations', ['pascalprecht.translate'])
    .config(translationConfig);

  function translationConfig($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escapeParameters');

    $translateProvider.translations('es', {
      login: {
        email: 'Correo electrónico',
        password: 'Contraseña',
        login: 'Iniciar Sesión',
        forgotPassword: '¿Olvidaste tu contraseña?',
        continueWithFacebook: 'Continuar con facebook'
      },
      menu: {
        category: 'Categorías',
        location: 'Ubicación',
        provider: 'Proveedor',
        logout: 'Cerrar sesión'
      },
      provider: {
        formLegend: 'Datos nuevo proveedor',
        businessName: 'Razón social',
        economicActivity: 'Actividad económica',
        contributorType: 'Tipo de contribuyente',
        LegalRepresentative: 'Representante legal',
        phone: 'Número de teléfono',
        email: 'Correo electrónico',
        startDate: 'Fecha de inicio de actividades',
        bankName: 'Nombre de su banco',
        accountNumber: 'Número de cuenta',
        bankId: 'Identificación de su banco',
        webSite: 'Sitio web',
        bestArticle: 'Mejor artículo',
        methodPayment: 'Forma de pago',
        methods: {
          cash: 'Efectivo',
          creditCard: 'Tarjeta de crédito'
        }
      }
    });

    $translateProvider.preferredLanguage('es');
  }
})();
