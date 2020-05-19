import SearchPage from './views/SearchPage';

import './styles/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
	//Creates an instance of the SearchPage class and initializes it
	let searchPage = new SearchPage();
	searchPage.init();
});
