const morgen = document.querySelector("#morgen");
const mittag = document.querySelector("#mittag");
const nachmittag = document.querySelector("#nachmittag");
const abend = document.querySelector("#abend");
let inputElement = document.querySelector("#input-container");
let result = document.querySelector(".complete");
let button = document.querySelector("#button");
let zurueckButton = document.querySelector("#zurueck");

let alle_inpute = [morgen, mittag, nachmittag, abend];

function check(time) {
  if (time.value.length < 3 && time.value.length !== 0) {
    time.value = time.value + ":00";
  } else {
    let time_array = [...time.value];
    isTime = time_array.indexOf(":");
    if (isTime === -1 && time.value.length !== 0) {
      time_array.reverse().splice(2, 0, ":");
      time.value = time_array.reverse().join("");
    }
  }
}

function controlInput() {
  alle_inpute.forEach((eingabe) => {
    check(eingabe);
  });
}

alle_inpute.forEach((eingabe) => {
  eingabe.addEventListener("change", () => {
    controlInput();
  });
});

button.addEventListener("click", () => {
  console.log("clicked");
  controlInput();
  inputElement.hidden = true;
  result.hidden = false;
});

zurueckButton.addEventListener("click", () => {
  inputElement.hidden = false;
  result.hidden = true;
});
