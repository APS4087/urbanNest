import Home from "./pages/Home/index.js";
import About from "./pages/About/index.js";
import Collections from "./pages/Collections/index.js";
import Details from "./pages/Details/index.js";

class App {
  constructor() {
    this.createContent();
    this.createPages();
    this.addLinkListeners();
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
      this.page.create();
      this.page.show();
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
}

new App(); // App initialized
