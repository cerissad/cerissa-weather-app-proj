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

function showTemperature(response) {
  let mainTemp = document.querySelector("#mainTemp");
  let mainCity = document.querySelector("#city-header");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  mainCity.innerHTML = response.data.name;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  console.log(axios.get(apiURL).then(showTemperature));
}
navigator.geolocation.getCurrentPosition(handlePosition);

function getLoc() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getLoc);

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-text");
  let cityHeader = document.querySelector("#city-header");

  if (cityInput.value != null) {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cityHeader.innerHTML = capitalizeFirstLetter(`${cityInput.value}`);
  }

  function getTemperature(response) {
    let searchTemp = document.querySelector("#mainTemp");
    searchTemp.innerHTML = Math.round(response.data.main.temp);
  }
  let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=imperial&appid=${apiKey}`;
  axios.get(searchURL).then(getTemperature);
}

let form = document.querySelector("#city-input");
form.addEventListener("click", enterCity);
