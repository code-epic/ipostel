/**
 * Desarrollado por Carlos Peña
 * Version 1.0.1
 * @gesaodin
 * Clase de conexion
 */
let _url = new URL(document.URL);
let _ID_APP = "IP-001";

class Conexion{
    constructor(){
        this.IP = _url.hostname;
        this.Puerto = ":443";
        this.PuertoSSL = ":80";
        this.API = "/v1/api/";
        this.URL = "https://" + this.IP + this.PuertoSSL + this.API;
        this.URLIMG = "/imagenes/";
        this.URLTEMP = _url.hostname + "/v1/temp/";
        this.URLSEC = "https://" + this.IP + this.PuertoSSL;
    }
}

/**
 * Permite cargar y hacer consultas a las API del bus.
 * @param {array} options | sURL, metodo, Objeto, valores
 */
function CargarAPI(options){
    var xhttp = new XMLHttpRequest();
    xhttp.open(options.metodo, options.sURL);
    
    xhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('ipostel'));
    var promise = new Promise(function(resolve, reject) {
        xhttp.addEventListener('readystatechange', function() {
            
            if ( xhttp.readyState === 4 && xhttp.status === 200) {
                if(options.Objeto != undefined){
                    options.Objeto = JSON.parse(xhttp.responseText);
                }
                
                    resolve(xhttp);  
               
            }
            if( xhttp.status === 401){
                if ( xhttp.responseText != "" ) {
                    respuesta = JSON.parse(xhttp.responseText);
                    //$.notify(respuesta.msj);
                }
            }
        });
        
        xhttp.addEventListener('error', function() {
            if ( xhttp.responseText != "" ) {
                respuesta = JSON.parse(xhttp.responseText);
                if (respuesta.tipo != 0){
                    //$.notify("Se ha Insertado correctamente", "success");
                }else{
                    alert(xhttp.responseText);
                }
            }
            reject(xhttp);
        });
    });
    
    if(options.valores != undefined){
        xhttp.send(JSON.stringify(options.valores));
    }else{
        xhttp.send();
    }

    return promise;
}
    

/**
 * Cargar archivos html
 * @param {string} id  
 * @param {string} url | HTML 
 */
function CargarUrl(id, url){
    console.log("prueba");
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url + '.html');
    console.log('GET', url + '.html');
    var promise = new Promise(function(resolve, reject) { 
        console.log("llego Carga");
        xhttp.onreadystatechange = function() {

            console.log("llego Carga1");
            if (this.readyState == 4 && this.status == 200) {
                console.log("llego Carga2");
                $('#'+id).html(xhttp.responseText);
                console.log(id);
                console.log("llego Carga2.1");
            }else if (this.readyState == 4 && this.status == 404){
                console.log("llego Carga3");
                Util.Mensaje(
                    `El archivo ${url} no ha sido encontrado`, 
                    'bg-danger',
                    'Cargar Url',
                    'ipostel-core'
                );
                
            }
            resolve(xhttp);
        };
        xhttp.onerror = function() {
            
            if (this.readyState == 4 && this.status == 0) {
                Util.Mensaje(`El archivo ${url} no ha sido encontrado`, 'danger');
            }
            reject(xhttp);
    
        };

    })

    
    xhttp.send();
}