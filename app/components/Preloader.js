import GSAP from "gsap";
import Components from "../classes/Components.js";
import { split } from "../utils/text.js";

export default class Preloader extends Components {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader_text",
        number: ".preloader_number",
        images: document.querySelectorAll("img"),
      },
    });

    this.element.titleSpans = split({
      element: this.elements.title,
      expression: "<br>",
    });

    this.length = 0;

    this.createLoader();
  }

  createLoader() {
    this.elements.images.forEach((image) => {
      image.onload = () => this.onAssetLoaded(image);
      image.src = image.getAttribute("data-src");
      console.log(image.src);
    });
  }

  onAssetLoaded(image) {
    this.length += 1;
    const percentage = this.length / this.elements.images.length;
    this.elements.number.innerHTML = `${Math.round(percentage * 100)}%`;

    if (percentage === 1) {
      this.onloaded();
    }
  }

  onloaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 2,
      });

      //   this.animateOut.to(this.element, {
      //     autoAlpha: 0,
      //   });

      this.animateOut.call(() => {
        //this.emit("completed");
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
