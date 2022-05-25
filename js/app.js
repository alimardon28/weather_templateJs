"use strict";
const api = {
  URL: "https://api.openweathermap.org/data/2.5/",
  KEY: "24c63962f9e645224ad1c80da213660b",
  // urlImg:'https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png'
};

const cityName = document.querySelector(".city__name");
const deg = document.querySelector(".deg");
const type = document.querySelector(".type");
const temps = document.querySelector(".temps");
const search = document.querySelector("#search");
const date = document.querySelector(".date");
const count = document.querySelector("#count");
const icon = document.querySelector("#icon");
const clock = document.querySelector(".clock");

search.addEventListener("keypress", getData);

function getData(e) {
  if (e.keyCode == 13) {
    getResult(search.value);
    console.log(search.value);
  }
}

(function () {
  getResult("Toshkent");
})();

function getResult(q) {
  fetch(`${api.URL}weather?q=${q}&units=metric&APPID=${api.KEY}`)
    .then((response) => response.json())
    .then(displayResult)
    .catch((err) => console.log(xato + err));
}

function dateNew() {
  const dateNew = new Date();
  clock.innerHTML = `${dateNew.getHours()} : ${dateNew.getMinutes()}  : ${dateNew.getSeconds()}`;
}
dateNew();

setInterval(function () {
  dateNew();
}, 1000);

function displayResult(info) {
  const newDate = new Date();
  cityName.innerHTML = `${
    info.name
  } , <span>${(count.innerHTML = `${info.sys.country}`)}</span>`;
  icon.innerHTML = `<img  src="https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png" alt=${info.weather[0].icon}></img>`;
  deg.innerHTML = `${Math.floor(info.main.temp)} <span>°C</span>`;
  date.innerHTML = `${
    newDate.getMonth() + 1
  } : ${newDate.getDate()} : ${newDate.getFullYear()}`;
  type.innerHTML = `${info.weather[0].main}`;
  temps.innerHTML = `max  t  : ${Math.round(
    info.main.temp_min
  )} °C / min t  :  ${Math.round(info.main.temp_max)} °C`;
}
