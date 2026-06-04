// Global configuration object for the emissions calculator.
// Includes emission factors, transport mode metadata, carbon credit rules,
// and helper methods for UI initialization.
var CONFIG = {
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    TRANSPORT_MODES: {
        bicycle: {
            label: "Bicicleta",
            icon: "🚴",
            color: "#10b981"
        },
        car: {
            label: "Carro",
            icon: "🚗",
            color: "#059669"
        },
        bus: {
            label: "Ônibus",
            icon: "🚌",
            color: "#3b82f6"
        },
        truck: {
            label: "Caminhão",
            icon: "🚚",
            color: "#f59e0b"
        }
    },

    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50,
        PRICE_MAX_BRL: 150
    },

    populateDatalist: function() {
        var cities = RoutesDB.getAllCities();
        var datalist = document.getElementById("cities-list");

        if (!datalist || !Array.isArray(cities)) {
            return;
        }

        datalist.innerHTML = "";

        cities.forEach(function(city) {
            var option = document.createElement("option");
            option.value = city;
            datalist.appendChild(option);
        });
    },

    setupDistanceAutofill: function() {
        var originInput = document.getElementById("origin");
        var destinationInput = document.getElementById("destination");
        var distanceInput = document.getElementById("distance");
        var manualCheckbox = document.getElementById("manual-distance");
        var helperText = document.querySelector(".calculator-form__helper-text");

        function updateDistance() {
            if (!originInput || !destinationInput || !distanceInput || !helperText) {
                return;
            }

            var origin = originInput.value.trim();
            var destination = destinationInput.value.trim();
            var manualEnabled = manualCheckbox && manualCheckbox.checked;

            if (manualEnabled) {
                distanceInput.readOnly = false;
                helperText.textContent = "Insira a distância manualmente.";
                helperText.style.color = "var(--text-light)";
                return;
            }

            if (origin && destination) {
                var distance = RoutesDB.findDistance(origin, destination);

                if (distance !== null) {
                    distanceInput.value = distance;
                    distanceInput.readOnly = true;
                    helperText.textContent = "Distância preenchida automaticamente.";
                    helperText.style.color = "#10b981";
                    return;
                }
            }

            distanceInput.value = "";
            distanceInput.readOnly = true;
            helperText.textContent = "Distância não encontrada. Marque para inserir manualmente.";
            helperText.style.color = "var(--text-light)";
        }

        if (originInput) {
            originInput.addEventListener("change", updateDistance);
        }

        if (destinationInput) {
            destinationInput.addEventListener("change", updateDistance);
        }

        if (manualCheckbox) {
            manualCheckbox.addEventListener("change", function() {
                if (manualCheckbox.checked) {
                    distanceInput.readOnly = false;
                    helperText.textContent = "Insira a distância manualmente.";
                    helperText.style.color = "var(--text-light)";
                } else {
                    updateDistance();
                }
            });
        }
    }
};
