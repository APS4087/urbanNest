import Home from "./pages/Home/index.js";
import About from "./pages/About/index.js";
import Collections from "./pages/Collections/index.js";
import Details from "./pages/Details/index.js";
import Preloader from "./components/Preloader.js";

class App {
  constructor() {
    this.createContent();
    this.createPages();
    this.createPreloader();
    this.addLinkListeners();
    this.update();
    this.addEventListeners();
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      collections: new Collections(),
      details: new Details(),
    };

    this.page = this.pages[this.template];
    this.page.create();
    this.onResize();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  onPreloaded() {
    this.preloader.destroy();
    this.page.show();
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  async onChange(url) {
    await this.page.hide();

    const req = await window.fetch(url);

    if (req.status === 200) {
      const html = await req.text();
      const div = document.createElement("div");

      div.innerHTML = html;

      const divContent = div.querySelector(".content");
      this.content.innerHTML = divContent.innerHTML;
      this.template = divContent.getAttribute("data-template");
      this.content.setAttribute("data-template", this.template);

      this.page = this.pages[this.template];

      this.onResize();
      this.page.create();
      this.page.show();

      this.addLinkListeners();
    } else {
      console.log("Error");
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;

        this.onChange(href);
      };
    });
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }
}

new App(); // App initialized
