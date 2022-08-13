import { API_URL, GEO_API, GEO_KEY } from './config.js';

export function startTime() {
	const hours = document.getElementById('hours');
	const mins = document.getElementById('minutes');
	const secs = document.getElementById('seconds');

	const today = new Date();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	hours.textContent = h > 12 ? h - 12 : h;
	mins.textContent = m;
	secs.textContent = s;
	setTimeout(startTime, 1000);
}

export const getWeatherData = async function (location) {
	try {
		// get location code from location name
		const res = await fetch(`${API_URL}?search=${location}`);
		const { data } = await res.json();
		const geoHash = data[0].geohash;

		// get weather data from location code
		const weatherRes = await fetch(`${API_URL}/${geoHash}/forecasts/daily`);
		const weatherData = await weatherRes.json();

		// get weather observations from location code
		const observationsRes = await fetch(
			`${API_URL}/${geoHash.slice(0, -1)}/observations`
		);
		const observationsData = await observationsRes.json();

		if (!res.ok) throw new Error('No location code found');
		if (!weatherRes.ok) throw new Error('No weather data found');
		if (!observationsRes.ok) throw new Error('Weather observations not found');
		return { weatherData, observationsData };
	} catch (error) {
		throw error;
	}
};

export const getCurrentLocationName = async function (lat, lng) {
	try {
		const res = await fetch(
			`${GEO_API}?access_key=${GEO_KEY}&query=${lat},${lng}`
		);
		const { data } = await res.json();

		if (!res.ok) throw new Error('No location code found');
		// Current Location Name
		return data[0].administrative_area;
	} catch (error) {
		throw error;
	}
};

// get the current date
export function getDate() {
	const dateElement = document.querySelector('.date');
	const options = {
		weekday: 'short',
		year: '2-digit',
		month: 'short',
		day: 'numeric',
	};

	const today = new Date();
	const date = today.toLocaleDateString('en-AU', options);
	dateElement.textContent = date;
}
getDate();

function checkTime(i) {
	if (i < 10) {
		i = '0' + i;
	} // add zero in front of numbers < 10
	return i;
}

export const capitalizeName = (name) => {
	const nameArray = name.split(' ');
	const capitalizedName = nameArray
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ')
		.trim();
	return capitalizedName;
};

// generate random id
export const generateId = () => Math.random().toString(36).substr(2, 9);
