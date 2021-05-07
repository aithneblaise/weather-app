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
  celsiusTemp = response.data.main.temp;
  currentTempElement.innerHTML = Math.round(celsiusTemp);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let descriptionElement = document.querySelector("#weather-description");
  let weatherDescription = response.data.weather[0].main;
  descriptionElement.innerHTML = `${weatherDescription}`;
  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  windSpeedElement.innerHTML = `${windSpeed} m/s`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "32bd1cb19b26d8d5db620df7d9642f9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,hourly,minutely&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<ul>`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
      <li>
        <div class="weather-forecast-date days">${formatDay(
          forecastDay.dt
        )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />${Math.round(forecastDay.temp.day)}°
      </li>
  `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "32bd1cb19b26d8d5db620df7d9642f9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityData);
}

search("paris");

let currentDateTimeElement = document.querySelector("#current-day-time");
let currentDateTime = new Date();
currentDateTimeElement.innerHTML = formatDate(currentDateTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCityData);

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", locateUser);
