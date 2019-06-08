function initCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        showError("Your browser does not support Geolocation!");
    }
}

initCoords();
var cordenada1 = 39.568855;
var cordenada2 = 2.66745;
var coords;
var mapa;
var capaOSM;
var capaRelieve;
var datosPapCercana;
var cordenada1p;
var cordenada2p;
function success(position) {
    coords = position.coords;
    cordenada1p = position.coords.latitude;
    cordenada2p = position.coords.longitude;
    console.log(cordenada1p + " " + cordenada2p);
    mapa = new L.map('mapid', {
        center: [cordenada1p, cordenada2p],
        zoom: 24

    });

    capaOSM = new L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png');
    capaRelieve = new L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg');

    capaRelieve.addTo(mapa);
    capaOSM.addTo(mapa);

    var capasBase = {
        "Relieve": capaRelieve,
        "OpenStreetMap": capaOSM
    };

    var selectorCapas = new L.control.layers(capasBase);
    selectorCapas.addTo(mapa);

    var greenIcon = L.icon({
        iconUrl: 'images/icono.png',

        iconSize: [20, 20], // size of the icon
    });
    var Posicion = L.icon({
        iconUrl: 'images/iconoLugar.png',
        iconSize: [20, 20], // size of the icon
    });
    L.marker([cordenada1p, cordenada2p], {
        icon: Posicion
    }).addTo(mapa).bindPopup("tu actualmente estas en " + cordenada1 + " " + cordenada2);

}

function addbasurasmapa(position) {
    coords = position.coords;
    var cordenada1p = position.coords.latitude;
    var cordenada2p = position.coords.longitude;
    console.log(cordenada1p + " " + cordenada2p);
    mapa = new L.map('mapid', {
        center: [cordenada1p, cordenada2p],
        zoom: 24

    });

    capaOSM = new L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png');
    capaRelieve = new L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg');

    capaRelieve.addTo(mapa);
    capaOSM.addTo(mapa);

    var capasBase = {
        "Relieve": capaRelieve,
        "OpenStreetMap": capaOSM
    };
    var mer =17.6;

    var selectorCapas = new L.control.layers(capasBase);
    selectorCapas.addTo(mapa);
    var Posicion = L.icon({
        iconUrl: 'images/iconoLugar.png',
        iconSize: [20, 20], // size of the icon
    });
    var greenIcon = L.icon({
        iconUrl: 'images/icono.png',

        iconSize: [20, 20], // size of the icon
    });
    var basuras = algoritmo(coords.latitude, coords.longitude);
    basuras.forEach(function (basura) {
        L.marker([basura.coordenada.latitud, basura.coordenada.longitud], {
            icon: greenIcon
        }).addTo(mapa);//Aqui faltan cosas cuando tengamos funcionamineto por BD
        if (basura.distancia < mer){
            mer = basura.distancia;
            datosPapCercana = basura;
        };
    });
   
    L.marker([cordenada1p, cordenada2p], {
        icon: Posicion
    }).addTo(mapa).bindPopup("tu actualmente estas en " + cordenada1 + " " + cordenada2);
}

function añadirBasuras() {
    mapa.remove();
    navigator.geolocation.getCurrentPosition(addbasurasmapa)
};


function papeleraCercana() {
  Rutacrear= pintarRutaPapelera(datosPapCercana, cordenada1p, cordenada2p);
  Rutacrear.addTo(mapa);
 var router = routingControl.getRouter();
}



function error(msg) {
    var status = document.getElementById('status');
    status.innerHTML = "Error [" + error.code + "]: " + error.message;
}


// latitud 1k = 0,000009
//