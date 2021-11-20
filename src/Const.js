const prod = false;
export const localDevelopment = false;

export const URL_Services = () => {
    if (!prod){ //LOCAL
        return "http://localhost:8080/appettit-web/rest";
    }else{ //ES PROD
        return "[LA DIRECCIÓN DE PRODUCCIÓN]";
    }
}

export const URL_AltaRestaurante = () => {
    if (!prod){ //LOCAL
        return "http://127.0.0.1:8080/appettit-web/restaurante/addrestaurante.xhtml";
    }else{ //ES PROD
        return "[PROD]";
    }
}

export const URL_IndexBackoffice = () => {
    if (!prod) { //LOCAL
        return "http://127.0.0.1:8080/appettit-web/restaurante/home.xhtml"; //ALGO ASÍ: http://localhost:8080/appettit-web/restaurante/index.xhtml
    } else { //ES PROD
        return "[PROD]";
    }
}

export const Login_Google_Id = () => {
    if (!prod){ //LOCAL
        return "813641537629-4c0gvuccrrutpa9rqssu8eaej8kcdjns.apps.googleusercontent.com";
    }else{ //ES PROD
        return "[PROD]";
    }
}

//Utils de pedidos
export const paypalClientId = 'AX1tidD2Nabve-nXf9dR6UqFx6LtKK4-FJZ9QCzXJgoM8pjYrDNCCPF6KzOLgDDrGZSpaDA2psnjfP5l'

// SERVICIOS DE PEDIDOS
export const pedidoCrear = '/pedido/pedido2' //POST
export const Pedido_Last = '/pedido/ultimo/' // GET (AGREGAR EL ID DEL USUARIO AL FINAL)
export const allOrders = '/pedido/listarpedidos2/' //GET (AGREGAR EL ID DEL USUARIO AL FINAL)
export const orderById = '/pedido/listar/' //GET (AGREGAR EL ID DEL PEDIDO AL FINAL)

// SERVICIOS DE USUARIO
export const Usuario_Login = '/usuarios/login' // POST
export const Usuario_Login_Google = '/usuarios/loginGoogle' // POST
export const Usuario_Nuevo = "/usuarios"; // POST
export const Usuario_Modificar = "/usuarios/editar/" // PUT (AGREGAR EL ID DEL USUARIO A MODIFICAR AL FINAL)
export const Pass_Recover = "/usuarios/requestMailLink"; // POST
export const Pass_Change = "/usuarios/changePassword"; // POST
export const Set_Token = "/usuarios/setFirebaseTokenWeb"; // POST

// SERVICIOS DE DIRECCION
export const Direccion_Nueva = "/usuarios/agregarDireccion" // POST
export const Direccion_Listar = "/usuarios/getAddresses/" // GET (AGREGAR EL ID DEL USUARIO AL FINAL)
export const Dirreccion_Modificar = "/usuarios/editarDireccion/" // PUT (AGREGAR EL ID DE LA DIRECCION AL FINAL)
export const Dirreccion_Eliminar = "/usuarios/eliminarDireccion/" // PUT (AGREGAR EL ID DE LA DIRECCION AL FINAL)

// SERVICIOS DE MENU
export const menuListar = '/menu' // GET

// SERVICIOS DE PROMOS
export const promoListar = '/promo' //GET

// SERVICIOS DE PRODUCTOS
export const productsByRestaurant = '/menu/getMenuAll/' //GET

// SERVICIOS DE RESTAURANTES
export const listarRestaurantesAbiertos = '/usuarios/listarAbiertos'
export const listarRestaurantesPorId = '/restaurante/listarDatosBasicos/'

// SERVICIO DE COTIZACIONES
export const urlCotizaciones = 'https://cotizaciones-brou.herokuapp.com/api/currency/' // AAAA-MM-DD - GET

// VAPID KEY FIREBASE
export const vapidKey = 'BJSMnaFwEFT0-p9n623Bgogrpe9eTE7IIbYkmUlSFJCFKmyHwKDwaJS6feUiGwuv1bR7zZB5l4LeLXpTsqokaUQ'

// CONFIGURACION DE FIREBASE
export const firebaseConfig = {
    apiKey: "AIzaSyBvdjK7f3uxnWo_3v31U1YmK2WW0ffexsk",
    authDomain: "appetit-2c5d3.firebaseapp.com",
    projectId: "appetit-2c5d3",
    storageBucket: "appetit-2c5d3.appspot.com",
    messagingSenderId: "915134390722",
    appId: "1:915134390722:web:8eb3d2db096d258ce7f65b",
    measurementId: "G-DMYX46ND1P"
}

// SERVICIO DE  CALIFICACIONES
export const newCalification = '/pedido/calificar/' //PUT
export const updCalification = '/pedido/calificarUPD/' //PUT
