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
var dbRef;
var Posicion;
var greenIcon;
var parkIcon;
var botonIdent;
var Npapeleras;

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
  Posicion = L.icon({
    iconUrl: 'images/iconoLugar.png',
    iconSize: [20, 20], // size of the icon
  });
  L.marker([cordenada1p, cordenada2p], {
    icon: Posicion
  }).addTo(mapa).bindPopup("tu actualmente estas en " + cordenada1 + " " + cordenada2);
}

function addbasurasmapa(position) {
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
  greenIcon = L.icon({
    iconUrl: 'images/icono.png',
    iconSize: [20, 20], // size of the icon
  });
  parkIcon = L.icon({
    iconUrl: 'images/dog-park.png',
    iconSize: [20, 20], // size of the icon
  });
  var Posicion = L.icon({
    iconUrl: 'images/iconoLugar.png',
    iconSize: [20, 20], // size of the icon
  });
  if (botonIdent == 'BR') {
    document.getElementById('Mpapeleras').style.display = 'inline';
    document.getElementById('Mpaques').style.display = 'none';
    Datos();

    function Datos() {
      getPapelerasDatabase();

    }
  } else if (botonIdent == 'PK'){
    document.getElementById('Mpaques').style.display = 'inline';
    document.getElementById('Mpapeleras').style.display = 'none';
    buscParques();
    function buscParques() {
      getParquesDatabase();
    }
  }
}

function pintarBas(basuras) {
  var mer = 17.6;
  basuras.forEach(function (basura) {
    L.marker([basura.coordenada.latitud, basura.coordenada.longitud], {
      icon: greenIcon
    }).addTo(mapa).bindPopup("DIRECCIÓN: " + basura.coordenada.direccion + ", BARRIO: " + basura.coordenada.equipo)
    if (basura.distancia < mer) {
      mer = basura.distancia;
      datosPapCercana = basura;
    };
  });

  L.marker([cordenada1p, cordenada2p], {
    icon: Posicion
  }).addTo(mapa).bindPopup("tu actualmente estas en " + cordenada1p + " " + cordenada2p);

}
function pintarPark(parques) {
  var mer = 17.6;
  parques.forEach(function (parque) {
    L.marker([parque.coordenada.latitud, parque.coordenada.longitud], {
      icon: parkIcon
    }).addTo(mapa).bindPopup("DIRECCIÓN: " + parque.coordenada.barrio + ", BARRIO: " + parque.coordenada.zona)
    if (parque.distancia < mer) {
      mer = parque.distancia;
      datosParqueCercano = parque;
    };
  });

  L.marker([cordenada1p, cordenada2p], {
    icon: Posicion
  }).addTo(mapa).bindPopup("tu actualmente estas en " + cordenada1p + " " + cordenada2p);

}

function añadirelemento(codigo) {
  botonIdent = codigo;
  mapa.remove();
  navigator.geolocation.getCurrentPosition(addbasurasmapa)
};


function elementoCercano() {
  if (botonIdent == 'BR'){
  Rutacrear = pintarRuta(datosPapCercana, cordenada1p, cordenada2p);
  Rutacrear.addTo(mapa);
  } else if(botonIdent == 'PK'){
  Rutacrear = pintarRuta(datosParqueCercano, cordenada1p, cordenada2p);
  Rutacrear.addTo(mapa);
  }
  var router = routingControl.getRouter();
}
var objetopap = function (latitud, longitud, direccion, barrio, equipo,tipus) {
  this.latitud = latitud;
  this.longitud = longitud;
  this.direccion = direccion;
  this.barrio = barrio;
  this.equipo = equipo;
  this.tipus = tipus;
}
var objetopark = function (latitud, longitud, barrio, zona) {
  this.latitud = latitud;
  this.longitud = longitud;
  this.barrio = barrio;
  this.zona = zona;
}

function error(msg) {
  var status = document.getElementById('status');
  status.innerHTML = "Error [" + error.code + "]: " + error.message;
}

function getPapelerasDatabase() {
  var databasePapeleras = [];
  dbRef = firebase.database().ref().child("papeleras")
    .once("value").then(snapshot => {
      console.log(snapshot);
      let listamenus = snapshot.val();
      listamenus.forEach(element => {
        var para = document.createElement("p");
        console.log(element);
        for (var key in element) {
          console.log(' name=' + key + ' value=' + element[key]);
        }
        var objetoPapelera = new objetopap(element['Latitud'], element['Longitud'], element['Carrer'], element['Tipus'], element['Barri'], element['Equip'], element['Districte'])
        console.log(objetoPapelera);
        databasePapeleras.push(objetoPapelera);
      });
      console.log(databasePapeleras);
      return databasePapeleras;
    }).then((Npapeleras) => {
      console.log(Npapeleras)
      var basuras = algoritmo(cordenada1p, cordenada2p, Npapeleras);
      pintarBas(basuras);
    });
}
function getParquesDatabase() {
  var databaseParques = [];
  dbRef = firebase.database().ref().child("parques")
    .once("value").then(snapshot => {
      console.log(snapshot);
      let listamenus = snapshot.val();
      listamenus.forEach(element => {
        var para = document.createElement("p");
        console.log(element);

        for (var key in element) {
          console.log(' name=' + key + ' value=' + element[key]);
        }
        var objetoParque = new objetopark(element['Latitud'], element['Longitud'], element['Zona'], element['Barrio'])
        console.log(objetoParque);
        databaseParques.push(objetoParque);
      });
      console.log(databaseParques);
      return databaseParques;
    }).then((Nparques) => {
      console.log(Nparques)
      var parques = algoritmo(cordenada1p, cordenada2p, Nparques);
      pintarPark(parques);
    });
}