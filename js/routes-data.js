// Global route database for the C02 emissions calculator.
// The object contains a list of predefined route distances and helper methods
// to retrieve available cities and lookup distances between two locations.
var RoutesDB = {
    routes: [
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1134 },
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1630 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2730 },
        { origin: "São Paulo, SP", destination: "Florianópolis, SC", distanceKm: 699 },
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 109 },
        { origin: "Fortaleza, CE", destination: "Recife, PE", distanceKm: 803 },
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 540 },
        { origin: "Manaus, AM", destination: "Belém, PA", distanceKm: 1633 },
        { origin: "Porto Alegre, RS", destination: "Florianópolis, SC", distanceKm: 473 },
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Recife, PE", destination: "Natal, RN", distanceKm: 291 },
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 800 },
        { origin: "Belo Horizonte, MG", destination: "Uberlândia, MG", distanceKm: 540 },
        { origin: "Rio de Janeiro, RJ", destination: "Vitória, ES", distanceKm: 520 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "Cuiabá, MT", destination: "Campo Grande, MS", distanceKm: 705 },
        { origin: "Brasília, DF", destination: "Salvador, BA", distanceKm: 1340 },
        { origin: "Belém, PA", destination: "Fortaleza, CE", distanceKm: 2130 },
        { origin: "Natal, RN", destination: "João Pessoa, PB", distanceKm: 185 },
        { origin: "João Pessoa, PB", destination: "Recife, PE", distanceKm: 120 },
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 710 },
        { origin: "Vitória, ES", destination: "Belo Horizonte, MG", distanceKm: 516 },
        { origin: "João Pessoa, PB", destination: "Salvador, BA", distanceKm: 975 },
        { origin: "Manaus, AM", destination: "Brasília, DF", distanceKm: 2450 },
        { origin: "Recife, PE", destination: "Belo Horizonte, MG", distanceKm: 1450 },
        { origin: "São Paulo, SP", destination: "Vitória, ES", distanceKm: 555 },
        { origin: "Salvador, BA", destination: "Belo Horizonte, MG", distanceKm: 1180 }
    ],

    getAllCities: function() {
        // Return a unique sorted array of all cities present in the routes list.
        var cities = this.routes.reduce(function(list, route) {
            list.push(route.origin, route.destination);
            return list;
        }, []);

        var uniqueCities = Array.from(new Set(cities));
        return uniqueCities.sort(function(a, b) {
            return a.localeCompare(b, 'pt-BR');
        });
    },

    findDistance: function(origin, destination) {
        // Normalize input values for case-insensitive comparison.
        var normalizedOrigin = origin.trim().toLowerCase();
        var normalizedDestination = destination.trim().toLowerCase();

        for (var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            var routeOrigin = route.origin.toLowerCase();
            var routeDestination = route.destination.toLowerCase();

            if ((routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) ||
                (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin)) {
                return route.distanceKm;
            }
        }

        return null;
    }
};
