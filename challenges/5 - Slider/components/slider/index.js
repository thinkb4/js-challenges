class Slider extends HTMLElement {
    //#region Constructor

    /**
     * @type {HTMLDivElement}
     */
    mainContainer;

    /**
     * @type {DocumentFragment}
     */
    sliderTemplate;

    /**
     * @type {DocumentFragment}
     */
    slideTemplate;

    /**
     * Gets the slides count
     */
    get count() {
        return this.slides.length;
    }

    /**
     * Observes the slider attributes
     */
    static get observedAttributes() {
        return ["current"];
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.setStyleTag();
        this.setTemplates();
    }

    //#endregion

    //#region Life cycle methods

    connectedCallback() {
        this.setSlider();
    }

    attributeChangedCallback(_name, oldValue, newValue) {
        if (oldValue !== newValue) this.updateSlideStyles();
    }

    //#endregion

    //#region Navigation

    /**
     * Goes to an specific slide
     * @param {number} index The slide index
     */
    goToSlide(index) {
        const currentIndex = this.getCurrentIndex();
        this.setAttribute("current", index ?? 0);
        this.setAnimationDirectionProperty(currentIndex < index ? 1 : -1);
    }

    /**
     * Goes to the next slide
     */
    goToNextSlide() {
        let currentIndex = this.getCurrentIndex();
        let index;

        if (this.infinite) {
            index = (currentIndex + 1) % this.count;
        } else {
            index = currentIndex < this.count - 1 ? currentIndex + 1 : currentIndex;
        }

        this.goToSlide(index);
        this.setAnimationDirectionProperty(1);
    }

    /**
     * Goes to the previous slide
     */
    goToPreviousSlide() {
        let currentIndex = this.getCurrentIndex();
        let index;

        if (this.infinite) {
            index = currentIndex === 0 ? this.count - 1 : currentIndex - 1;
        } else {
            index = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        }

        this.goToSlide(index);
        this.setAnimationDirectionProperty(-1);
    }

    //#endregion

    //#region Configuration

    /**
     * Sets the slider
     */
    setSlider() {
        this.setMainContainer();
        this.setSlides();
        this.setNavigationButtonsActions();
        this.setNavigationDots();
        this.goToSlide();
    }

    /**
     * Sets the main container
     */
    setMainContainer() {
        const template = this.sliderTemplate.cloneNode(true);
        this.mainContainer = template.content.children[0];
        this.shadowRoot.append(this.mainContainer);
    }

    /**
     * Sets the slides
     */
    setSlides() {
        for (const slide of this.slides) {
            const template = this.slideTemplate.cloneNode(true);
            const slideElement = template.content.children[0];
            const h2 = slideElement.querySelector("#slide-title");
            const p = slideElement.querySelector("#slide-description");

            slideElement.style.backgroundImage = `url(${slide.background})`;
            h2.textContent = slide.title;
            p.textContent = slide.description;
            this.mainContainer.append(slideElement);
        }
    }

    /**
     * Sets the navigation buttons
     */
    setNavigationButtonsActions() {
        const prevButton = this.mainContainer.querySelector(".slider-prev-btn");
        const nextButton = this.mainContainer.querySelector(".slider-next-btn");

        prevButton.addEventListener("pointerdown", e => this.goToPreviousSlide(e));
        nextButton.addEventListener("pointerdown", e => this.goToNextSlide(e));
    }

    /**
     * Sets the navigation dots
     */
    setNavigationDots() {
        const dots = this.mainContainer.querySelector(".slider-dots");

        for (const slide in this.slides) {
            const button = document.createElement("button");
            button.addEventListener("pointerdown", () => this.goToSlide(slide));
            dots.append(button);
        }
    }

    /**
     * Updates the slides styles based on the current index
     */
    updateSlideStyles() {
        const currentIndex = this.getCurrentIndex();
        const slides = this.mainContainer.querySelectorAll(".slide");
        const dots = this.mainContainer.querySelectorAll(".slider-dots button");

        // Sets active slide
        for (const [index, slide] of slides.entries()) {
            slide.classList[index === currentIndex ? "add" : "remove"]("visible");
        }

        // Sets active dot
        for (const [index, dot] of dots.entries()) {
            dot.classList[index === currentIndex ? "add" : "remove"]("active");
        }
    }

    //#endregion

    //#region Helpers

    /**
     * Sets the style tag containing the slider styles
     */
    setStyleTag() {
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "./components/slider/style.css");
        this.shadowRoot.append(linkElem);
    }

    /**
     * Sets the component templates
     */
    setTemplates() {
        const sliderTemplate = document.querySelector("#slider-template");
        const slideTemplate = document.querySelector("#slide-template");
        this.sliderTemplate = sliderTemplate;
        this.slideTemplate = slideTemplate;
        sliderTemplate.remove();
        slideTemplate.remove();
    }

    /**
     * Sets the custom property for the navigation animation
     * @param {number} direction The animation direction (1 for next and -1 for previous)
     */
    setAnimationDirectionProperty(direction) {
        this.mainContainer.style.setProperty("--animation-direction", direction);
    }

    /**
     * Gets the current index
     * @returns The current index
     */
    getCurrentIndex() {
        return +this.getAttribute("current");
    }

    //#endregion
}

// The component definition
customElements.define("app-slider", Slider);

/**
 * The Slider custom component generator
 * @param {Slide[]} slides The slider slides
 * @param {boolean} infinite A boolean that determines whether the slider is infinite or not
 * @returns {HTMLElement} The slider component
 */
export function setSlider(slides, infinite = false) {
    const slider = document.createElement("app-slider");
    slider.slides = slides;
    slider.infinite = infinite;
    return slider;
}
