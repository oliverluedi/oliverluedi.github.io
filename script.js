"use strict";

const morgen = document.querySelector("#morgen");
const mittag = document.querySelector("#mittag");
const nachmittag = document.querySelector("#nachmittag");
const abend = document.querySelector("#abend");
let inputElement = document.querySelector("#input-container");
let result = document.querySelector(".complete");
let button = document.querySelector("#button");
let zurueckButton = document.querySelector("#zurueck");
let komplett = document.querySelector("#komplett");

let alle_inpute = [morgen, mittag, nachmittag, abend];

// überprüft die zeiten ob sie ein : beinhalten
function check(time) {
  if (time.value.length < 3 && time.value.length !== 0) {
    time.value = time.value + ":00";
  } else {
    let time_array = [...time.value];
    let isTime = time_array.indexOf(":");
    if (isTime === -1 && time.value.length !== 0) {
      time_array.reverse().splice(2, 0, ":");
      time.value = time_array.reverse().join("");
    }
  }
}

// kontrolliert die eingaben
function controlInput() {
  alle_inpute.forEach((eingabe) => {
    check(eingabe);
  });
}

// konvertiert die angaben in minuten
function timeToMinutes(time) {
  let [hours, minutes] = time.split(":");
  let totalHours = parseInt(hours) * 60 + parseInt(minutes);
  return totalHours;
}

// berechnet die zeiten
function calculateTime() {
  let timeInMinutes = [];
  alle_inpute.forEach((time) => {
    timeInMinutes.push(timeToMinutes(time.value));
  });

  if (timeInMinutes.length === 4) {
    let morningTime = timeInMinutes[1] - timeInMinutes[0];
    let eveningTime = timeInMinutes[3] - timeInMinutes[2];
    let totalTime = morningTime + eveningTime;
    console.log(totalTime);
    let [calculatedHour, calculatedMinute] = convertMinutestoDaytime(totalTime);
    if (calculatedMinute.toString().length === 1) {
      calculatedMinute = `0${calculatedMinute}`;
    }
    console.log(
      `du hast ${calculatedHour}:${calculatedMinute} stunden gearbeitet`
    );
    komplett.textContent = `du hast ${calculatedHour}:${calculatedMinute} stunden gearbeitet`;
  }
}

function convertMinutestoDaytime(total) {
  let hours = Math.floor(total / 60);
  let minutes = total - hours * 60;
  console.log(hours, minutes);
  return [hours, minutes];
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
  calculateTime();
});

zurueckButton.addEventListener("click", () => {
  inputElement.hidden = false;
  result.hidden = true;
});
