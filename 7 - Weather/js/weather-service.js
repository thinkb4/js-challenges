import { env } from "./environment.js";

export default class WeatherApiService {
    #baseUrl = "https://api.openweathermap.org/data/2.5/";

    /**
     * Gets a single location current weather status
     * @param {string} city The city
     * @returns {Promise<LocationWeather>} The location's current weather
     */
    async getSingleLocationWeather(city) {
        if (!city) return null;
        return await (await fetch(this.#getUrl(`weather?q=${city}&units=metric`))).json();
    }

    /**
     * Generates the url containing the base URL and the API key
     * @param {string} url The API endpoint
     * @returns {string} The full URL containing the base URL and the API key
     */
    #getUrl(url) {
        return this.#baseUrl + url + `&appid=${env.WEATHER_API_KEY}`;
    }
}
