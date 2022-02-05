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
let sechs = document.querySelector("#sechs");
let achte = document.querySelector("#acht");
let zehn = document.querySelector("#zehn");

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
    // wenn die zeit nicht undefined ist
    if (time.value) {
      timeInMinutes.push(timeToMinutes(time.value));
    }
  });
  console.log(timeInMinutes.length);

  // wenn alle 4 werte angegeben wurden
  if (timeInMinutes.length === 4) {
    let morningTime = timeInMinutes[1] - timeInMinutes[0];
    let eveningTime = timeInMinutes[3] - timeInMinutes[2];
    let totalTime = morningTime + eveningTime;
    // console.log(totalTime);
    let [calculatedHour, calculatedMinute] = convertMinutestoDaytime(totalTime);
    if (calculatedMinute.toString().length === 1) {
      calculatedMinute = `0${calculatedMinute}`;
    }
    komplett.textContent = `du hast ${calculatedHour}:${calculatedMinute} stunden gearbeitet`;
  }

  // wenn nur 2 werte eingegeben wurden
  else if (timeInMinutes.length === 2) {
    let totalTime = timeInMinutes[1] - timeInMinutes[0];
    let [calculatedHour, calculatedMinute] = convertMinutestoDaytime(totalTime);
    if (calculatedMinute.toString().length === 1) {
      calculatedMinute = `0${calculatedMinute}`;
    }
    komplett.textContent = `du hast ${calculatedHour}:${calculatedMinute} stunden gearbeitet`;
  } else if (timeInMinutes.length === 3) {
    let morningTime = timeInMinutes[1] - timeInMinutes[0];
    let timeReached = 6 * 60 + 30 - morningTime;
    let timeToEight = 8 * 60 + 12 - morningTime;
    let timeToTen = 10 * 60 + 30 - morningTime;
    let [time6Hours, time6Minutes] = convertMinutestoDaytime(
      parseInt(timeInMinutes[2]) + timeReached
    );
    let [time8Hours, time8Minutes] = convertMinutestoDaytime(
      parseInt(timeInMinutes[2]) + timeToEight
    );
    let [time10Hours, time10Minutes] = convertMinutestoDaytime(
      parseInt(timeInMinutes[2]) + timeToTen
    );
    sechs.textContent = `du hast ${time6Hours}:${time6Minutes} 6:30 erreicht`;
    acht.textContent = `du hast ${time8Hours}:${time8Minutes} 8:12 erreicht`;
    zehn.textContent = `du hast ${time10Hours}:${time10Minutes} 10:30 erreicht`;
  }
}

function convertMinutestoDaytime(total) {
  let hours = Math.floor(total / 60);
  let minutes = total - hours * 60;
  // console.log(hours, minutes);
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
