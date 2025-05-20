const apiKey = "35a7f8e283e90b5e65d6fc650746df29";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("mainWeatherIcon");

// Map OpenWeatherMap's "main" field to your icon filenames
const weatherToIcon = {
  Clear: "sun.png",
  Clouds: "cloudy.png",
  Rain: "rain.png",
  Drizzle: "rain.png",
  Thunderstorm: "thunder.png",
  Snow: "snow.png",
  Mist: "cloudy.png",
  Smoke: "cloudy.png",
  Haze: "cloudy.png",
  Dust: "cloudy.png",
  Fog: "cloudy.png",
  Sand: "cloudy.png",
  Ash: "cloudy.png",
  Squall: "windy.png",
  Tornado: "windy.png",
  Wind: "windy.png"
};

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    alert("City not found! Please try again.");
    return;
  }
  const data = await response.json();

  // Update main info
  document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
  document.getElementById("desc").textContent = capitalize(data.weather[0].description);
  document.getElementById("humidity").textContent = data.main.humidity + "%";
  document.getElementById("wind").textContent = data.wind.speed + " km/h";
  document.getElementById("clouds").textContent = data.clouds.all + "%";

  // DAY/NIGHT detection
  const localTimestamp = data.dt + data.timezone; // seconds
  const localDate = new Date(localTimestamp * 1000);
  const localHour = localDate.getUTCHours();
  const isNight = localHour >= 19 || localHour < 6; // 7pm to 6am is night mode
  const timeFolder = isNight ? "night" : "day";


// 1. Change .pixel-corners background image
const pixelCorners = document.querySelector(".pixel-corners");
if (pixelCorners) {
  pixelCorners.style.backgroundImage = `url(assets/${timeFolder}/top-bar.png)`;
  pixelCorners.style.backgroundSize = "100% 100%";
  pixelCorners.style.backgroundRepeat = "no-repeat";
}

// 2. Change input styles
const cityInput = document.getElementById("cityInput");
if (cityInput) {
  if (timeFolder === "night") {
    cityInput.style.background = "#3c3b57";
    cityInput.style.color = "#f1e2be";
  } else {
    cityInput.style.background = "#fffbea";
    cityInput.style.color = "#47392c";
  }
}

// 3. Change global font color
document.body.style.color = (timeFolder === "night") ? "#f1e2be" : "#47392c";

// 4. Change search button image & size
if (searchBtn) {
  searchBtn.style.backgroundImage = `url(assets/${timeFolder}/search.png)`;
  searchBtn.style.backgroundSize = "contain";
  searchBtn.style.backgroundRepeat = "no-repeat";
  searchBtn.style.backgroundPosition = "center";
  searchBtn.style.border = "none";
}

  // Main weather icon logic
  const main = data.weather[0].main;
  const iconFile = weatherToIcon[main] || "cloudy.png";
  weatherIcon.style.backgroundImage = `url(assets/${timeFolder}/${iconFile})`;
  weatherIcon.style.backgroundSize = "contain";
  weatherIcon.style.backgroundRepeat = "no-repeat";
  weatherIcon.style.backgroundPosition = "center";

  // Details row icons (these stay the same for day/night)
  document.querySelector(".detail-icon1").style.backgroundImage = `url(assets/${timeFolder}/humidity.png)`;
  document.querySelector(".detail-icon1").style.backgroundSize = "contain";
  document.querySelector(".detail-icon1").style.backgroundRepeat = "no-repeat";
  document.querySelector(".detail-icon1").style.backgroundPosition = "center";

  document.querySelector(".detail-icon2").style.backgroundImage = `url(assets/${timeFolder}/windy.png)`;
  document.querySelector(".detail-icon2").style.backgroundSize = "contain";
  document.querySelector(".detail-icon2").style.backgroundRepeat = "no-repeat";
  document.querySelector(".detail-icon2").style.backgroundPosition = "center";

  document.querySelector(".detail-icon3").style.backgroundImage = `url(assets/${timeFolder}/cloudy.png)`;
  document.querySelector(".detail-icon3").style.backgroundSize = "contain";
  document.querySelector(".detail-icon3").style.backgroundRepeat = "no-repeat";
  document.querySelector(".detail-icon3").style.backgroundPosition = "center";

  // Set background image
  document.querySelector(".bg-img").style.backgroundImage = `url(assets/${timeFolder}/${timeFolder}-bg.png)`;
  document.querySelector(".bg-img").style.backgroundSize = "cover";
  document.querySelector(".bg-img").style.backgroundPosition = "center";

  // Set frame image
  document.querySelector(".frame-img").style.backgroundImage = `url(assets/${timeFolder}/frame.png)`;
  document.querySelector(".frame-img").style.backgroundSize = "contain";
  document.querySelector(".frame-img").style.backgroundRepeat = "no-repeat";
  document.querySelector(".frame-img").style.backgroundPosition = "center";

  // Set detail row image for all .detail elements
  document.querySelectorAll(".detail").forEach(detail => {
    detail.style.backgroundImage = `url(assets/${timeFolder}/detail-row.png)`;
    detail.style.backgroundSize = "100% 100%";
    detail.style.backgroundRepeat = "no-repeat";
    detail.style.backgroundPosition = "center";
  });
}

// Capitalize the first letter for descriptions
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Handle search
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});
searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

// Show Ottawa by default
checkWeather("Ottawa");
