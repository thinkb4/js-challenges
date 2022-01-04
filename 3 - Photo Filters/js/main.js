import "./types.js";
import filters from "./filters.js";

const targetImage = document.querySelector("#target-image");
const filtersSelect = document.querySelector(".filters");
const intensityInput = document.querySelector("#intensity");

/**
 * Sets the filter select
 */
function setFiltersSelect() {
    for (const filter of filters) {
        const option = document.createElement("option");
        option.value = filter.id;
        option.textContent = filter.label;
        filtersSelect.append(option);
    }
}

/**
 * Sets the filter intensity range configuration
 * @param {Filter} filter The selected filter
 */
function setIntensityRange(filter) {
    if (!filter || (!filter?.min && !filter?.max)) {
        intensityInput.classList.add("hidden");
    } else {
        intensityInput.classList.remove("hidden");
        intensityInput.name = filter.id;
        intensityInput.value = filter.defaultValue;
        intensityInput.min = filter.min;
        intensityInput.max = filter.max;
        intensityInput.dataset.unit = filter.unit ?? "";
    }
}

/**
 * Sets the filter values
 * @param {Filter} filter The filter
 */
function setCurrentFilter(filter) {
    if (!filter.id) {
        targetImage.style.filter = "";
        return;
    }

    const { id, value, unit } = filter;
    const filterValue = unit ? value + unit : value;
    targetImage.style.filter = `${id}(${filterValue})`;
}

/**
 * Handles the select change event
 * @param {Event} e The event
 */
function handleSelectChange(e) {
    const filter = filters.find(filter => filter.id === e.target.value);
    setIntensityRange(filter);
    setCurrentFilter({ ...filter, value: filter?.defaultValue });
}

/**
 * Handles the intensity range change event
 * @param {Event} e The event
 */
function handleIntensityChange(e) {
    const { name, value, dataset } = e.target;
    setCurrentFilter({ id: name, unit: dataset?.unit, value });
}

/**
 * Initializes the application
 */
function init() {
    setFiltersSelect();
    setIntensityRange();
    filtersSelect.addEventListener("change", handleSelectChange);
    intensityInput.addEventListener("change", handleIntensityChange);
}

init();
