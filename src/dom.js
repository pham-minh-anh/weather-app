import { fetchWeatherByLocation } from "./api.js";

const form = document.querySelector("form");
const container = document.querySelector(".container");
const submitButton = form.querySelector("button[type='submit']");

// The API is called without a unitGroup, so it returns US units (°F).
const fahrenheitToCelsius = (f) => ((f - 32) * 5) / 9;

const conditionIcons = [
  ["thunder", "⛈️"],
  ["snow", "❄️"],
  ["rain", "🌧️"],
  ["drizzle", "🌦️"],
  ["fog", "🌫️"],
  ["mist", "🌫️"],
  ["overcast", "☁️"],
  ["partially cloudy", "⛅"],
  ["cloud", "☁️"],
  ["clear", "☀️"],
];

function getConditionIcon(condition = "") {
  const lower = condition.toLowerCase();
  const match = conditionIcons.find(([keyword]) => lower.includes(keyword));
  return match ? match[1] : "🌡️";
}

function createCard(label, value, icon) {
  const div = document.createElement("div");
  div.classList.add("display");

  const title = document.createElement("h2");
  title.textContent = `${icon} ${label}`;
  div.appendChild(title);

  const data = document.createElement("p");
  data.textContent = value;
  div.appendChild(data);

  return div;
}

function showMessage(text, type = "info") {
  const message = document.createElement("p");
  message.classList.add("message", type);
  message.textContent = text;
  container.replaceChildren(message);
}

function renderWeather({ address, condition, humidity, temp }) {
  const header = document.createElement("div");
  header.classList.add("weather-header");

  const place = document.createElement("h2");
  place.textContent = `📍 ${address}`;
  header.appendChild(place);

  const updated = document.createElement("p");
  updated.textContent = `Updated at ${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  header.appendChild(updated);

  const cards = document.createElement("div");
  cards.classList.add("weather-cards");

  const tempText =
    typeof temp === "number"
      ? `${Math.round(temp)}°F / ${Math.round(fahrenheitToCelsius(temp))}°C`
      : "N/A";
  const humidityText =
    typeof humidity === "number" ? `${Math.round(humidity)}%` : "N/A";

  cards.append(
    createCard("Condition", condition || "N/A", getConditionIcon(condition)),
    createCard("Temperature", tempText, "🌡️"),
    createCard("Humidity", humidityText, "💧"),
  );

  container.replaceChildren(header, cards);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const location = form.elements.location.value.trim();
  if (!location) {
    showMessage("Please enter a location to search.", "error");
    return;
  }

  submitButton.disabled = true;
  container.setAttribute("aria-busy", "true");
  showMessage(`Loading weather for "${location}"...`);

  const weatherData = await fetchWeatherByLocation(location);

  submitButton.disabled = false;
  container.setAttribute("aria-busy", "false");

  if (!weatherData) {
    showMessage(
      `Couldn't find weather for "${location}". Check the spelling and try again.`,
      "error",
    );
    return;
  }

  renderWeather(weatherData);
});
