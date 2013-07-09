var ancho = 0;
var alto = 0;
var ini = 0;
var final = 0;
var proceso = 0;

function inicio(){      
    ancho = window.innerWidth;
    alto = window.innerHeight;    
    ini = {x: (ancho/8), y: (alto/8)};
    final = {x: (ancho - 2 * ini.x), y: (alto - 2 * ini.y)};
    document.getElementById("principal").style.width = ancho+'px';
    document.getElementById("principal").style.height = alto+'px';    
    document.getElementById("popUp").style.left = ini.x+'px';
    document.getElementById("popUp").style.top = ini.y+'px';
    document.addEventListener("deviceready", cuandoListo, true);
}

function setForm(pagina){    
    pantallaEmergente(pagina, 1);            
}

function setInicio(pagina){
    if (validaParam()){
        var valores = getParametros();
        var intervalo = valores.intervalo*1000;
        pantallaEmergente(pagina, 1);
        proceso = setInterval("censo()", intervalo);        
    }
}

function paginaConf(){
    var servidor = '';
    var puerto = '';
    var dispositivo = '';
    var intervalo = '';    
        if (validaParam()){
            servidor = window.localStorage.getItem('servidor').trim();
            puerto = window.localStorage.getItem('puerto').trim();
            dispositivo = window.localStorage.getItem('dispositivo').trim();
            intervalo = window.localStorage.getItem('intervalo').trim();
        }        
        return "<div class='content'><table id='TablaConf' class='tablas'>\
              <tr>\
                    <td>SERVIDOR</td>\
                    <td>\
                    <input type='text' name='servidor' id='servidor' value = "+servidor+"></td>\
              </tr>\
                  <tr>\
                    <td>PUERTO</td>\
                    <td>\
                    <input type='text' name='puerto' id='puerto' value = "+puerto+"></td>\
              </tr>\
              <tr>\
                    <td>NOMBRE DEL DISPOSITIVO</td>\
                    <td>\
                    <input type='text' name='dispositivo' id='dispositivo' value = "+dispositivo+"></td>\
              </tr>\
              <tr>\
                    <td>REPORTAR CADA: (SEG.)</td>\
                    <td>\
                    <input type='text' name='intervalo' id='intervalo' value = "+intervalo+"></td>\
              </tr>\
              <tr>\
                    <td colspan=2>\
                        <input type='button' value='GUARDAR' onclick='guardar()'>\
                        <input type='button' value='CANCELAR' onclick='cancelar()'></td>\
              </tr>\
            </table></div>";        
}

function paginaSeg(){    
    return "<div id='page3' class='content'>\
  <div id='header'>\
		<h1>INICIO</h1>\
	</div>\
	<div class='content'>\
	    <p><strong>VALORES DE NAVEGACIO</strong>N</p>\
	    <p>&nbsp;</p>\
	    <table id = 'tablaSeg' class='content'>\
	      <tr>\
	        <td>LATITUD</td>\
	        <td>\
            <input type='text' name='001' id='txtlatitud'></td>\
          </tr>\
	      <tr>\
	        <td>LONGITUD</td>\
	        <td>\
            <input type='text' name='0022' id='txtlogitud'></td>\
          </tr>\
	      <tr>\
	        <td>DIRECCION</td>\
	        <td>\
            <input type='text' name='0032' id='txtdireccion'></td>\
          </tr>\
	  <tr>\
	        <td>VELOCIDAD</td>\
	        <td>\
                <input type='text' name='0042' id='txtvelocidad'></td>\
          </tr>\
          <!--<tr>\
                <td>REPUESTA DE SERVIDOR</td>\
                <td>\
                <input type='text' name='0042' id='txtrespuesta'></td>\
          </tr>-->\
          <tr>\
                <td colspan='2' align='center'><p><input type='submit' value='PARAR' onclick='detener()'></p><td>\
          </tr>\
        </table>\
	</div>\
	<div id='footer' class='content'>\
		<h4>iw)</h4>\
	</div>\
</div>";
}

function ayuda(){
    return "<div id='ayuda' class='content'>\
	<div id='header'>\
		<h1>AYUDA	</h1>\
	</div>\
	<div class='content'>\
	  <p align='justify'>EL SISTEMA DE SEGUIMIENTO ES UNA HERRAIENTA DE GEOLOCALIZACION DE DISPOSITIVOS ELECTRONICOS.</p>\
	  <p align='justify'>PARA EL BUEN FUNCIONAMIENTO DEL SISTEMA ES NECESARIO CONFIGURAR LOS SIGUIENTES PARAMENTROS</p>\
	  <p align='justify'>SERVIDOR: SE REFIERE A LA DIRECCION ELECTRONICA DEL SERVIDOR CENTRAL DE MONITOREO, LA CUAL SERA PROPORCIONADA POR EL GRUPO DE INFORMATICA.</p>\
	  <p align='justify'>PUERTO SE REFIERE AL NUMERO DE PUERTO CONFIGURADO POR LOS ADMINISTRADORES CUAL SERA PROPORCIONADO POR EL GRUPO DE INFORMATICA.</p>\
	  <p align='justify'>NOMBRE DEL DISPOSITIVO ES EL PARAMETRO CON EL CUAL LOS ADMINISTRADORES IDENTIFICAN EN EL MONITOREO CENTRAL EL DISPOSITIVO POR SEGUIR Y DISTINGUIRLO DE OTROS</p>\
          <p align='center'><input type='button' value='REGRESAR' onclick='cancelar()'</p>\
	</div>\
	<div ='footer' class='content'>\
		<h4>iw)</h4>\
	</div>\
</div>";
}

function cancelar(){
    pantallaEmergente("", 0);
}

function detener(){
    clearInterval(proceso);
    cancelar();
}

function guardar(){
    var servidor = document.getElementById("servidor").value.trim();
    var puerto = document.getElementById("puerto").value.trim();
    var dispositivo = document.getElementById("dispositivo").value.trim();    
    var intervalo = document.getElementById("intervalo").value.trim();
    if (dispositivo!=='' && servidor!=='' && puerto!==''){
        window.localStorage.setItem("servidor",servidor);
        window.localStorage.setItem("puerto",puerto);
        window.localStorage.setItem("dispositivo",dispositivo);
        window.localStorage.setItem("intervalo",intervalo);
        cancelar();
    }
    else{
        alert("Debe proporcionar toda la informaciÃ³n que se solicita");
    }
        
}

function setNegra(){
    document.getElementById("pantallaNegra").style.width = ancho+'px';
    document.getElementById("pantallaNegra").style.height = alto+'px';
}

function unsetNegra(){
    document.getElementById("pantallaNegra").style.width = ancho+'px';
    document.getElementById("pantallaNegra").style.height = alto+'px';
}

function setPop(){    
    document.getElementById("popUp").style.width = final.x+'px';
    document.getElementById("popUp").style.height = final.y+'px';    
}

function unsetPop(){
    document.getElementById("popUp").style.width = '0px';
    document.getElementById("popUp").style.height = '0px';
}

function pantallaEmergente(pantalla, zind){
    if (zind===1){        
        document.getElementById("popUp").style.zIndex = '2';
        document.getElementById("principal").style.zIndex = '-1';    
        document.getElementById("pantallaNegra").style.zIndex = '1';
        setNegra();
        setPop();
        document.getElementById("popUp").innerHTML = pantalla;        
    }else{
        document.getElementById("popUp").style.zIndex = '1';
        document.getElementById("principal").style.zIndex = '2';    
        document.getElementById("pantallaNegra").style.zIndex = '0'; 
        unsetNegra();
        unsetPop();
        document.getElementById("popUp").innerHTML = "";
    }
}

function validaParam(){
    if (window.localStorage.getItem("servidor"))
        return true;    
    else
        return false;
}

function getValNav(latitud, longitud, direccion, velocidad){
    document.getElementById("txtlatitud").value = latitud;
    document.getElementById("txtlogitud").value = longitud;
    document.getElementById("txtdireccion").value = direccion;
    document.getElementById("txtvelocidad").value = velocidad;
}

function getRespServ(resp){
    document.getElementById("txtrespuesta").value = resp;  
}
