import Home from "./pages/Home/index.js";
import About from "./pages/About/index.js";
import Collections from "./pages/Collections/index.js";
import Details from "./pages/Details/index.js";

class App {
  constructor() {
    this.createContent();
    this.createPages();
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
    this.page.show();
  }
}

new App(); // App initialized
