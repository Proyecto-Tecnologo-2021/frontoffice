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
        return "[URL LOCAL DE ALTA DE RESTAURANTE]";
    }else{ //ES PROD
        return "[PROD]";
    }
}

export const URL_IndexBackoffice = () => {
    if (!prod){ //LOCAL
        return "[URL LOCAL DE LA INDEX DE BACKOFFICE]"; //ALGO ASÍ: http://localhost:8080/appettit-web/restaurante/index.xhtml
    }else{ //ES PROD
        return "[PROD]";
    }
}

//Utils de pedidos
export const paypalClientId = 'AX1tidD2Nabve-nXf9dR6UqFx6LtKK4-FJZ9QCzXJgoM8pjYrDNCCPF6KzOLgDDrGZSpaDA2psnjfP5l'
export const dollarVal = 44.5

// SERVICIOS DE USUARIO
export const Usuario_Login = '/usuarios/login' // POST
export const Usuario_Nuevo = "/usuarios"; // POST
export const Usuario_Modificar = "/usuarios/editar/" // PUT (AGREGAR EL ID DEL USUARIO A MODIFICAR AL FINAL)

// SERVICIOS DE DIRECCION
export const Direccion_Nueva = "/usuarios/agregarDireccion" // POST
export const Direccion_Listar = "/usuarios/getAddresses/" // GET (AGREGAR EL ID DEL USUARIO AL FINAL)
export const Dirreccion_Modificar = "/usuarios/editarDireccion/" // PUT (AGREGAR EL ID DE LA DIRECCION AL FINAL)
export const Dirreccion_Eliminar = "/usuarios/eliminarDireccion/" // PUT (AGREGAR EL ID DE LA DIRECCION AL FINAL)

// SERVICIOS DE MENU
export const menuListar = '/menu' // GET
