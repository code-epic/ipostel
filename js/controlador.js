/**
 *
 */
let _ANOACTUAL = new Date().getUTCFullYear();

let FrmValidar = false;
let JsonMenu = {};
let _Aplicacion = {}

let Util = new Utilidad();
let conn = new Conexion();



// Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 3000
// });


 $(function(){
  if (sessionStorage.getItem('ipostel') != undefined ){
    $(location).attr("href","index.html");

  }else{
    console.info('Iniciando carga del sistema');

    CargarUrl('modales', 'inc/modales');
    Util.CargarJsonMenu();
    Util.DibujarMenuLateral();
    Util.DibujarEscritorio();
    //Util.DibujarEscritorio(JsonMenu);
    //ObtenerOficinas();
    //ListarServiciosTipo();
  }
 }


 ); //Fin de la funcion



/**
 * Función de Cierre de Sesión
 */
function CerrarSesion(){
	sessionStorage.removeItem('ipostel');
	$(location).attr("href","../index.html");
}


/**
 * Funcion de Iniciar Sesión
 */
function IniciarSesion(){
  if (sessionStorage.getItem('ipostel') != undefined ){

    var e = sessionStorage.getItem("ipostel");
    var s = e.split(".");
    var json = JSON.parse(atob(s[1]));
    Usuario = json.Usuario;


    $("#_PerfilUsuario").html(Usuario.Perfil.descripcion);
    $("#_NombreUsuario").html(Usuario.nombre);

  }
}

 function CargarReportes(){
   CargarUrl('cuerpo', 'inc/configuracion/submenu_reportes');
  // CargarUrl('cargamasiva', 'inc/configuracion/usuariosmodal');
 }

 function CargarVentaPorSermana(){
   console.log("Acceder");
   ListarOficinas();
   CargarUrl('cuerpo', 'inc/configuracion/ventaporsemana');
  // CargarUrl('cargamasiva', 'inc/configuracion/usuariosmodal');
 }



/**
 * Carga Módulo CNC
 * V 1.0
 */
function CargarCnc(){
 // Util.DibujarSubMenuEscritorio(JsonMenu, "inc/cnc/registro");
  CargarUrl('cuerpo', 'inc/cnc/registro');
}

/**
 * Carga de Módulo Gestión Operativa
 * V 1.0
 */
function CargarGestionOperativa(){
  //Util.DibujarSubMenuEscritorio(JsonMenu, "Gestion Operativa");
  CargarUrl('cuerpo', 'inc/configuracion/oficinas');
}
function CargarGestionOperativasat(){
  //Util.DibujarSubMenuEscritorio(JsonMenu, "Gestion Operativa");
  CargarUrl('cuerpo', 'inc/sat/telegrama');
}

function CargarGestionOperativaTracking(){
  //Util.DibujarSubMenuEscritorio(JsonMenu, "Gestion Operativa");
  CargarUrl('cuerpo', 'inc/tracking/seguimiento');
}
 /**
  * Carga de Módulo Gestión Postal
  */

 function CargarGestionPostal(){
  //Util.DibujarSubMenuEscritorio(JsonMenu, "GestionPostal");
  CargarUrl('cuerpo', 'inc/control/admintaquillas');
}

/**
 * Carga de Módulo Gestión Comercial
 * V 1.0
 */
function CargarGestionComercial(){
  //Util.DibujarSubMenuEscritorio(JsonMenu, "GestionComercial");
  //CargarUrl('cuerpo', 'inc/ventas/apartados');
  CargarUrl('cuerpo', 'inc/escritorio');
}

/**
 * Carga de Módulo Panel
 */
function CargarPanel(){
  Util.DibujarSubMenuEscritorio(JsonMenu, "Panel");
  CargarUrl('cuerpo', 'inc/panel/apicore');
}


function CargarApiCore(){
  console.log('llego');
  CargarUrl('cuerpo', 'inc/panel/apicore');
}

function CargarDriver(){
  CargarUrl('cuerpo', 'inc/panel/drivers');
}