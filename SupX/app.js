// Configuration: insert your real API key here.
// Example (OpenWeatherMap): https://api.openweathermap.org
const WEATHER_API_KEY = "2d35b4234e0c662d77b3123c2145fa25";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

if (!WEATHER_API_KEY || WEATHER_API_KEY === "YOUR_WEATHER_API_KEY_HERE") {
  console.warn(
    "Weather API key is not set. Please update WEATHER_API_KEY in app.js with your real key."
  );
}

const citySelect = document.getElementById("citySelect");
const addPresetBtn = document.getElementById("addPresetBtn");
const customCityInput = document.getElementById("customCityInput");
const addCustomBtn = document.getElementById("addCustomBtn");
const cardsGrid = document.getElementById("cardsGrid");
const emptyState = document.getElementById("emptyState");
const refreshAllBtn = document.getElementById("refreshAllBtn");
const lastUpdatedLabel = document.getElementById("lastUpdated");
const cardTemplate = document.getElementById("weatherCardTemplate");

let selectedCities = new Map(); // cityName -> cardElement

function showToast(message, isError = false) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("visible");
  setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

function formatTime(date = new Date()) {
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateLastUpdatedLabel() {
  lastUpdatedLabel.textContent = `Last updated: ${formatTime()}`;
}

function setLoadingState(card, isLoading) {
  card.dataset.loading = isLoading ? "true" : "false";
  card.style.opacity = isLoading ? "0.7" : "1";
}

async function fetchWeather(city) {
  if (!WEATHER_API_KEY || WEATHER_API_KEY === "YOUR_WEATHER_API_KEY_HERE") {
    throw new Error(
      "Missing API key. Set WEATHER_API_KEY at the top of app.js."
    );
  }

  const params = new URLSearchParams({
    q: city,
    appid: WEATHER_API_KEY,
    units: "metric",
  });

  const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling.");
    }
    throw new Error("Failed to fetch weather. Please try again.");
  }
  return response.json();
}

function createWeatherCard(city) {
  const fragment = cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".weather-card");

  const cityNameEl = card.querySelector(".city-name");
  const countryCodeEl = card.querySelector(".country-code");
  const tempValueEl = card.querySelector(".temp-value");
  const feelsLikeEl = card.querySelector(".feels-like");
  const humidityEl = card.querySelector(".humidity");
  const windEl = card.querySelector(".wind");
  const iconImg = card.querySelector(".weather-icon");
  const descriptionEl = card.querySelector(".weather-description");
  const updatedAtEl = card.querySelector(".updated-at");
  const removeBtn = card.querySelector(".remove-btn");
  const refreshBtn = card.querySelector(".refresh-btn");

  cityNameEl.textContent = city;
  countryCodeEl.textContent = "";
  tempValueEl.textContent = "--";
  feelsLikeEl.textContent = "-- °C";
  humidityEl.textContent = "-- %";
  windEl.textContent = "-- km/h";
  descriptionEl.textContent = "Loading…";
  updatedAtEl.textContent = "Fetching latest data…";
  iconImg.src = "";
  iconImg.alt = "Weather icon";

  removeBtn.addEventListener("click", () => {
    selectedCities.delete(city);
    card.remove();
    toggleEmptyState();
  });

  refreshBtn.addEventListener("click", () => {
    loadCityWeather(city, card);
  });

  cardsGrid.appendChild(card);
  toggleEmptyState();
  return card;
}

function toggleEmptyState() {
  emptyState.style.display = cardsGrid.children.length ? "none" : "block";
}

async function loadCityWeather(city, card) {
  if (!card) return;

  const descriptionEl = card.querySelector(".weather-description");
  const updatedAtEl = card.querySelector(".updated-at");
  const tempValueEl = card.querySelector(".temp-value");
  const feelsLikeEl = card.querySelector(".feels-like");
  const humidityEl = card.querySelector(".humidity");
  const windEl = card.querySelector(".wind");
  const countryCodeEl = card.querySelector(".country-code");
  const iconImg = card.querySelector(".weather-icon");

  setLoadingState(card, true);
  card.classList.remove("error");
  descriptionEl.textContent = "Updating…";

  try {
    const data = await fetchWeather(city);
    const { main, weather, wind, sys, name } = data;

    const condition = weather && weather[0] ? weather[0] : null;

    tempValueEl.textContent = Math.round(main.temp ?? 0);
    feelsLikeEl.textContent = `${Math.round(main.feels_like ?? 0)} °C`;
    humidityEl.textContent = `${main.humidity ?? 0} %`;
    windEl.textContent = `${Math.round((wind.speed ?? 0) * 3.6)} km/h`; // m/s to km/h

    descriptionEl.textContent = condition ? condition.description : "N/A";
    city === name || !name
      ? (countryCodeEl.textContent = sys.country || "")
      : (countryCodeEl.textContent = `${sys.country || ""} • ${name}`);

    if (condition && condition.icon) {
      iconImg.src = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
      iconImg.alt = condition.description || "Weather icon";
    }

    updatedAtEl.textContent = `Updated at ${formatTime()}`;
    updateLastUpdatedLabel();
  } catch (err) {
    console.error(err);
    card.classList.add("error");
    descriptionEl.textContent = err.message || "Unable to load weather.";
    updatedAtEl.textContent = "Last attempt failed.";
    showToast(err.message || "Unable to load weather.", true);
  } finally {
    setLoadingState(card, false);
  }
}

function addCity(city) {
  const trimmed = city.trim();
  if (!trimmed) return;

  const normalized = trimmed
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

  if (selectedCities.has(normalized)) {
    showToast(`"${normalized}" is already on the dashboard.`);
    return;
  }

  const card = createWeatherCard(normalized);
  selectedCities.set(normalized, card);
  loadCityWeather(normalized, card);
}

addPresetBtn.addEventListener("click", () => {
  const value = citySelect.value;
  if (!value) {
    citySelect.focus();
    return;
  }
  addCity(value);
  citySelect.selectedIndex = 0;
});

citySelect.addEventListener("change", () => {
  if (citySelect.value) {
    addCity(citySelect.value);
    citySelect.selectedIndex = 0;
  }
});

addCustomBtn.addEventListener("click", () => {
  const value = customCityInput.value;
  addCity(value);
  customCityInput.value = "";
  customCityInput.focus();
});

customCityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addCustomBtn.click();
  }
});

refreshAllBtn.addEventListener("click", () => {
  if (!selectedCities.size) {
    showToast("No cities to refresh yet.");
    return;
  }
  selectedCities.forEach((card, city) => {
    loadCityWeather(city, card);
  });
  showToast("Refreshing all cities…");
});

// Optionally pre-load a few cities for a nicer first experience
["London", "New York", "Tokyo"].forEach((city) => addCity(city));

