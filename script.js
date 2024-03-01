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

const baseUrl =
  "https://api.weatherapi.com/v1/current.json?key=dd40ce473c9a47f48e6175320242802&q=london";

async function getWeatherData() {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    console.log(data);

    updateUi(data);
  } catch (error) {
    console.error("Error in loading weather data", error);
  }
}

function updateUi(data) {}
const date = new Date();
const formattedDate = date.toLocaleDateString("de-DE", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

dateInput.innerHTML = formattedDate;
getWeatherData();
