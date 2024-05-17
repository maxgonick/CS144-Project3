import Card from "./card.js";
// eslint-disable-next-line no-unused-vars
import Mover from "./mover.js";

export default class App {
  constructor() {
    //TODO
    this.mover = new Mover();
  };

  addCard(col, title, color) {
    //TODO
    const card = new Card(title, color);
    card.addToCol(document.querySelector("#" + col), this.mover);
    return card;
  //TODO
  };
};
