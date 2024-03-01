// DOM Elements

// API Input Elements

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

const userLocation = "Berlin";
const forecast = "&days=3";

const baseUrl = `https://api.weatherapi.com/v1/current.json?key=dd40ce473c9a47f48e6175320242802&q=${userLocation}`;
const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=dd40ce473c9a47f48e6175320242802&q=${userLocation}&days=3`;
async function getWeatherData() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();

    const responseForecast = await fetch(forecastUrl);
    const forecastData = await responseForecast.json();
    //console.log(data);
    console.log(forecastData.forecast.forecastday[0].day.avgtemp_c);

    updateUi(data, forecastData);
  } catch (error) {
    console.error("Error in loading weather data", error);
  }
}

getWeatherData();

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

  //weather logo
  //weatherLogoInput.src = `https:${data.current.condition.icon}`;
  //console.log(weatherLogoInput.src);

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
  dayOneInput.innerHTML = weekDays[date.getDay() - 1];
  conditionDayOne.innerHTML = `${forecastData.forecast.forecastday[0].day.condition.text}`;
  //logoDayOne=
  dayOneTemp.innerHTML = `${forecastData.forecast.forecastday[0].day.avgtemp_c}°C`;
  //forecast day 2
  dayTwoInput.innerHTML = weekDays[date.getDay()];
  conditionDayTwo.inne;
  //logoDayTwo=
  rHTML = `${forecastData.forecast.forecastday[1].day.condition.text}`;
  dayTwoTemp.innerHTML = `${forecastData.forecast.forecastday[1].day.avgtemp_c}°C`;

  //forecast day 3
  dayThreeInput.innerHTML = weekDays[date.getDay() + 1];
  conditionDayThree.innerHTML = `${forecastData.forecast.forecastday[2].day.condition.text}`;
  //logoDayThree=

  dayThreeTemp.innerHTML = `${forecastData.forecast.forecastday[2].day.avgtemp_c}°C`;
}
