import "./types.js";
import WeatherApiService from "./weather-service.js";

const locationInput = document.querySelector("#location-input");
const weatherCard = document.querySelector(".weather-card");
const dataFields = {
    locationName: weatherCard.querySelector(".location-name"),
    temperature: weatherCard.querySelector(".temperature"),
    minium: weatherCard.querySelector(".minium"),
    maximum: weatherCard.querySelector(".maximum"),
    feelsLike: weatherCard.querySelector(".feels-like")
};
const weatherApiService = new WeatherApiService();
const cssModifiers = Object.freeze({
    noData: "no-data",
    withError: "with-error",
    hot: "hot",
    cold: "cold"
});
let locationSearchTimeout;

/**
 * Adds the degree symbol to any given string
 * @param {string} string The target string
 * @returns The string with the degree symbol
 */
function addDegreeSymbol(string) {
    return `${string}<i>°</i>`;
}

/**
 * Adds a reference to any given value
 * @param {string} reference The reference
 * @param {string} value The value
 * @returns The reference followed by the value
 */
function addReference(reference, value) {
    return `<span>${reference}:</span> ${value}`;
}

/**
 * Sets the weather card values
 * @param {LocationWeather} data
 */
function setCardValues(data) {
    const { temp, temp_min, temp_max, feels_like } = data.main;
    const { noData, hot, cold } = cssModifiers;

    dataFields.locationName.innerHTML = `${data.name}, ${data.sys.country}`;
    dataFields.temperature.innerHTML = addDegreeSymbol(temp);
    dataFields.minium.innerHTML = addReference("Minium", addDegreeSymbol(temp_min));
    dataFields.maximum.innerHTML = addReference("Maximum", addDegreeSymbol(temp_max));
    dataFields.feelsLike.innerHTML = addReference("Feels like", addDegreeSymbol(feels_like));

    weatherCard.classList.remove(noData);

    if (temp > 28) {
        weatherCard.classList.remove(cold);
        weatherCard.classList.add(hot);
    }

    if (temp < 18) {
        weatherCard.classList.remove(hot);
        weatherCard.classList.add(cold);
    }
}

/**
 * Handles the location input change using a debounce to avoid useless API queries
 * @param {Event} e The event
 */
function handleLocationChange(e) {
    clearTimeout(locationSearchTimeout);

    locationSearchTimeout = setTimeout(async () => {
        const data = await weatherApiService.getSingleLocationWeather(e.target.value);

        weatherCard.classList.remove(cssModifiers.noData);

        if (data && data.cod === 200) setCardValues(data);
        else weatherCard.classList.add(cssModifiers.withError);
    }, 250);
}

/**
 * Initializes the app
 */
function init() {
    locationInput.addEventListener("keyup", handleLocationChange);
}

init();
