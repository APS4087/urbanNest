import EventEmitter from "events";

export default class Components extends EventEmitter {
  constructor({ element, elements }) {
    super();
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };
    this.create();
    this.addEventListeners();
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

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

      console.log(this.elements[key], value);
    });

    console.log("Create", this.id);
  }

  addEventListeners() {}

  removeEventListeners() {}
}
