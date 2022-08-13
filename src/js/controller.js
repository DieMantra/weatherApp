import { renderBackgroundImage } from '../js/view/backgroundImageView.js';
import {
	removeActiveStyles,
	renderNewBookmarks,
	styleCurrentLocation,
} from '../js/view/bookmarksView.js';
import { renderForecast } from '../js/view/forecastView.js';
import { renderLeftPanel } from '../js/view/leftPanelView.js';
import { clearLoader, renderLoader } from '../js/view/renderLoader.js';
import { renderWeatherDetails } from '../js/view/weatherDetailsView.js';
import { startTime } from './helper.js';
import {
	getLocalPositionData,
	loadLocalStorage,
	removeBookmark,
	saveLocalStorage,
	searchLocationModel,
	state,
} from './model.js';
startTime();

const searchForm = document.querySelector('.search-form');
const searchFormContainer = document.querySelector('.search-form__container');
const searchInput = searchForm.querySelector('.form--input-search');
const locationBookmarks = document.querySelector('.location-list');

// clicking a bookmark in the list
locationBookmarks.addEventListener('click', (e) => {
	const bookmark = e.target.closest('.bookmark');
	const local = e.target.closest('.localPosition');
	const undoBookmark = e.target.closest('.location-list__bookmark-icon');

	if (undoBookmark) {
		const location = bookmark.getAttribute('id');
		removeBookmark(location);
		renderNewBookmarks(state.bookmarks);
		startLocalPosition();
	} else {
		if (bookmark) {
			const location = bookmark.getAttribute('value');
			searchWeatherLocation(location);
		}
		if (local) {
			navigator.geolocation.getCurrentPosition(getCurrentLocation);
		}
	}
});

// on submit get location and weather
searchForm.addEventListener('submit', async function (e) {
	e.preventDefault();
	const location = searchInput.value;
	searchWeatherLocation(location);
});
searchFormContainer.addEventListener('click', (e) => {
	const target = e.target.closest('.search-button');
	if (!target) return;
	if (searchInput.value === '') return;
	const location = searchInput.value;
	searchWeatherLocation(location);
});

const searchWeatherLocation = async function (location) {
	try {
		renderLoader();
		await searchLocationModel(location);
		clearLoader();
		searchInput.value = '';

		renderNewBookmarks(state.bookmarks);

		// set styles on current location
		styleCurrentLocation(state.currentLocation);

		// render current weather data Left Panel
		renderLeftPanel(state.currentLocation);

		// render weather details right panel
		renderWeatherDetails(state.currentLocation);

		renderBackgroundImage(state.currentLocation);

		renderForecast(state.forecast);
		saveLocalStorage();
	} catch (error) {
		console.log(error);
		clearLoader();
	}
};

const renderCurrentWeatherData = function () {
	renderLeftPanel(state.currentLocation);
};

const getCurrentLocation = async function (pos) {
	try {
		renderLoader();
		const { latitude } = pos.coords;
		const { longitude } = pos.coords;
		await getLocalPositionData(latitude, longitude);

		removeActiveStyles(state.bookmarks);
		styleCurrentLocation(state.currentLocation, true);

		renderCurrentWeatherData();
		renderWeatherDetails(state.currentLocation);
		renderBackgroundImage(state.currentLocation);
		renderForecast(state.forecast);
		clearLoader();
		saveLocalStorage();
	} catch (error) {
		console.log(error);
		clearLoader();
	}
};

const startLocalPosition = function () {
	navigator.geolocation.getCurrentPosition(getCurrentLocation);
};
startLocalPosition();

const init = function () {
	// save state in localStorage
	loadLocalStorage();

	renderNewBookmarks(state.bookmarks);
};
init();
