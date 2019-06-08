function pintarRutaPapelera(puntoCercano, cordenada1p, cordenada2p){
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
        draggableWaypoints: false,
        addWaypoints: false
    })
}
var calculada = function (coordenada, distancia) {
    this.coordenada = coordenada;
    this.distancia = distancia
};
function algoritmo(cordenada1p, cordenada2p) {

    var cordenadas = papeleras;
    var papelerasMarcar = [];
    var cercania;
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
            calcula = new calculada(cordenadas[i], d);
            papelerasMarcar.push(calcula);
        }
        console.log(d);
    }

    return papelerasMarcar;
}


