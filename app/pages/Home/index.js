import Page from "classes/Pages.js";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        navigation: document.querySelector(".navigation"),
        button: ".home_link",
      },
    });
  }
}
