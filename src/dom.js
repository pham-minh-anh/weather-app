import { fetchWeatherByLocation } from "./api.js";

const form = document.querySelector("form");
const container = document.querySelector(".container");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  container.replaceChildren();

  const location = form.elements.location.value.trim();
  if (!location) {
    return;
  }

  const weatherData = await fetchWeatherByLocation(location);

  for (let key in weatherData) {
    const div = document.createElement("div");
    div.classList.add("display");

    const title = document.createElement("h2");
    title.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    div.appendChild(title);

    const data = document.createElement("p");
    data.textContent = weatherData[key];
    div.appendChild(data);

    container.appendChild(div);
  }
});
