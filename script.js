// DOM Elements

// API Input Elements
const searchInput = document.querySelector(".search-bar");
const resultsContainer = document.querySelector(".search-results");
const searchButton = document.querySelector(".submit-search");
const dateInput = document.querySelector(".date-div");
const locationInput = document.querySelector(".title");
const weatherLogoInput = document.querySelector(".weather-logo");
const weatherDescriptionInput = document.querySelector(".weather-status");
const temperatureInput = document.querySelector(".temperature");

//weather details container
const weatherDetailsContainer = document.querySelector(
  ".weather-details-container"
);
const windSpeedInput = document.querySelector(".wind-speed");
const rainInput = document.querySelector(".rain-percentage");
const feelingInput = document.querySelector(".feeling-celsius");

//forecast container
const dayOneInput = document.querySelector(".day-one-title");
const dayTwoInput = document.querySelector(".day-two-title");
const dayThreeInput = document.querySelector(".day-three-title");

const conditionDayOne = document.querySelector(".condition-day-one");
const conditionDayTwo = document.querySelector(".condition-day-two");
const conditionDayThree = document.querySelector(".condition-day-three");

const logoDayOne = document.querySelector(".day-one-logo");
const logoDayTwo = document.querySelector(".day-two-logo");
const logoDayThree = document.querySelector(".day-three-logo");

const dayOneTemp = document.querySelector(".day-one-temp");
const dayTwoTemp = document.querySelector(".day-two-temp");
const dayThreeTemp = document.querySelector(".day-three-temp");

// function for API interaction

searchInput.addEventListener("input", function (e) {
  setTimeout(() => {
    searchLocation(searchInput.value);
  }, 500);
});

searchButton.addEventListener("click", () => {
  if (searchInput.value) {
    getWeatherData(searchInput.value);
    resultsContainer.innerHTML = "";
    searchInput.value = "";
  } else {
    searchInput.placeholder = "No entry";
  }
});

async function searchLocation(inputValue) {
  const searchUrl = `https://api.weatherapi.com/v1/search.json?key=dd40ce473c9a47f48e6175320242802&q=${inputValue}`;

  if (searchInput.value) {
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      displayResults(data);
    } catch (error) {
      console.log("Cant find location data");
    }
  }
}

function displayResults(data) {
  resultsContainer.innerHTML = "";

  data.forEach((location) => {
    const locationElement = document.createElement("button");
    locationElement.classList.add("result-button");
    locationElement.textContent = location.name;
    locationElement.addEventListener("click", (e) => {
      let location = e.target.innerHTML;
      getWeatherData(location);
      resultsContainer.innerHTML = "";
      searchInput.value = "";
    });
    resultsContainer.appendChild(locationElement);
  });
}

function handleResultClick(location) {
  getWeatherData(location.name);
}

async function getWeatherData(location) {
  let baseUrl = `https://api.weatherapi.com/v1/current.json?key=dd40ce473c9a47f48e6175320242802&q=${location}`;
  let forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=dd40ce473c9a47f48e6175320242802&q=${location}&days=4`;

  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    const responseForecast = await fetch(forecastUrl);
    const forecastData = await responseForecast.json();
    updateUi(data, forecastData);
  } catch (error) {
    console.error("Error in loading weather data", error);
  }
}

function updateUi(data, forecastData) {
  //date input
  const date = new Date();

  const formattedDate = date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const weekDays = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri", "Sat", "Sun"];

  //location input
  dateInput.innerHTML = formattedDate;
  locationInput.innerHTML = data.location.name;
  //current weather condition logo
  weatherLogoInput.src = `https:${data.current.condition.icon}`;

  // condition text
  weatherDescriptionInput.innerHTML = data.current.condition.text;
  //temperature
  temperatureInput.innerHTML = `${data.current.temp_c}°`;

  // wind speed
  windSpeedInput.innerHTML = `${data.current.wind_kph} km/h`;
  // rain chance
  rainInput.innerHTML = `${forecastData.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  //feeling temp
  feelingInput.innerHTML = `${data.current.feelslike_c}°C`;

  //forecast day 1
  dayOneInput.innerHTML = weekDays[date.getDay()];
  conditionDayOne.innerHTML = `${forecastData.forecast.forecastday[1].day.condition.text}`;
  logoDayOne.src = `https:${forecastData.forecast.forecastday[1].day.condition.icon}`;
  dayOneTemp.innerHTML = `${forecastData.forecast.forecastday[1].day.avgtemp_c}°C`;

  //forecast day 2
  dayTwoInput.innerHTML = weekDays[date.getDay() + 1];
  logoDayTwo.src = `https:${forecastData.forecast.forecastday[2].day.condition.icon}`;
  conditionDayTwo.innerHTML = `${forecastData.forecast.forecastday[2].day.condition.text}`;
  dayTwoTemp.innerHTML = `${forecastData.forecast.forecastday[2].day.avgtemp_c}°C`;

  //forecast day 3
  dayThreeInput.innerHTML = weekDays[date.getDay() + 2];
  conditionDayThree.innerHTML = `${forecastData.forecast.forecastday[3].day.condition.text}`;
  logoDayThree.src = `https:${forecastData.forecast.forecastday[3].day.condition.icon}`;
  dayThreeTemp.innerHTML = `${forecastData.forecast.forecastday[3].day.avgtemp_c}°C`;
}

getWeatherData("Berlin");

// Enter taste als input für search bar einsetzen
