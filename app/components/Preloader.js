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
        number_text: ".preloader_number_text",
        images: document.querySelectorAll("img"),
      },
    });

    split({
      element: this.elements.title,
      expression: "<br>",
    });

    split({
      element: this.elements.title,
      expression: "<br>",
    });

    this.elements.titleSpans =
      this.elements.title.querySelectorAll("span span");

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
    this.elements.number_text.innerHTML = `${Math.round(percentage * 100)}%`;

    if (percentage === 1) {
      this.onloaded();
    }
  }

  onloaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 2,
      });

      this.animateOut.to(this.elements.titleSpans, {
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.1,
        y: "-100%",
      });

      this.animateOut.to(
        this.elements.number_text,
        {
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.1,
          y: "-100%",
        },
        "-=1.4"
      );

      this.animateOut.to(this.element, {
        duration: 1.5,
        ease: "expo.out",
        scaleY: 0,
        transformOrigin: "0% 0%",
      });

      this.animateOut.call(() => {
        this.emit("completed");
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
