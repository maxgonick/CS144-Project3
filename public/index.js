import App from "./app.js";
let app = new App();
const formSubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();
  app.mover.stopMoving();
  const formData = new FormData(event.target);
  const title = formData.get("title");
  const color = formData.get("color");
  app.addCard("todo", title, color);
  document.querySelector("#addCard").reset();
};
const main = () => {
  const addForm = document.querySelector("#addCard");
  addForm.addEventListener("submit", formSubmit);

  /* You can add cards to the board here so you don't have to type them all in every time the page refreshes. Here are a few examples: */
  app.addCard("doing", "Write Card class", "lightblue");
  app.addCard("todo", "Write App class", "khaki");
  let card = app.addCard("todo", "Test everything!", "pink");
  card.setDescription("Hopefully we've been testing throughout the process...");
};
main();
