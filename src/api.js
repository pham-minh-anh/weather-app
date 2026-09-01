export async function fetchWeatherByLocation(location) {
  let encodedLocation = encodeURIComponent(location);
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?key=VGV9T283HDXG2V5KPEYGTKDMA`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const cleanedData = {
      address: data.address,
      condition: data.currentConditions.conditions,
      humidity: data.currentConditions.humidity,
      temp: data.currentConditions.temp,
    };
    return cleanedData;
  } catch (error) {
    console.error(`Fetch failed:`, error.message);
  }
}
