import icons from 'url:../../assets/icons/icons8-bookmark-fill.svg';

const createMarkup = function (bookmark) {
	const markup = `
      <li id="${bookmark.id}" value="${bookmark.location}" class="location-list__item bookmark">
         <p class="location-list__location">${bookmark.location}</p>
         <img
            src="${icons}"
            alt="bookmarked"
            class="location-list__bookmark-icon"
         />
      </li>
   `;
	return markup;
};

export const renderNewBookmarks = function (bookmarksArr) {
	const markup = bookmarksArr
		.map((bookmark) => {
			return createMarkup(bookmark);
		})
		.join('');

	const currentLocation = `
      <li value="currentLocation" id="localPosition" class="location-list__item--base localPosition">
         <p class="location-list__location">Current Location</p>
      </li>
   `;
	const locationList = document.querySelector('.location-list');
	locationList.innerHTML = '';
	locationList.insertAdjacentHTML('afterbegin', currentLocation + markup);
};

export const styleCurrentLocation = function (currentLocation, local = false) {
	const currEl = document.getElementById(
		`${local ? 'localPosition' : currentLocation.id}`
	);
	currEl.classList.add('location-active');
};

export const removeActiveStyles = function (bookmarks) {
	bookmarks.forEach((bookmark) => {
		const currEl = document.getElementById(`${bookmark.id}`);
		currEl.classList.remove('location-active');
	});
};
