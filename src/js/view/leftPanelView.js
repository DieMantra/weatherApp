import clouds from 'url:../../assets/icons/clouds.png';
import moon from 'url:../../assets/icons/moon-symbol.png';
import shower from 'url:../../assets/icons/shower.png';
import sunny from 'url:../../assets/icons/sunny.png';

export const renderLeftPanel = function (weatherData) {
	const header = document.querySelector('.left-panel--header');
	const temp = document.querySelector('.left-panel__temperature');
	const icon = document.querySelector('.left-panel__icon-container--image');
	const description = document.querySelector(
		'.left-panel__icon-container--text'
	);

	const time = new Date().getHours();
	let iconPath = sunny;
	if (weatherData.icon === 'clear' && time > 18 && time < 6) iconPath = moon;
	if (weatherData.icon === 'mostly_sunny' && time > 18 && time < 6)
		iconPath = moon;
	if (weatherData.icon === 'mostly_cloudy' && time > 18 && time < 6)
		iconPath = moon;
	if (weatherData.icon === 'mostly_sunny') iconPath = sunny;
	if (weatherData.icon === 'clear') iconPath = sunny;
	if (weatherData.icon === 'mostly_cloudy') iconPath = clouds;
	if (weatherData.icon === 'shower') iconPath = shower;
	if (weatherData.icon === 'rain') iconPath = shower;

	header.textContent = weatherData.location;
	temp.textContent = `${weatherData.tempNow}°`;
	description.textContent = weatherData.shortText
		? weatherData.shortText
		: weatherData.icon;
	icon.src = `${iconPath}`;
};
