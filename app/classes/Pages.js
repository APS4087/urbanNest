import GSAP from "gsap";
import Prefix from "prefix";

export default class Pages {
  constructor({ id, element, elements }) {
    this.id = id;
    this.transformPrefix = Prefix("transform");
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 1000,
    };
    this.onMouseWheelEvent = this.onMouseWheel.bind(this);

    //console.log(this.transformPrefix);
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    };

    // Iterate over the entries of this.selectorChildren
    Object.entries(this.selectorChildren).forEach(([key, value]) => {
      console.log(`Key: ${key}, Value:`, value);

      if (
        value instanceof window.HTMLElement ||
        value instanceof window.NodeList ||
        Array.isArray(value)
      ) {
        this.elements[key] = value;
      } else {
        this.elements[key] = document.querySelectorAll(value);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(value);
        }
      }

      //console.log(this.elements[key], value);
    });

    //console.log("Create", this.id);
  }

  update() {
    //console.log("Update", this.id);

    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }
  }

  show() {
    return new Promise((resolve) => {
      this.animationStart = GSAP.timeline();

      this.animationStart.from(
        this.element,
        // {
        //   autoAlpha: 0,
        // },
        {
          autoAlpha: 1,
        }
      );

      this.animationStart.call(() => {
        this.addEventListeners();
        resolve();
      });
    });
  }

  hide() {
    return new Promise((resolve) => {
      this.removeEventListeners();

      this.animationEnd = GSAP.timeline();

      this.animationEnd.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }

  onMouseWheel(event) {
    //console.log(event);

    const { deltaY } = event;
    this.scroll.target += deltaY;

    //console.log(this.scroll.target);
  }

  addEventListeners() {
    window.addEventListener("mousewheel", this.onMouseWheelEvent);
  }
  removeEventListeners() {
    window.removeEventListener("mousewheel", this.onMouseWheelEvent);
  }

  onResize() {
    this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight;
  }
}
