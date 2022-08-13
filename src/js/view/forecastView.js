import clouds from 'url:../../assets/icons/clouds.png';
import moon from 'url:../../assets/icons/moon-symbol.png';
import shower from 'url:../../assets/icons/shower.png';
import sunny from 'url:../../assets/icons/sunny.png';

const renderMarkup = function (object, i) {
	// get current day
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const today = new Date().getDay();
	const time = new Date().getHours();
	const day = days[today + i > 6 ? -1 + i : today + i];

	let iconPath = sunny;
	if (object.icon === 'clear' && time > 18 && time < 6) iconPath = moon;
	if (object.icon === 'mostly_sunny' && time > 18 && time < 6) iconPath = moon;
	if (object.icon === 'mostly_cloudy' && time > 18 && time < 6) iconPath = moon;
	if (object.icon === 'mostly_sunny') iconPath = sunny;
	if (object.icon === 'clear') iconPath = sunny;
	if (object.icon === 'mostly_cloudy') iconPath = clouds;
	if (object.icon === 'shower') iconPath = shower;
	if (object.icon === 'rain') iconPath = shower;

	const markup = `
		<li class="day-one">
			<img
				src="${iconPath}"
				alt=""
				class="day-one--image"
			/>
			<p class="day-one--text">${day}</p>
			<p class="day-one--temp">${object.tempMax}° | ${object.tempMin}°</p>
		</li>
	`;
	return markup;
};

export const renderForecast = function (forecast) {
	const forecastElement = document.querySelector('.forecast__list');
	const markup = forecast.map((data, i) => renderMarkup(data, i)).join('');

	forecastElement.innerHTML = '';
	forecastElement.insertAdjacentHTML('afterbegin', markup);
};
