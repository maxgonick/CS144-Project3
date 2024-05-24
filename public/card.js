/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";
function hexToBrightness(hex) {
  // Remove the leading '#' if present
  hex = hex.replace('#', '');

  // Convert the hexadecimal string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness using the formula:
  // Brightness = (0.2126 * R + 0.7152 * G + 0.0722 * B) / 255
  const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (isNaN(brightness)) return 1;
  return brightness;
}
export default class Card {
  constructor(title, color) {
    //TODO
    self.title = title;
    self.color = color;
    self.card = null;
  }

  addToCol(colElem, mover) {
    //TODO
    let foo = new Set();
    //Helper Functions
    const deleteEvent = (event) => {
      console.log("WORK");
      mover.stopMoving();
      const cardNode = event.target.closest(".card");
      cardNode.remove();
    };
    const leaveEditEvent = (event) => {
      const cardNode = event.target.closest(".card");
      const editField = cardNode.querySelector(".editDescription");
      console.log(editField.value);
      cardNode.querySelector(".description").innerHTML = editField.value;
      editField.classList.add("hidden");
    };
    const editEvent = (event) => {
      const cardNode = event.target.closest(".card");
      const editField = cardNode.querySelector(".editDescription");
      editField.classList.remove("hidden");
      editField.value = cardNode.querySelector(".description").innerText;
      editField.focus();
      editField.select();
    };
    const moveEvent = (event) => {
      console.log(event.target, " saw this event");
      mover.stopMoving();
      console.log(event.target.closest(".card"));
      mover.startMoving(event.target.closest(".card"));
    };
    const dropEvent = (event) => {
      event.preventDefault();
      const eventCard = event.currentTarget;
      if (event.dataTransfer.items) {
        const reader = new FileReader();
        const file = event.dataTransfer.items[0].getAsFile();
        reader.onload = () => {
          eventCard.querySelector(".description").textContent = reader.result;
        };
        reader.readAsText(file);
      }
      event.currentTarget.classList.remove("dragoverZone");
    };
    const dragenterEvent = (event) => {
      event.preventDefault();
      foo.add(event.target);
      console.log("enter");
      event.currentTarget.classList.add("dragoverZone");
    };
    const dragleaveEvent = (event) => {
      event.preventDefault();
      foo.delete(event.target);
      console.log("leave", event.target, this);
      if (foo.size === 0) {
        event.currentTarget.classList.remove("dragoverZone");
      }
    };
    const newElement = document.querySelector(".template").cloneNode(true);
    newElement.classList.remove("template");
    newElement.style.backgroundColor = self.color;
    console.log(self.color)
    const brightness = hexToBrightness(self.color);
    console.log(brightness);
    if (brightness >= 0.5) {
      newElement.style.color = "black";
      const buttons = newElement.querySelectorAll(".buttons > *");
      buttons.forEach(element => {
        element.style.color = "black";
      });
    }
    else if (brightness < 0.5) {
      newElement.style.color = "white";
      const buttons = newElement.querySelectorAll(".buttons > :not(img)");
      buttons.forEach(element => {
        element.style.color = "white";
      });
    }
    const title = newElement.querySelector(".title");
    title.innerText = self.title;
    newElement.querySelector(".delete").addEventListener("click", deleteEvent);
    newElement.querySelector(".edit").addEventListener("click", editEvent);
    newElement.querySelector(".editDescription").addEventListener("blur", leaveEditEvent);
    newElement.querySelector(".startMove").addEventListener("mousedown", moveEvent);
    newElement.querySelector(".description").innerText = NO_DESCRIPTION_TEXT;
    self.card = newElement;
    newElement.addEventListener("dragenter", dragenterEvent);
    newElement.addEventListener("dragleave", dragleaveEvent);
    newElement.addEventListener("drop", dropEvent);
    newElement.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    colElem.append(newElement);
  }
  setDescription(text) {
    //TODO
    self.card.querySelector(".description").innerText = text;
  }

  //TODO
}
