/**
 * Clase: Utilidades del sistema
 * Referencia: General
 * Autor: Carlos Peña
 * Fecha: 27-11-2020
 * @gesaodin
 */
class Utilidad{
    constructor(){
      

     
    }
    /**
     * 
     * @param {*} mensaje string contenido 
     * @param {*} clase  string bg-danger, bg-info, bg-success, bg-warning
     * @param {*} titulo string
     * @param {*} subtitulo string
     */
    Mensaje(mensaje, clase, titulo, subtitulo){
          $(document).Toasts('create', {
            class: clase, 
            title: titulo,
            autohide: true,
            delay: 2500,
            subtitle: subtitulo,
            body: mensaje,
            icon: 'warning',
            position: 'bottomRight'
          })
       
    }

    ProcesoExitoso(mensaje){
        Toast.fire({
            icon: 'success',
            title: mensaje

        })
    }
  
    CrearBotonCancelar(){
        return `<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>`
    }

    CrearBotonAccion(accion, clase){
        return `<button type="button" class="btn ${accion}" onclick="${accion}()">Guardar</button>`;
    }
    /**Cargar Objeto Json Menu */
    CargarJsonMenu(){
        var e = sessionStorage.getItem("ipostel");
        
        var s = e.split(".");
        var MenuJS = JSON.parse(atob(s[1]));
        JsonMenu = MenuJS.Usuario;
        JsonMenu.Aplicacion.forEach(e => {
          if ( e.id === _ID_APP ){
            _Aplicacion = e;
            $("#titulo").html(e.nombre);
          }
        });
    }
    /**
     * 
     * @param {*} Mnu  Json Menu
     */
    DibujarEscritorio(){
      var cadena = `
      <div class="container-fluid">
        <div class="row">`;
        if (_Aplicacion.Rol.Menu != undefined){
          var i = 0;
          _Aplicacion.Rol.Menu.forEach(v => {

            var acc = `<a href="#" class="small-box-footer" onClick="${v.accion}">&nbsp;</i></a>`;
            if ( v.SubMenu.length > 0) 
              acc = `<a href="#" class="small-box-footer" onClick="Util.DibujarSubMenuEscritorio(${i})">&nbsp;</i></a>`;

            cadena += `<div class="col-lg-3 col-6">
            <div class="small-box ${v.color}">
              <div class="inner">
                <h3>280</h3>
                <p>${v.descripcion}</p>
              </div>
              <div class="icon">
                <i class="${v.icono}"></i>
              </div>
              ${acc}
            </div>
          </div>`;


            

          });
          cadena += `</div></div>`
          $('#cuerpo').html(cadena);
        }else{
          console.log("No existen menus asociados a las cuentas.");
        }  
    }

    /**
     * 
     * @param {*} Mnu 
     * @param {*} nombre 
     */
    DibujarSubMenuEscritorio(Mnu, nombre){
      var cadena = `<div class="row">`;
      Mnu.Perfil.Menu.forEach(v => {
        if(v.nombre == nombre){
          if(v.SubMenu != undefined){
            v.SubMenu.forEach(valor => {
              cadena += `<div class="col-lg-3 col-6 ${valor.clase} ">
                <div class="info-box" onclick="${valor.accion}">
                  <span class="info-box-icon ${valor.color}"><i class="${valor.icono}"></i></span>
                  <div class="info-box-content">
                    <span class="info-box-text">${valor.nombre}</span>
                  </div>
                </div>            
              </div>`;
            })
          }
        }
      });
      cadena += `</row>`;
      $('#cuerpo').html(cadena);
    }
    /**
     * 
     * @param {*} Mnu 
     * @param {*} nombre 
     * @param {*} submenu 
     */
    DibujarSubMenuSubMenuEscritorio(Mnu, nombre, submenu){
      var cadena = `<div class="row">`;
      Mnu.Perfil.Menu.forEach(v => {
        
        if(v.nombre == nombre){
          if(v.SubMenu != undefined){
            v.SubMenu.forEach(valor => {
              
              if(valor.nombre == submenu){
                console.log(valor.nombre, submenu);
                console.log(valor);
                if( valor.SubMenu != undefined ){
                  valor.SubMenu.forEach(e => {
                    cadena += `<div class="col-lg-3 col-6 ${e.clase} ">
                    <div class="info-box" onclick="${e.accion}">
                      <span class="info-box-icon ${e.color}"><i class="${e.icono}"></i></span>
                      <div class="info-box-content">
                        <span class="info-box-text">${e.nombre}</span>
                      </div>
                    </div>            
                  </div>`;
                  });
                }
              }
            })
          }
        }
      });
      cadena += `</row>`;
      $('#cuerpo').html(cadena);
    }

    DibujarMenuLateral(){
        var cadena = '';
        var submenu = '';
        console.log(_Aplicacion)
        if (_Aplicacion.Rol.Menu != undefined){
          
          _Aplicacion.Rol.Menu.forEach(v => {
            cadena += `<li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon ${v.icono}"></i>
              <p>
                ${v.nombre}
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>`;


            submenu = "";
            if (v.SubMenu != undefined){
              submenu += `<ul class="nav nav-treeview">`
              v.SubMenu.forEach(vx => {
                submenu += `<li class="nav-item">
                <a href="#" class="nav-link" onclick="${vx.accion}">
                  <i class="${vx.icono} nav-icon"></i>
                  <p>${vx.nombre}</p>
                </a>
              </li>`
              })
              submenu += `</ul>`;

            }

          });
          cadena += submenu + `</li>`
          $('#NavMenu').html(cadena);
        }else{
          console.log("No existen menus asociados a las cuentas.");
        }
        //verificarPrivilegioUsuario(Mnu);
    }
    /**
     * 
     * @param {*} cmb ComboBox para llenar automaticamente
     */
    CargarOficinas (idcmb){
        var ofc = JSON.parse(localStorage.getItem("Oficinas"));
        
        var cnt = ofc.length;
        $("#" + idcmb).html("<option value='-'>SELECCIONE</option>");
        for(var i=0; i < cnt; i++){
            var ofi = ofc[i]
            $("#" + idcmb).append(`<option value='${ofi.of_Codigo}'>${ ofi.of_Descripcion}</option>` );
        }
       
    }
    /**
     * 
     * @param {*} cmb ComboBox para llenar automaticamente
     */
    CargarTiposServicios (idcmb){
      var srv = JSON.parse(localStorage.getItem("TipoServicios"));
      
      var cnt = srv.length;
      $("#" + idcmb).html("<option value='-'>SELECCIONE</option>");
      for(var i=0; i < cnt; i++){
          var serv = srv[i]
          $("#" + idcmb).append(`<option value='${serv.se_Codigo}'>${ serv.se_Descripcion}</option>` );
      }
     
  }
}

function verificarPrivilegioUsuario(Usuario){
    $.each(Usuario.Perfil.Privilegios, function (privilegio) {
        switch (this.nombre){
            case "configuracion.salvar":
                $(".prvsalvar").attr("disabled",false);
                $(".prvsalvar").removeClass('hide');
                break;
            case "configuracion.modificar":
                $(".prvmodificar").attr("disabled",false);
                $(".prvmodificar").removeClass('hide');
                break;
                 
            case "configuracion.reporte":
                  $(".prvreporte").attr("disabled",false);
                  $(".prvreporte").removeClass('hide');
                  break;
            case "configuracion.carnet":
                $(".prvcarnet").attr("disabled",false);
                $(".prvcarnet").removeClass('hide');
                break;
            case "configuracion.constancia":
                $(".prvcontancia").attr("disabled",false);
                $(".prvcontancia").removeClass('hide');
                break;
            

        }
    })
}
