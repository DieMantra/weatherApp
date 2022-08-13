// weather state object
export let state = {
	temperature: 0,
	humidity: 0,
	windSpeed: 0,
	windDirection: 0,
	weatherDescription: '',
	currentLocation: {},
	forecast: [],
	bookmarks: [],
	localPosition: {},
};
// save state in localStorage
export const saveLocalStorage = function () {
	localStorage.setItem('weatherData', JSON.stringify(state));
};
// load localastorage data
export const loadLocalStorage = () => {
	const weatherData = JSON.parse(localStorage.getItem('weatherData'));
	if (weatherData) {
		state = weatherData;
	}
};

import {
	capitalizeName,
	generateId,
	getCurrentLocationName,
	getWeatherData,
} from './helper.js';

// get weather data
export const searchLocationModel = async function (location) {
	try {
		const locationName = capitalizeName(location);

		const { weatherData, observationsData } = await getWeatherData(location);

		const weatherObject = createWeatherObject(
			weatherData,
			observationsData,
			locationName
		);

		state.forecast = createForecastObject(weatherData, locationName);
		if (checkBookmarks(locationName)) {
			// If location is not in bookmarks, add it to bookmarks
			state.bookmarks.push(weatherObject);
			state.currentLocation = weatherObject;
		} else {
			const bookmarkIndex = state.bookmarks.findIndex(
				(obj) => obj.location === locationName
			);
			state.bookmarks[bookmarkIndex] = weatherObject;
			state.currentLocation = weatherObject;
		}
	} catch (error) {
		throw error;
	}
};

export const getLocalPositionData = async function (lat, lng) {
	try {
		const location = await getCurrentLocationName(lat, lng);
		const locationName = capitalizeName(location);
		const { weatherData, observationsData } = await getWeatherData(location);
		const weatherObject = createWeatherObject(
			weatherData,
			observationsData,
			locationName
		);
		state.forecast = createForecastObject(weatherData, locationName);
		state.localPosition = weatherObject;
		state.currentLocation = weatherObject;
	} catch (error) {
		throw error;
	}
};

export const removeBookmark = (id) => {
	state.bookmarks = state.bookmarks.filter((bookmark) => {
		return bookmark.id !== id;
	});
};

const createWeatherObject = (weatherData, observations, locationName) => {
	const weatherObject = {
		location: locationName,
		id: generateId(),
		tempNow: weatherData.data[0].now.temp_now,
		tempMax: weatherData.data[0].temp_max,
		tempMin: weatherData.data[0].temp_min,
		uv: weatherData.data[0].uv.category,
		humidity: observations.data.humidity,
		windSpeed: observations.data.wind.speed_kilometre,
		rainChance: weatherData.data[0].rain.chance,
		icon: weatherData.data[0].icon_descriptor,
		description: weatherData.data[0].extended_text,
		shortText: weatherData.data[0].short_text,
	};
	return weatherObject;
};

const createForecastObject = (weatherData, locationName) => {
	const forecastObj = weatherData.data.map((data) => {
		return {
			location: locationName,
			id: generateId(),
			tempMax: data.temp_max,
			tempMin: data.temp_min,
			icon: data.icon_descriptor,
		};
	});
	return forecastObj;
};

const checkBookmarks = (locationName) => {
	// check if location is already in bookmarks
	const exists = state.bookmarks.find((bookmark) => {
		return bookmark.location === locationName;
	});
	return !exists;
};
