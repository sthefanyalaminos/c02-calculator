// Global Calculator object for CO2 emissions calculations.
// Provides methods to compute emissions, compare transport modes,
// calculate carbon credits, and estimate credit pricing.
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
    },

    calculateCarbonCredits: function(emissionKg) {
        // Convert kilograms of CO2 into carbon credits.
        // One credit equals KG_PER_CREDIT kg of CO2.
        var credits = emissionKg / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
        return Math.round(credits * 10000) / 10000;
    },

    estimateCreditPrice: function(credits) {
        // Estimate the market value of carbon credits using min/max price ranges.
        // Returns minimum, maximum, and average price in BRL.
        var minPrice = credits * CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        var maxPrice = credits * CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        var averagePrice = (minPrice + maxPrice) / 2;

        return {
            min: Math.round(minPrice * 100) / 100,
            max: Math.round(maxPrice * 100) / 100,
            average: Math.round(averagePrice * 100) / 100
        };
    }
};
