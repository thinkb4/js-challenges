const challenges = document.querySelector(".challenges");
const projects = Object.freeze([
    {
        name: "Clock",
        thumbnail: "./src/assets/clock.jpg",
        url: "./1 - Clock/index.html"
    },
    {
        name: "Rock, Paper, Scissors, Lizard, Spock",
        thumbnail: "./src/assets/rock-paper-scissors-lizard-spock.png",
        url: "./2 - Rock, Paper, Scissors, Lizard, Spock/index.html"
    },
    {
        name: "Photo Filters",
        thumbnail: "./src/assets/photo-filters.jpg",
        url: "./3 - Photo Filters/index.html"
    },
    {
        name: "Pixel Art",
        thumbnail: "./src/assets/pixel-art.png",
        url: "./4 - Pixel Art/index.html"
    },
    {
        name: "Slider",
        thumbnail: "./src/assets/slider.png",
        url: "./5 - Slider/index.html"
    },
    {
        name: "Puzzle",
        thumbnail: "./src/assets/puzzle.png",
        url: "./6 - Puzzle/index.html"
    },
    {
        name: "Weather",
        thumbnail: "./src/assets/weather.png",
        url: "./7 - Weather/index.html"
    }
]);

for (const project of projects) {
    const a = document.createElement("a");
    const img = document.createElement("img");
    const span = document.createElement("span");

    a.href = project.url;
    img.src = project.thumbnail;
    img.title = `${project.name} thumbnail`;
    span.textContent = project.name;
    a.append(img, span);
    challenges.append(a);
}
