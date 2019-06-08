
function success(position) {
    var cordenada1p = position.coords.latitude;
    var cordenada2p = position.coords.longitude;
    var mapa = new L.map('mapid', {
        center: [cordenada1p, cordenada2p],
        zoom: 17
    });


    var capaOSM = new L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png');
    var capaRelieve = new L.tileLayer('http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg');

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


    function algoritmo(cordenada1p, cordenada2p) {
        let cordenadas = datos.papeleras();
        var mer = 17.6;
        for (var i = 0; i < cordenadas.length; i++) {
            let lat2 = cordenadas[i].latitud;
            let lon2 = cordenadas[i].longitud;
            let R = 6371; // km
            let dLat = (lat2 - cordenada1p) * Math.PI / 180;
            let dLon = (lon2 - cordenada2p) * Math.PI / 180;
            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(cordenada1p * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            let c = 2 * Math.asin(Math.sqrt(a));
            var d = R * c;
            if (d < 28.65) {
                L.marker([lat2, lon2], {
                    icon: greenIcon
                }).addTo(mapa).bindPopup("tu actualmente estas en " + lat2 + " " + lon2);
                if (d < mer) {
                    mer = d
                    cercania = cordenadas[i]
                }
            }

            console.log(d);
        }
    }

    algoritmo(cordenada1p, cordenada2p);


    L.marker([cordenada1p, cordenada2p], {
        icon: Posicion
    }).addTo(mapa).bindPopup("tu actualmente estas en " + cordenada1 + " " + cordenada2);

    function calcularRuta(puntoCercano) {
        return L.Routing.control({
            waypoints: [
                L.latLng(cordenada1p, cordenada2p),
                L.latLng(cercania.latitud, cercania.longitud)
            ],
            router: L.Routing.graphHopper('d1b897ca-0084-42f9-bbde-3b0c6b677c86', {
                urlParameters: {
                    vehicle: 'foot',
                }
            }),
            draggableWaypoints: false,
            addWaypoints: false
        })
    }

    var routingControl = L.Routing.control({
        waypoints: [
            L.latLng(cordenada1p, cordenada2p),
            L.latLng(cercania.latitud, cercania.longitud)
        ],
        router: L.Routing.graphHopper('d1b897ca-0084-42f9-bbde-3b0c6b677c86', {
            urlParameters: {
                vehicle: 'foot',
            }
        }),
        draggableWaypoints: false,
        addWaypoints: false


    }).addTo(mapa);

    var router = routingControl.getRouter();

    function error(msg) {
        var status = document.getElementById('status');
        status.innerHTML = "Error [" + error.code + "]: " + error.message;
    }
}

// latitud 1k = 0,000009
//