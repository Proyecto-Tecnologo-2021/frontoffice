export const localDevelopment = false;
export const URL_Services = "http://localhost:8080/appettit-web/rest"; //LOCAL

// SERVICIOS DE USUARIO
export const Usuario_Login = '/usuarios/login' // POST
export const Usuario_Nuevo = "/usuarios"; // POST
export const Usuario_Modificar = "/usuarios/editar/" // PUT (AGREGAR EL ID DEL USUARIO A MODIFICAR AL FINAL)

// SERVICIOS DE DIRECCION
export const Direccion_Nueva = "/usuarios/agregarDireccion" // POST
export const Direccion_Listar = "/usuarios/getAddresses/" // GET (AGREGAR EL ID DEL USUARIO AL FINAL)
export const Dirreccion_Modificar = "/usuarios/editarDireccion/" // PUT (AGREGAR EL ID DE LA DIRECCION AL FINAL)
// SERVICIOS DE MENU
export const menuListar = '/menu' // GET


//PROD
// export const URL_Services = "";
//export const menuListar = '/menu' //GET
