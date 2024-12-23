export default class Pages {
  constructor({ id }) {
    this.id = id;
  }

  create() {
    console.log("Create", this.id);
  }
}
