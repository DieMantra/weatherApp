export const renderLoader = () => {
	const loader = document.querySelector('.loading-balls');
	loader.style.visibility = 'visible';
};
export const clearLoader = () => {
	const loader = document.querySelector('.loading-balls');
	loader.style.visibility = 'hidden';
};
