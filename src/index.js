// Day and Time
function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day}, ${hour}:${minutes}`;
}

// Manual Search
function getCityData(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input").value;
  citySearch = citySearch.trim();
  citySearch = citySearch.toLowerCase();
  let apiKey = "32bd1cb19b26d8d5db620df7d9642f9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayCityData);
}

function locateUser(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getApiUrl);
}

function getApiUrl(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "32bd1cb19b26d8d5db620df7d9642f9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayCityData);
}

function displayCityData(response) {
  let cityNameElement = document.querySelector("#current-city");
  let cityName = response.data.name.toUpperCase();
  cityNameElement.innerHTML = `${cityName}`;
  let currentTempElement = document.querySelector("#temp");
  let currentTemp = Math.round(response.data.main.temp);
  currentTempElement.innerHTML = `${currentTemp}`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let currentDateTimeElement = document.querySelector("#current-day-time");
let currentDateTime = new Date();
currentDateTimeElement.innerHTML = formatDate(currentDateTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCityData);

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", locateUser);
