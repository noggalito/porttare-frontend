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
        logout: 'Cerrar sesión',
        buyer: 'Comprador',
        changeTo: 'Cambiar a',
        product: 'Producto',
        profile: 'Ver Perfil',
        account: 'Cuenta',
        invite: 'Invitar',
        history: 'Historial',
        user:{
          courier: 'Mensajero',
          buyer: 'Comprador',
          provider: 'Proveedor',
          dispatcher: 'Despachador'
        },
        client: {
          category: 'Categorías',
          myOrders: 'Mis Pedidos',
          myLists: 'Mis Listas',
          coupon: 'Cuponera',
          payments: 'Pagos',
          provider: 'Proveedor',
          cart: 'Mi carro'
        },
        provider: {
          orders: 'Pedidos',
          products: 'Productos',
          clients: 'Clientes',
          account: 'Cuenta',
          dispatchers: 'Despachadores',
          establishments: 'Establecimientos',
          promotionsAndDiscounts: 'promociones y descuentos',
          moviggoAdvertising: 'publicidad moviggo'
        },
        courier: {
          orders: 'Pedidos',
          account: 'Cuenta',
          payments: 'Pagos',
          history: 'Historial'
        },
        dispatcher: {
          dispatch: 'Despachos'
        }
      },
      provider: {
        itemsProvider: 'Productos de Proveedor',
        formLegendFirts: 'Datos nuevo proveedor - Paso 1',
        formLegendSecond: 'Datos bancarios proveedor - Paso 2',
        formLegendThird: 'Matriz proveedor - Paso 3',
        businessName: 'Razón social',
        name: 'Nombre Establecimiento',
        economicActivity: 'Actividad económica',
        LegalRepresentative: 'Representante legal',
        phone: 'Número de teléfono',
        email: 'Correo electrónico',
        webSite: 'Sitio web',
        methodPayment: 'Forma de pago',
        methods: {
          cash: 'Efectivo',
          creditCard: 'Tarjeta de crédito'
        },
        orders: 'pedidos',
        products:  'productos',
        logo: 'Logotipo',
        bank: {
          name: 'Nombre de su banco',
          account: 'Número de cuenta',
          type: 'Tipo de cuenta',
          savings:'Ahorros',
          credit: 'Crédito'
        },
        address: 'Dirección',
        city: 'Ciudad',
        openTime: 'Hora de Apertura',
        closeTime: 'Hora de Cierre',
        initialLaborDay: 'Inicio de Labores',
        finalLaborDay: 'Final de Labores',
        isRequired: 'Este campo es obligatorio',
        nextStep: 'Siguiente Paso',
        createProvider: 'Crear Proveedor'
      },
      courier: {
        successCourierSave: 'Mensajero guardado éxitosamente',
        welcomeTitle: 'Conviértete en mensajero',
        welcomeDescription: 'Con moviggo puedes enviar productos y convertirte en mensajero',
        newCourierTitle: 'Nuevo Mensajero',
        formLegend: 'Datos nuevo mensajero',
        names: 'Nombre completos',
        ruc: 'Cedula/RUC/Pasaporte',
        phone: 'Número de teléfono',
        email: 'Correo electrónico',
        location: 'Ubicación',
        mobilization: 'Tipo de medio de movilización',
        birthdate: 'Fecha de nacimiento',
        license: 'Licencia de conducir',
        orders: 'Pedidos',
        labels: {
          found: 'Encontramos',
          closeToYou: 'pedidos cerca de ti',
          currentLocation: 'de tu ubicación actual',
          forDelivery: 'para la entrega'
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
        deleting: 'Eliminando',
        pleaseTryAgain: 'Inténtalo nuevamente',
        leftData: 'Faltan datos',
        error: 'Error',
        or: 'o',
        index: 'Inicio',
        loading: 'Cargando',
        sending: 'Enviando',
        start: 'Empezar',
        sendRequest: 'Enviar solicitud',
        isRequired: 'Este campo es obligatorio'
      },
      item: {
        item: 'Producto',
        items: 'Productos',
        formLegend: 'Información del producto',
        publishItem: 'Publicar producto',
        successItemSave: 'Producto publicado éxitosamente',
        successUpdateItem: 'Producto actualizado éxitosamente',
        successDeleteItem: 'Producto eliminado éxitosamente',
        productName: 'Nombre producto',
        quantity: 'Can',
        price: 'Precio',
        itemSearch: 'Buscar producto',
        titleWithoutItems: 'No tienes ningún producto que mostrar todavía',
        subtitleWithoutItems: 'Da click en Nuevo Producto para empezar a vender.',
        titulo: 'Nombre del producto',
        descripcion: 'Descripción corta',
        precio: 'Precio',
        volumen: 'Volumen',
        peso: 'Peso',
        imagen: 'Fotografias',
        addImages: 'Agregar fotografías',
        observaciones: 'Descripción larga',
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
        successDeleteClient: 'Cliente eliminado éxitosamente',
        unsubscribe: 'Dar de baja',
        import: 'Importar',
        export: 'Exportar',
        clientName: 'Nombre del cliente',
        sortBy: 'Ordenar por',
        clientSearch: 'Buscar cliente',
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
      },
      user: {
        profile: 'Perfil de Usuario',
        showProfile: 'Ver perfil',
        name: 'Nombre',
        email:  'Correo electrónico',
        age:  'Edad',
        country:  'Ciudad',
        image:  'Imagen',
        successUpdateProfile: 'Perfil actualizado éxitosamente',
        password: 'Contraseña',
        birthdate:  'Fecha de Nacimiento'
      },
      product: {
        more: 'mostrar más',
        less: 'mostrar menos',
        buyNow: 'Comprar Ahora',
        addCar: 'Añadir al carrito',
        addWishlist: 'Añadir a mi whishlist'
      },
      profile: {
        title: 'Perfil',
        tabs: {
          info: 'Datos',
          addresses: 'Direcciones'
        },
        addresses: {
          buttonEdit: 'Editar',
          city: 'Ciudad',
          parish: 'Parroquia',
          neighborhood: 'Barrio',
          addressOne: 'Dirección 1',
          addressTwo: 'Dirección 2 (Opcional)',
          zipCode: 'Código postal',
          reference: 'Referencia',
          telephoneNumber: 'Número convencional',
          formLegendUpdate: 'Actualizar Dirección',
          formLegendNew: 'Nueva Dirección',
          name: 'Nombre',
          addAddressBtnText: 'Agregar Dirección',
          saveBtnText: 'Guardar Dirección',
          updateBtnText: 'Actualizar Dirección'
        }
      },
      cart: {
        successfullyAdded: 'Ítem agregado exitosamente'
      }
    });

    $translateProvider.preferredLanguage('es');
  }
})();
