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
        continueWithFacebook: 'Continuar con Facebook',
        unauthorized: 'No Autorizado'
      },
      menu: {
        category: 'Categorías',
        location: 'Ubicación',
        provider: 'Proveedor',
        products: 'Productos',
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
      },
      globals: {
        new: 'Nuevo',
        save: 'Guardar',
        list: 'Listar',
        edit: 'Editar',
        options: 'Opciones',
        success: 'Éxito',
        saving: 'Guardando',
        updating: 'Actualizando',
        pleaseTryAgain: 'Inténtalo nuevamente',
        leftData: 'Faltan datos',
        error: 'Error',
        or: 'o',
        index: 'Inicio'
      },
      item: {
        item: 'Artículo',
        items: 'Artículos',
        offerItem: 'Ofertar artículos',
        successItemSave: 'Artículo guardado éxitosamente',
        successUpdateItem: 'Artículo actualizado éxitosamente',
        titulo: 'Título',
        descripcion: 'Descripción',
        precio: 'Precio',
        volumen: 'Volumen',
        peso: 'Peso',
        imagen: 'Imagen',
        observaciones: 'Observaciones',
        unidadMedida: 'Unidad de medida'
      },
      actions: {
        showCategory: 'Lista de Categorías',
        newProvider: 'Nuevo Proveedor'

      },
      client: {
        formLegend: 'Datos cliente',
        client: 'Cliente',
        clients: 'Clientes',
        listOfClients: 'Lista de clientes',
        successClientSave: 'Cliente guardado éxitosamente',
        successUpdateClient: 'Cliente actualizado éxitosamente',
        notas: 'Notas',
        ruc: 'Ruc',
        nombres: 'Nombres',
        direccion: 'Dirección',
        telefono: 'Teléfono',
        email: 'email'
      },
      password: {
        updatePassword: 'Actualizar contraseña',
        current: 'Contraseña',
        confirm: 'Confirmar contraseña',
        update: 'Actualizar'
      }
    });

    $translateProvider.preferredLanguage('es');
  }
})();
