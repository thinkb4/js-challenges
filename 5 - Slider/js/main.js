import "./types.js";
import "../components/slider/index.js";
import { setSlider } from "../components/slider/index.js";
import { slides } from "./slides.js";

const slider = setSlider(slides, true);
document.body.append(slider);