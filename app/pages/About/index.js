import Page from "classes/Pages.js";

export default class About extends Page {
  constructor() {
    super({
      id: "about",
      element: ".about",
      elements: {
        wrapper: ".about_wrapper",
        title: ".about_title",
        navigation: document.querySelector(".navigation"),
      },
    });
  }
}
