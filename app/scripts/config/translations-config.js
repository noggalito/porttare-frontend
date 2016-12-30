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
          cart: 'Mi carro',
          wishlist: 'Wishlist',
          billingAddresses : 'Direcciones de facturación'
        },
        provider: {
          profile:'Perfil de Proveedor',
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
        successUpdateProfileProvider: 'Perfil actualizado éxitosamente',
        itemsProvider: 'Productos de Proveedor',
        formLegendFirst: 'Proveedor nuevo - Paso 1',
        formLegendSecond: 'Proveedor nuevo - Paso 2',
        updateInfoProvider:'Actualizar datos de Proveedor',
        businessName: 'Razón social',
        name: 'Nombre Establecimiento',
        economicActivity: 'Actividad económica',
        LegalRepresentative: 'Representante legal',
        phone: 'Número de teléfono',
        email: 'Correo electrónico',
        webSite: 'Sitio web',
        youtube:'Youtube',
        facebook:'Faceebook',
        twitter:'Twitter',
        instagram:'Instagram',
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
        createProvider: 'Crear Proveedor',
        noMoreItems: 'No hay más productos que mostrar'
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
        deliveryAddresses: 'Lugar de entrega',
        ready: 'Listo',
        customerOrderDeliveryUpdate: 'Datos de entrega actualizado éxitosamente',
        labels: {
          found: 'Encontramos',
          closeToYou: 'pedidos cerca de ti',
          currentLocation: 'de tu ubicación actual',
          forDelivery: 'para la entrega'
        }
      },
      globals: {
        new: 'Nuevo',
        list: 'Listar',
        edit: 'Editar',
        delete: 'Eliminar',
        seeMore: 'Ver más',
        save: 'Guardar',
        success: 'Éxito',
        cancel: 'Cancelar',
        options: 'Opciones',
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
        isRequired: 'Este campo es obligatorio',
        disabledUser: 'Su cuenta ha sido deshabilitada',
        id: 'Id',
        email: 'Email',
        confirmTitle: '¿Estás seguro?',
        dateDelivery: 'Fecha y hora de entrega',
        dateSelect: 'Seleccionar fecha',
        dayNames: {
          mon: 'Lunes',
          tue: 'Martes',
          wed: 'Miércoles',
          thu: 'Jueves',
          fri: 'Viernes',
          sat: 'Sábado',
          sun: 'Domingo'
        },
        shortDayNames: {
          mon: 'Lun',
          tue: 'Mar',
          wed: 'Mié',
          thu: 'Jue',
          fri: 'Vie',
          sat: 'Sáb',
          sun: 'Dom'
        },
        accept:'Aceptar'
      },
      item: {
        item: 'Producto',
        items: 'Productos',
        formLegend: 'Información del producto',
        publishItem: 'Publicar producto',
        successItemSave: 'Producto publicado éxitosamente',
        successUpdateItem: 'Producto actualizado éxitosamente',
        successDeleteItem: 'Producto eliminado éxitosamente',
        productName: 'Producto',
        quantity: 'Can',
        price: 'Precio',
        itemSearch: 'Buscar producto',
        titleWithoutItems: 'No tienes ningún producto que mostrar todavía.',
        subtitleWithoutItems: 'Presiona Nuevo Producto para empezar a vender.',
        titulo: 'Nombre del producto',
        descripcion: 'Descripción corta',
        stock:'Producto en Stock',
        precio: 'Precio',
        volumen: 'Volumen',
        peso: 'Peso',
        imagen: 'Fotografías',
        providerItemCategory: 'Categoría',
        addImages: 'Agregar fotografías',
        observaciones: 'Descripción larga',
        unidadMedida: 'Unidad de medida',
        valorMedida: 'Valor de medida',
        stockLabel: 'Producto en stock',
        productDetails:'Detalles del producto',
        cantidad: 'Cantidad',
        cantidadPrefix: 'x',
        currency: '$ ',
        seeAsCustomer: 'Ver como cliente',
        unregisterItem: 'Dar de baja',
        confirmUnregisterItem: '¿Estás seguro de querer dar de baja este producto?'
      },
      actions: {
        showCategory: 'Lista de Categorías',
        newProvider: 'Nuevo Proveedor',
        seeMore: 'Ver más',
        edit: 'Editar',
        delete: 'Eliminar'
      },
      client: {
        formLegend: 'Datos cliente',
        client: 'Cliente',
        clients: 'Clientes',
        listOfClients: 'Lista de clientes',
        successClientSave: 'Cliente guardado éxitosamente',
        successUpdateClient: 'Cliente actualizado éxitosamente',
        successDeleteClient: 'Cliente eliminado éxitosamente',
        disable: 'Eliminar',
        confirmDisable: '¿Estás seguro de querer eliminar este cliente?',
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
        email: 'email',
        noClients: 'No tienes ningún cliente todavía.',
        addImage: 'Agregar fotografía'
      },
      wishlist: {
        wishlists: 'Listas de deseos',
        searchBox: 'Buscar lista',
        new: 'Nueva lista',
        id: 'id',
        name: 'Nombre de la lista',
        edit: 'Ver lista',
        titleNew: 'Nueva lista',
        titleEdit: 'Editar lista',
        listName: 'Nombre de la lista',
        items: 'Items',
        shareWith: 'Compartir lista con',
        save: 'Guardar lista',
        remove: 'Eliminar lista',
        buttonAddItems: 'Agregar ítems +',
        buttonAddDate: 'Agregar hora y fecha +',
        buttonShare: 'Escoger usuario +',
        titleSelectItems: 'Seleccionar Items'
      },
      office: {
        office: 'Establecimiento',
        officeAddress: 'Dirección Establecimiento',
        officeMatrix: 'Matriz',
        officeSuccessSave: 'Establecimiento guardado éxitosamente',
        officeSuccessUpdate: 'Establecimiento actualizado éxitosamente',
        officeLegend: 'Datos del Establecimiento',
        ciudad: 'Ciudad',
        direccion: 'Dirección',
        telefono: 'Teléfono',
        horaApertura: 'Hora de apertura',
        horaCierre: 'Hora de cierre',
        officeNumber: 'Sucursal número',
        officeAttention:'Horario de atención',
        officeStart:'Inicio de labores',
        officeFinish: 'Final de Labores',
        officeDelete: '¿Seguro quieres eliminar este establecimiento?',
        officeDeleteReasons: 'Cuéntanos las razones',
        officeDeleteMotive: 'Motivo del cierre',
        officeDeleteTime: 'Tiempo del cierre',
        officeDeleteDefinitive: 'Es un cierre definitivo',
        disableOffice: 'Dar de baja',
        officeSuccessDelete: 'Local eliminado',
        officeSuccess: 'Correctamente',
        officesAny: 'No dispone de ningún Establecimiento o Sucursal',
        locationNotFound: 'No he encontrado la dirección: ',
        taskInProgress: 'Tarea en progreso',
        selectHourPlaceholder: 'Seleccionar hora',
        yes: 'Si',
        not: 'No',
        officeEnabled: 'Establecimiento activo'
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
        changeImagen: 'Cambiar Imagen',
        successUpdateProfile: 'Perfil actualizado éxitosamente',
        password: 'Contraseña',
        birthdate:  'Fecha de Nacimiento'
      },
      product: {
        more: 'mostrar más',
        less: 'mostrar menos',
        buyNow: 'Comprar Ahora',
        addCar: 'Añadir al carrito',
        addWishlist: 'Añadir a mi whishlist',
        modalTitle: 'Agregar a mi Wishlist o lista personalizada',
        modalButtonNew: 'Nueva Wishlist',
        modalInputNew: 'Nombre Wishlist',
        modalButtonSave: 'Guardar'
      },
      profile: {
        title: 'Perfil',
        tabs: {
          info: 'Datos',
          addresses: 'Direcciones',
          metrics:'Métricas',
          managements:'Gestiones'
        },
        addresses: {
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
        successfullyAdded: 'Ítem agregado exitosamente',
        buyItems: 'Comprar ítems',
        modalTitle: 'Finalizar pedido',
        placeOrder: 'Enviar pedido',
        observations: 'Observaciones',
        observacionesPlaceholder: 'Ej: sin cebollas',
        deliveryAddress: 'Dirección de entrega',
        deliveryMethod: 'Método de entrega',
        paymentMethod: 'Método de pago',
        successfullyOrder: 'Pedido generado exitosamente',
        cantidadPlural: 'unidades',
        cantidadSingular: 'unidad',
        title: 'Carrito',
        deliverNow: 'Entregar inmediatamente',
        shippingCosts: '(costos de envío)',
        deliveryPlaceholder: 'Entrega:',
        pickupPlaceholder: 'Recoger:',
        deliveryMethods: {
          pickup: 'Recoger en local',
          shipping: 'Enviar a domicilio',
        }
      },
      orders: {
        collectionTitle: 'Orden #',
        total: 'Total'
      },
      order: {
        providerProfile: {
          quantity: 'Can',
          price: 'Precio',
          item: {
            observations:'Observaciones: ',
            cantidadPrefix: 'x'
          }
        },
        summary: {
          subtotal: 'Subtotal',
          shippingCosts: 'Costos de Envío',
          VAT: '%',
          total: 'Total de Compra',
        },
        discount: {
          textCode: 'Código de Descuento',
          applyCode: 'Aplicar Código'
        },
        shippingCosts: 'Costos de Envio',
        observations: 'Observaciones',
        customerInfo: 'Información de Cliente y envío'
      },
      form: {
        requiredField: 'Campo requerido. ',
        wrongEmail: 'Email incorrecto. '
      },
      billingAddress: {
        legendForm: 'Dirección de facturación',
        newBillingAddress: 'Nueva dirección de facturación',
        anyBillingAddress: 'No dispone de ninguna dirección de facturación.',
        successSave: 'La dirección de facturación ha sido guardado éxitosamente',
        successUpdate: 'La dirección de facturación ha sido actualizado éxitosamente'
      },
      dispatchers:{
        dispatchers: 'Despachadores',
        dispatcher: 'Despachador',
        dispatcherSearch: 'Buscar Despachador',
        dispatcherAny: 'No has agregado ningún despachador todavía',
        dispacherClick:'Da click en Nuevo Despachador para empezar',
        dispacherOffice: 'Sucursal',
        dispatchersCreate: 'El Despachador ha sido guardado éxitosamente',
        dispatchersUpdate: 'El Despachador ha sido actualizado éxitosamente',
        dispatchersDelete: 'El Despachador ha sido eliminado éxitosamente',
        dispatchersData: 'Datos del Despachador',
        notAccepted: 'Esta invitación no ha sido aceptada todavía.'
      },
      termsAndConditions: {
        termsAndConditions: 'Términos y Condiciones',
        description: '¿Usted acepta los términos y condiciones?'
      }
    });

    $translateProvider.preferredLanguage('es');
  }
})();
