/**
 * 
 */
function cuandoListo(){
    //$.support.cors = true;
    //$.mobile.allowCrossDomainPages = true;
    /*if ('withCredentials' in new XMLHttpRequest()){
        alert("CORS XHR");
    }
    else if (typeof XDomainRequest !== "undefined"){
        alert("CORS XDR");
    }
    else{
        alert("No CORS");
    }*/
}

function censo(){    
    var options = {maximumAge: 5000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

function onSuccess(position){   
    var element = document.getElementById("fecha");
    var valores = getParametros();
    sendMessage(getMessage(valores.servidor,valores.puerto,valores.dispositivo,getGPRMC(position)));
    //
}

function getParametros(){
    var parametros = {                               
        servidor: window.localStorage.getItem('servidor').trim(),
        puerto: window.localStorage.getItem('puerto').trim(),
        dispositivo: window.localStorage.getItem('dispositivo').trim(),
        intervalo: window.localStorage.getItem('intervalo').trim()
    };
    return parametros;
}

function onError(error){
    alert ('Algo salio mal '+error.message);
}

function GDaGM(coordenada){
    var grados = 0;
    if (Math.abs(Math.floor(coordenada))>Math.floor(Math.abs(coordenada))){
        grados = Math.floor(Math.abs(coordenada));
        grados = grados - 2*grados;
    }else{
        grados = Math.floor(coordenada);
    }    
    var minutos = Math.floor((Math.abs(coordenada - grados)*60)*1000)/1000;    
    var coord = {
            grado: grados,
            min: minutos
    }
    return coord;
}

function hemisferio(tipo, coord){
    var coordCompleta = {
            grados: coord.grado,
            minutos: coord.min,
            hemisferio: 'E',
            tipo: tipo
    }
    if (tipo == 'long'){
        if (coord.grado > 0)
            coordCompleta.hemisferio = 'W';
        else
            coordCompleta.hemisferio = 'E';
    }else{
        if (coord.grado > 0)
            coordCompleta.hemisferio = 'N';
        else
            coordCompleta.hemisferio = 'S';
    }
    return coordCompleta;
}

function getFecha (time){
    var Tmp = new Date(time);
    var dia = Tmp.getDay();
    var mes = Tmp.getMonth()+1;
    //var year = Tmp.getYear() % 100;
    var year = 2013;
    if (dia < 10)
        dia = '0' + dia;
    if (mes < 10)
        mes = '0'+mes;
    if (year < 10)
        year = '0'+year;
    return year+mes+dia;
    //return '20130624';
}

function SatTime (time){
    var Tmp = new Date(time);
    var hora = Tmp.getHours();
    var min = Tmp.getMinutes();
    var seg = Tmp.getSeconds();
    var mil = Tmp.getMilliseconds();
    if (hora < 10)
        hora = '0'+hora;
    if (min < 10)
        min = '0'+min;
    if (seg < 10)
        seg = '0'+seg;
    if (mil < 100)
        mil = '0'+mil;
    if (mil < 10)
        mil = '0'+mil;
    return hora+min+seg//+'.'+mil;
}

function getVelocidad(speed){
    if (speed)
        return speed;
    else
        return '0.0';          
}

function getHeading(head){
    if (head)
        return head;
    else
        return '0.0';          
}

function getGPRMC(position){
    var cadena = "$GPRMC,";
    cadena = cadena+SatTime(position.timestamp)+',A,';
    var Latitud = hemisferio('lat',GDaGM(position.coords.latitude));
    var Longitud = hemisferio('long',GDaGM(position.coords.longitude));
    cadena = cadena+formateoCoord(1,Latitud.grados)+formateoCoord(1,Latitud.minutos)+','+Latitud.hemisferio+',';
    cadena = cadena+formateoCoord(2,Longitud.grados)+formateoCoord(1,Longitud.minutos)+','+Longitud.hemisferio+',';
    cadena = cadena+getVelocidad(position.coords.speed)+',';
    cadena = cadena+getHeading(position.coords.heading)+',';
    cadena = cadena+getFecha(position.timestamp)+',,*';
    getValNav(Latitud.grados+'°'+Latitud.minutos, Longitud.grados+'°'+Longitud.minutos, getVelocidad(position.coords.heading), getVelocidad(position.coords.speed));
    return cadena;
}

function getCheckSum(cadena){    
    var xor = 0x00;
    for (var i = 0; i < cadena.length; i++){    
        var char = cadena.charCodeAt(i);
        xor = xor^char;
    }    
    return xor.toString(16).toUpperCase();
}

function getTramaGPRMC(cadena){
    var posInicial = cadena.indexOf('$')+1;
    var posFinal = cadena.indexOf('*');
    return cadena.substring(posInicial,posFinal);
}

function getMessage(servidor, puerto, identificador, mensaje){
    return "http://"+servidor+":"+puerto+"/gprmc/Data?id="+identificador+"&code=0xF020&gprmc="+mensaje+getCheckSum(getTramaGPRMC(mensaje));
}

function formateoCoord(tipo, item){
    var grados = item+'';
    var absoluto = Math.abs(item);
    var signo = '';
    if (grados.charAt(0)== '-')
        signo = '-';    
    else
        signo = '';
    grados = absoluto+'';
    if (tipo == 2){ //2 para el caso de los grados de longitud
        if (absoluto < 100)
            grados = '0'+absoluto;
        if (absoluto < 10)
            grados = '0'+absoluto;
    }else{
        if (absoluto < 10)
            grados = '0'+absoluto;
    }
    return signo+grados;
}

function sendMessage(mensaje){
    var request = new XMLHttpRequest();
    request.open('GET', mensaje, true);    
    request.send();
    request.onreadystatechange = function(){        
        if (request.readyState == 4){
            //getRespServ(request.responseText);
            //alert(request.status);
        }
    }
}

function getInformation(position){
    var element = document.getElementById("Latitud");
    var element = document.getElementById("Longitud");
    var element = document.getElementById("Velocidad");
    var element = document.getElementById("Direccion");
    
}
