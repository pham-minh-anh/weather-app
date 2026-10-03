# Weather App

A small JavaScript weather app. Type in a location and it shows the current conditions, temperature and humidity, using live data from the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api).

Live Demo: https://pham-minh-anh.github.io/weather-app/

## Features

- Search for any city or place by name
- Shows the current condition, temperature (°F and °C) and humidity
- Weather icon based on the current condition
- Loading message while a search is running
- Error message when a location can't be found or the request fails

## Project structure

| File                | What it does                                                                     |
| ------------------- | -------------------------------------------------------------------------------- |
| `src/api.js`        | Fetches weather data from Visual Crossing and keeps only the fields the app uses |
| `src/dom.js`        | Handles the search form and draws the weather on the page                        |
| `src/template.html` | Page markup, plus styles for the weather cards and messages                      |
| `src/styles.css`    | Base page styles                                                                 |
| `src/index.js`      | Entry point that loads the styles and scripts                                    |

## Who did what

### My contribution

I built the app itself:

- Set up the project with webpack, html-webpack-plugin, the CSS loaders and Prettier
- Wrote `src/api.js`: the request to Visual Crossing with async/await, checking the HTTP response, catching errors, and cutting the response down to address, condition, humidity and temperature
- Wrote the first version of `src/dom.js`: the form submit handler that reads the location, calls the API and shows each field on the page
- Wrote the HTML page and all of `src/styles.css`

### Claude's contribution

[Claude Code](https://claude.ai/code), an AI coding assistant, improved how the weather is shown. It only changed `src/dom.js` and `src/template.html`, and wrote this README.

- Rewrote the display in `src/dom.js`: the place name as a heading with the update time, and separate cards for condition, temperature and humidity
- Added the °F / °C temperature, the rounded humidity percentage, and the condition icons
- Added the loading message, disabled the Search button while a search runs, and added the error messages for empty searches and failed or unknown locations (before this, `api.js` logged errors to the console but the page went blank)
- Shows "N/A" when a value is missing
- Added a `<style>` block in `src/template.html` for the new elements, and made the search box required and the results area announced to screen readers

Claude's changes are in the commit marked `Co-Authored-By: Claude`. Everything else in the history is mine.
