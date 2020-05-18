import { DOM } from './../utils/DOM';
import { Helpers } from './../utils/Helpers';

import ActionBar from './../components/ActionBar';
import Card from './../components/Card';
import Spinner from './../components/Spinner';

import './../styles/views/searchPage.scss';

import * as constants from './../config/constants';

import * as poster from './../assets/images/default-poster.png';
export default class SearchPage {
	constructor() {
		this.actionBar = new ActionBar();
		this.card = new Card();
		this.spinner = new Spinner();
	}

	init() {
		DOM.render(this.render(), document.querySelector('#main'));
		const submitButton = document.getElementById('searchSubmit');
		submitButton.addEventListener('click', () => {
			this.handleSearch(this);
		});
	}

	render() {
		return `
			<div class="container">
				${this.actionBar.render()}            
				<div id="results"></div>
			</div>
        `;
	}

	handleSearch(self) {
		self.clearSearch();
		self.loadSpinner();
		const textToSearch = document.getElementById('searchInput').value;

		async function getFilms(text) {
			try {
				let response = await fetch(constants.SEARCH_URL_API + text);
				let data = await response.json();
				let films = await data.Search;
				return films;
			} catch (err) {
				self.clearSearch();
				self.noResults(textToSearch);
			}
		}

		async function getFilmData(imdbID) {
			try {
				let response = await fetch(constants.SEARCH_ID_URL_API + imdbID);
				let data = await response.json();
				return {
					imdbRating: data.imdbRating,
					Plot: data.Plot,
				};
			} catch (err) {
				self.clearSearch();
				self.noResults(textToSearch);
			}
		}

		if (textToSearch) {
			getFilms(textToSearch)
				.then((films) => {
					try {
						return films.map((film) => {
							return getFilmData(film.imdbID).then((newData) => {
								return { ...film, ...newData };
							});
						});
					} catch (err) {
						self.clearSearch();
						self.noResults(textToSearch);
					}
				})
				.then((finalFilms) => {
					if (finalFilms != undefined) {
						setTimeout(() => {
							self.clearSearch();
							Promise.all(finalFilms).then((finalFilms) => {
								finalFilms = self.orderBy(finalFilms).slice(0, constants.MAX_RESULTS);
								finalFilms.map((film) => {
									let filmCard = new Card(film.Title, film.Poster != 'N/A' ? film.Poster : poster.default, film.Year, film.imdbRating, film.Plot);
									self.appendResultItem(filmCard.render());
								});
							});
						}, 2000);
					}
				});
		} else {
			self.clearSearch();
			self.noInput();
		}
	}

	loadSpinner() {
		this.clearSearch();
		DOM.render(this.spinner.render(), document.getElementById('results'));
	}

	orderBy(array) {
		const key = document.getElementById('orderBy').value;
		return array.sort(Helpers.compareValues(key, 'desc'));
	}

	clearSearch() {
		document.getElementById('results').innerHTML = '';
	}

	appendResultItem(item) {
		if (!document.getElementById('search-results')) {
			let unorderedList = document.createElement('UL');
			unorderedList.id = 'search-results';
			document.getElementById('results').appendChild(unorderedList);
		}
		let listItem = document.createElement('LI');
		listItem.innerHTML = item;
		document.getElementById('search-results').appendChild(listItem);
	}

	noResults(text) {
		let noResultsDiv = document.createElement('DIV');
		noResultsDiv.id = 'no-results';
		noResultsDiv.innerHTML = 'We did not find anything with "' + text + '"';
		document.getElementById('results').appendChild(noResultsDiv);
	}

	noInput() {
		let noInputDiv = document.createElement('DIV');
		noInputDiv.id = 'no-input';
		noInputDiv.innerHTML = 'Please, introduce something to search';
		document.getElementById('results').appendChild(noInputDiv);
	}
}
