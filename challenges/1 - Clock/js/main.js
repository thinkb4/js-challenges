/**
 * Adds the leading zero to any given number
 * @param {number} number The target number
 * @returns The number containing its leading zero
 */
function addZero(number) {
    return ("0" + number).slice(-2);
}

/**
 * Sets the analag's clock
 * @param {number} hours The current hours
 * @param {number} minutes The current minutes
 * @param {number} seconds The current seconds
 */
function setAnalogClock(hours, minutes, seconds) {
    const clock = document.querySelector(".analog-clock");
    clock.style.setProperty("--hours-rotation", `${(360 / 12) * hours}deg`);
    clock.style.setProperty("--minutes-rotation", `${(360 / 60) * minutes}deg`);
    clock.style.setProperty("--seconds-rotation", `${(360 / 60) * seconds}deg`);
}

/**
 * Sets the digital's clock
 * @param {number} hours The current hours
 * @param {number} minutes The current minutes
 * @param {number} seconds The current seconds
 */
function setDigitalClock(hours, minutes, seconds) {
    const h1 = document.querySelector(".digital-clock h1");
    h1.textContent = [hours, minutes, seconds].join(" : ");
}

/**
 * Initializes the application
 */
function tick() {
    const date = new Date();
    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());
    const seconds = addZero(date.getSeconds());

    setAnalogClock(hours, minutes, seconds);
    setDigitalClock(hours, minutes, seconds);
}

setInterval(tick, 1000);
tick();
