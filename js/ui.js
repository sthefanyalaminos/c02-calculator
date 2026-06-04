// Global UI helper object for rendering calculator results and managing interface behavior.
// Contains utility methods for formatting and DOM control, plus render methods
// that build HTML strings for results and comparisons.
var UI = {
    formatNumber: function(number, decimals) {
        // Format a number with the given number of decimal places.
        // Use pt-BR locale for thousand separators.
        var value = Number(number);
        var digits = typeof decimals === "number" ? decimals : 0;
        return value.toLocaleString("pt-BR", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        });
    },

    formatCurrency: function(value) {
        // Format a numeric value as Brazilian Real currency.
        return Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    },

    showElement: function(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.classList.remove("hidden");
        }
    },

    hideElement: function(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.classList.add("hidden");
        }
    },

    scrollToElement: function(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    },

    renderResults: function(data) {
        // Build the HTML string for the main result cards.
        // The data object contains origin, destination, distance, emission, mode, and saving.
        var modeMeta = CONFIG.TRANSPORT_MODES[data.mode] || {};
        var savingHtml = "";

        if (data.mode !== "car" && data.saving && data.saving.savedKg > 0) {
            savingHtml = "<div class=\"results_card results_card--saving\">" +
                "<h3 class=\"results_card__title\">Economia estimada</h3>" +
                "<p class=\"results_card__value\">" + this.formatNumber(data.saving.savedKg, 2) + " kg CO₂</p>" +
                "<p class=\"results_card__meta\">" + this.formatNumber(data.saving.percentage, 2) + "% menos que o carro</p>" +
                "</div>";
        }

        return "<div class=\"results_card\">" +
            "<h3 class=\"results_card__title\">Rota</h3>" +
            "<p class=\"results_card__text\">" + data.origin + " → " + data.destination + "</p>" +
            "</div>" +
            "<div class=\"results_card\">" +
            "<h3 class=\"results_card__title\">Distância</h3>" +
            "<p class=\"results_card__text\">" + this.formatNumber(data.distance, 0) + " km</p>" +
            "</div>" +
            "<div class=\"results_card\">" +
            "<h3 class=\"results_card__title\">Emissão</h3>" +
            "<p class=\"results_card__value\">🌿 " + this.formatNumber(data.emission, 2) + " kg CO₂</p>" +
            "</div>" +
            "<div class=\"results_card\">" +
            "<h3 class=\"results_card__title\">Transporte</h3>" +
            "<p class=\"results_card__text\">" + (modeMeta.icon || "") + " " + (modeMeta.label || data.mode) + "</p>" +
            "</div>" +
            savingHtml;
    },

    renderComparision: function(modesArray, selectedMode) {
        // Build a comparison layout for each transport mode.
        // Show badge for the selected mode and a progress bar colored by impact.
        if (!Array.isArray(modesArray) || modesArray.length === 0) {
            return "";
        }

        var maxEmission = modesArray.reduce(function(max, modeItem) {
            return modeItem.emission > max ? modeItem.emission : max;
        }, 0);

        function getProgressColor(percentage) {
            if (percentage <= 25) return "#10b981";
            if (percentage <= 75) return "#fbbf24";
            if (percentage <= 100) return "#f97316";
            return "#ef4444";
        }

        var html = modesArray.map(function(modeItem) {
            var meta = CONFIG.TRANSPORT_MODES[modeItem.mode] || {};
            var selectedClass = modeItem.mode === selectedMode ? " comparision_item--selected" : "";
            var badgeHtml = modeItem.mode === selectedMode ? "<span class=\"comparision_item__badge\">Selecionado</span>" : "";
            var width = maxEmission > 0 ? (modeItem.emission / maxEmission) * 100 : 0;
            var color = getProgressColor(modeItem.percentageVsCar);

            return "<div class=\"comparision_item" + selectedClass + "\">" +
                "<div class=\"comparision_item__header\">" +
                "<span class=\"comparision_item__icon\">" + (meta.icon || "") + "</span>" +
                "<div>" +
                "<h4 class=\"comparision_item__title\">" + (meta.label || modeItem.mode) + "</h4>" +
                "<p class=\"comparision_item__emission\">" + this.formatNumber(modeItem.emission, 2) + " kg CO₂</p>" +
                "</div>" +
                badgeHtml +
                "</div>" +
                "<div class=\"comparision_item__stats\">" +
                "<span>" + this.formatNumber(modeItem.percentageVsCar, 2) + "% do carro</span>" +
                "</div>" +
                "<div class=\"comparision_item__progress-bar\">" +
                "<div class=\"comparision_item__progress-fill\" style=\"width: " + width + "%; background: " + color + ";\"></div>" +
                "</div>" +
                "</div>";
        }, this).join("");

        html += "<div class=\"comparision_tip-box\">" +
            "<p class=\"comparision_tip-box__text\">Escolha o modo mais eficiente para reduzir sua emissão de CO₂. Bicicleta e ônibus costumam ser as melhores opções para viagens curtas e médias.</p>" +
            "</div>";

        return html;
    },

    

    showLoading: function(buttonElement) {
        if (!buttonElement) {
            return;
        }

        buttonElement.dataset.originalText = buttonElement.innerHTML;
        buttonElement.disabled = true;
        buttonElement.innerHTML = "<span class=\"spinner\"></span> Calculando..";
    },

    hideLoading: function(buttonElement) {
        if (!buttonElement) {
            return;
        }

        buttonElement.disabled = false;

        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
            delete buttonElement.dataset.originalText;
        }
    }
};
