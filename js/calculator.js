// Global Calculator object for CO2 emissions calculations.
// Provides methods to compute emissions and compare transport modes.
var Calculator = {
    calculateEmission: function(distanceKm, transportMode) {
        // Get the emission factor (kg CO2 per km) for the specified transport mode.
        // Multiply distance by the emission factor to get total CO2 in kg.
        var emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];

        if (emissionFactor === undefined) {
            return 0;
        }

        var emission = distanceKm * emissionFactor;
        return Math.round(emission * 100) / 100;
    },

    calculateAllModes: function(distanceKm) {
        // Calculate emissions for all transport modes and compare each to car baseline.
        // Car is used as the reference standard (100%).
        var results = [];
        var carEmission = this.calculateEmission(distanceKm, "car");

        for (var mode in CONFIG.EMISSION_FACTORS) {
            if (CONFIG.EMISSION_FACTORS.hasOwnProperty(mode)) {
                var emission = this.calculateEmission(distanceKm, mode);
                var percentageVsCar = carEmission > 0 ? (emission / carEmission) * 100 : 0;

                results.push({
                    mode: mode,
                    emission: emission,
                    percentageVsCar: Math.round(percentageVsCar * 100) / 100
                });
            }
        }

        // Sort results by emission amount (lowest first).
        results.sort(function(a, b) {
            return a.emission - b.emission;
        });

        return results;
    },

    calculateSavings: function(emission, baselineEmission) {
        // Calculate how much CO2 is saved compared to the baseline (usually car).
        // Also calculate the percentage reduction.
        var savedKg = baselineEmission - emission;
        var percentage = baselineEmission > 0 ? (savedKg / baselineEmission) * 100 : 0;

        return {
            savedKg: Math.round(savedKg * 100) / 100,
            percentage: Math.round(percentage * 100) / 100
        };
    }
};
