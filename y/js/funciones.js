function pintarRuta(puntoCercano, cordenada1p, cordenada2p){
    return L.Routing.control({
        waypoints: [
            L.latLng(cordenada1p, cordenada2p),
            L.latLng(puntoCercano.coordenada.latitud,puntoCercano.coordenada.longitud)
        ],
        router: L.Routing.graphHopper('d1b897ca-0084-42f9-bbde-3b0c6b677c86', {
            urlParameters: {
                vehicle: 'foot',
            }
        }),
        //draggableWaypoints: false,
        //addWaypoints: false
    })
}
var calculada = function (coordenada, distancia) {
    this.coordenada = coordenada;
    this.distancia = distancia
};

function algoritmo(cordenada1p, cordenada2p, elementos) {

    var cordenadas = elementos;
    var elementoMarcar = [];
    console.log("CACAAAA");
    console.log(cordenadas);
    cordenadas.forEach(element => {
        let lat2 = element.latitud;
        let lon2 = element.longitud;
        let R = 6371; // km
        let dLat = (lat2 - cordenada1p) * Math.PI / 180;
        let dLon = (lon2 - cordenada2p) * Math.PI / 180;
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(cordenada1p * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.asin(Math.sqrt(a));
        var d = R * c;
        if (d < 2.0) {
            calcula = new calculada(element, d);
            elementoMarcar.push(calcula);
        }
        console.log(d);
    });

    return elementoMarcar;
};
        


