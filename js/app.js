// App initialization and event handling for the CO2 calculator.
// Sets up the UI, binds form submission, and renders calculated results.
(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Populate the city autocomplete list and enable distance autofill.
        CONFIG.populateDatalist();
        CONFIG.setupDistanceAutofill();

        var calculatorForm = document.getElementById("calculator-form");
        console.log("Calculadora inicializada!");

        if (!calculatorForm) {
            console.error("Formulário de calculadora não encontrado.");
            return;
        }

        calculatorForm.addEventListener("submit", function(event) {
            event.preventDefault();

            var originInput = document.getElementById("origin");
            var destinationInput = document.getElementById("destination");
            var distanceInput = document.getElementById("distance");
            var selectedTransport = document.querySelector("input[name=\"transport\"]:checked");
            var submitButton = calculatorForm.querySelector("button[type=submit]");

            var origin = originInput ? originInput.value.trim() : "";
            var destination = destinationInput ? destinationInput.value.trim() : "";
            var distance = distanceInput ? parseFloat(distanceInput.value) : NaN;
            var transportMode = selectedTransport ? selectedTransport.value : "";

            if (!origin || !destination || !transportMode || isNaN(distance) || distance <= 0) {
                alert("Por favor, preencha origem, destino e distância válida antes de calcular.");
                return;
            }

            UI.showLoading(submitButton);
            UI.hideElement("results");
            UI.hideElement("comparison");
            UI.hideElement("carbon-credits");

            setTimeout(function() {
                try {
                    var emission = Calculator.calculateEmission(distance, transportMode);
                    var carBaselineEmission = Calculator.calculateEmission(distance, "car");
                    var savings = Calculator.calculateSavings(emission, carBaselineEmission);
                    var comparisonModes = Calculator.calculateAllModes(distance);
                    var credits = Calculator.calculateCarbonCredits(emission);
                    var priceEstimate = Calculator.estimateCreditPrice(credits);

                    var resultData = {
                        origin: origin,
                        destination: destination,
                        distance: distance,
                        emission: emission,
                        mode: transportMode,
                        saving: savings
                    };

                    var creditData = {
                        credits: credits,
                        price: priceEstimate
                    };

                    var resultsContainer = document.getElementById("results-content");
                    var comparisonContainer = document.getElementById("comparison-content");
                    var carbonCreditsContainer = document.getElementById("carbon-credits-content");

                    if (resultsContainer) {
                        resultsContainer.innerHTML = UI.renderResults(resultData);
                    }

                    if (comparisonContainer) {
                        comparisonContainer.innerHTML = UI.renderComparision(comparisonModes, transportMode);
                    }

                    if (carbonCreditsContainer) {
                        carbonCreditsContainer.innerHTML = UI.renderCarbonCredits(creditData);
                    }

                    UI.showElement("results");
                    UI.showElement("comparison");
                    UI.showElement("carbon-credits");
                    UI.scrollToElement("results");
                } catch (error) {
                    console.error("Erro durante o cálculo:", error);
                    alert("Ocorreu um erro ao processar a solicitação. Tente novamente.");
                } finally {
                    UI.hideLoading(submitButton);
                }
            }, 1500);
        });
    });
})();
