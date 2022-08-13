import clouds from 'url:../../assets/images/clouds.jpg';
import night from 'url:../../assets/images/night.jpg';
import rain from 'url:../../assets/images/rain.jpg';
import storm from 'url:../../assets/images/storm.jpg';
import sunnyDay from 'url:../../assets/images/sunny-day.jpg';
import sunnyMorning from 'url:../../assets/images/sunny-morning.jpg';

const weatherContainer = document.querySelector('.main__container');
const body = document.querySelector('body');

export const renderBackgroundImage = function (weatherData) {
	// get current time
	const time = new Date().getHours();
	let iconPath = sunnyDay;
	if (weatherData.icon === 'clear' && time <= 9 && time > 6)
		iconPath = sunnyMorning;
	if (weatherData.icon === 'clear' && time < 18 && time > 9)
		iconPath = sunnyDay;
	if (weatherData.icon === 'clear' && time > 18 && time < 6) iconPath = night;
	if (weatherData.icon === 'mostly_sunny') iconPath = sunnyDay;
	if (weatherData.icon === 'sunny') iconPath = sunnyDay;
	if (weatherData.icon === 'clear') iconPath = sunnyDay;
	if (weatherData.icon === 'mostly_cloudy') iconPath = clouds;
	if (weatherData.icon === 'shower') iconPath = rain;
	if (weatherData.icon === 'rain') iconPath = rain;
	if (weatherData.icon === 'storm') iconPath = storm;

	weatherContainer.style.backgroundImage = `url(${iconPath})`;
	body.style.backgroundImage = `url(${iconPath})`;
};
