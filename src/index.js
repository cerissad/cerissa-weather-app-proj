let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let todaysDate = document.querySelector("#currentDate");
todaysDate.innerHTML = `${day}, ${hours}:${minutes}`;

let apiKey = "cfc5cad501ca51e328475f69bd6d7dd0";

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);
  //console.log(response.data.weather[0].main);
  let mainDescription = document.querySelector("#weatherDescription");
  let mainTemp = document.querySelector("#mainTemp");
  let mainCity = document.querySelector("#city-header");
  let humidityDetail = document.querySelector("#humidityDetail");
  let windSpeed = document.querySelector("#windSpeed");

  fahreinheitTemperature = response.data.main.temp;

  mainTemp.innerHTML = Math.round(response.data.main.temp);
  mainCity.innerHTML = response.data.name;
  mainDescription.innerHTML = response.data.weather[0].main;
  humidityDetail.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  celsius.setAttribute("class", "active");
  fahreinheit.setAttribute("class", null);
}

function getLoc() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-text");
  let cityHeader = document.querySelector("#city-header");

  if (cityInput.value != null) {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cityHeader.innerHTML = `${cityInput.value}`;
    celsius.setAttribute("class", "active");
    fahreinheit.setAttribute("class", null);
  }

  function getTemperature(response) {
    let searchTemp = document.querySelector("#mainTemp");
    let cityDescr = document.querySelector("#weatherDescription");

    fahreinheitTemperature = response.data.main.temp;

    humidityDetail = document.querySelector("#humidityDetail");
    windSpeed = document.querySelector("#windSpeed");
    searchTemp.innerHTML = Math.round(response.data.main.temp);
    cityDescr.innerHTML = response.data.weather[0].main;
    humidityDetail.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );
  }

  let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`;
  axios.get(searchURL).then(getTemperature);
}

function convertCel(event) {
  event.preventDefault();
  let celsiusTemp = (fahreinheitTemperature - 32) * 0.5556;
  let mainTemp = document.querySelector("#mainTemp");
  mainTemp.innerHTML = Math.round(celsiusTemp);
  fahreinheit.setAttribute("class", "active");
  celsius.setAttribute("class", null);
}

function convertFah(event) {
  event.preventDefault();
  let fahTemp = fahreinheitTemperature;
  let mainTemp = document.querySelector("#mainTemp");
  mainTemp.innerHTML = Math.round(fahTemp);
  celsius.setAttribute("class", "active");
  fahreinheit.setAttribute("class", null);
}

navigator.geolocation.getCurrentPosition(handlePosition);

let button = document.querySelector("button");
button.addEventListener("click", getLoc);

let form = document.querySelector("#city-input");
form.addEventListener("submit", enterCity);

let fahreinheitLink = document.querySelector("#fahreinheit");
fahreinheitLink.addEventListener("click", convertFah);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCel);
