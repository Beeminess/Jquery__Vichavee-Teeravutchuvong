console.log ("Hi there");

const apiKey = "71e2b8e745e1202bccf44a87f330b842";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const weatherResultDiv = document.getElementById("weatherResult");
const getWeatherBTN = document.getElementById("getWeatherBtn");

async function getWeatherData(cityName) {
  const url = `${baseURL}q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      displayWeatherData(data);
    } else {
      weatherResultDiv.innerHTML = `<p style="color:red;">Error: ${data.message}</p>`;
    }
  } catch (error) {
    weatherResultDiv.innerHTML = `<p style="color:red;">Network error. Please try again later.</p>`;
    console.error("Error fetching data:", error);
  }
}

function displayWeatherData(data) {
  const displayData = `
    <p><strong>City:</strong> ${data.name}</p>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].main}</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  weatherResultDiv.innerHTML = displayData;
}

getWeatherBTN.addEventListener("click", function () {
  const cityName = document.getElementById("cityName").value.trim();
  if (cityName) {
    getWeatherData(cityName);
  } else {
    weatherResultDiv.innerHTML = `<p style="color:red;">Please enter a city name.</p>`;
  }
});

function displayWeatherData(data) {
  const iconCode = data.weather[0].icon; // e.g., "10d"
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const displayData = `
    <p><strong>City:</strong> ${data.name}</p>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Weather:</strong> ${data.weather[0].main}</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    <img src="${iconUrl}" alt="Weather Icon" style="width: 80px; height: 80px;" />
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;

  weatherResultDiv.innerHTML = displayData;
}
