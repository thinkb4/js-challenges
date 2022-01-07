/**
 * @typedef Coordinates
 * @property {number} lon
 * @property {number} lat
 */

/**
 * @typedef WeatherData
 * @property {number} id
 * @property {string} main
 * @property {string} description
 * @property {string} icon
 */

/**
 * @typedef MainData
 * @property {number} temp
 * @property {number} feels_like
 * @property {number} temp_min
 * @property {number} temp_max
 * @property {number} pressure
 * @property {number} humidity
 */

/**
 * @typedef WindData
 * @property {number} speed
 * @property {number} deg
 */

/**
 * @typedef CloudsData
 * @property {number} all
 */

/**
 * @typedef SysData
 * @property {number} type
 * @property {number} id
 * @property {number} message
 * @property {string} country
 * @property {number} sunrise
 * @property {number} sunset
 */

/**
 * @typedef LocationWeather
 * @property {Coordinates} coord
 * @property {WeatherData[]} weather
 * @property {string} base
 * @property {number} visibility
 * @property {WindData} wind
 * @property {CloudsData} clouds
 * @property {number} dt
 * @property {SysData} sys
 * @property {number} timezone
 * @property {number} id
 * @property {string} name
 * @property {number} cod
 */
