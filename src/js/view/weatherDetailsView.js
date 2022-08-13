import { capitalizeName } from '../helper.js';

export const renderWeatherDetails = function (weatherObject) {
	const humidity = document.querySelector('.weather-details__humidity');
	const windSpeed = document.querySelector('.weather-details__wind');
	const uv = document.querySelector('.weather-details__uv');
	const rain = document.querySelector('.weather-details__rain');

	humidity.textContent = `${weatherObject.humidity}%`;
	windSpeed.textContent = `${weatherObject.windSpeed} km/h`;
	uv.textContent = `${capitalizeName(weatherObject.uv)}`;
	rain.textContent = `${weatherObject.rainChance}%`;
};
