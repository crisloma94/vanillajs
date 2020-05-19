import { DOM } from './../utils/DOM';
import { Helpers } from './../utils/Helpers';

import ActionBar from './../components/ActionBar';
import Card from './../components/Card';
import Spinner from './../components/Spinner';

import './../styles/views/searchPage.scss';

import * as constants from './../config/constants';

import * as poster from './../assets/images/default-poster.png';

/**
 * Page with a movie and series searcher
 */
export default class SearchPage {
	/**
	 * The class constructor
	 */
	constructor() {
		this.actionBar = new ActionBar();
		this.card = new Card();
		this.spinner = new Spinner();
	}

	/**
	 * Initializes the component, calls the render method
	 */
	init() {
		DOM.render(this.render(), document.querySelector('#main'));
		const actionBar = document.getElementById('action-bar');
		actionBar.addEventListener('submit', () => {
			this.handleSearch(this);
		});
	}

	/**
	 * Returns the HTML of the component
	 */
	render() {
		return `
			<div class="container">
				${this.actionBar.render()}            
				<div id="results"></div>
			</div>
        `;
	}

	/**
	 * Calls the omdbAPI and prints the result
	 * @param  {object} self The context of the SearchPage class
	 */
	handleSearch(self) {
		event.preventDefault();
		self.clearSearch();
		self.loadSpinner();
		const textToSearch = document.getElementById('searchInput').value;

		/**
		 * Calls the omdbAPI in search mode and gets the result
		 * @param  {String} text The text the user inserted as input
		 */
		async function getFilms(text) {
			try {
				let response = await fetch(constants.SEARCH_URL_API + text);
				let data = await response.json();
				let films = await data.Search;
				return films;
			} catch (err) {
				self.clearSearch();
				self.appendNoResultsMessage(textToSearch);
			}
		}

		/**
		 * Calls the omdbAPI by ID and gets the plot and the imdbRating of the film with that ID
		 * @param  {String} imdbID The ID of the film
		 */
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
				self.appendNoResultsMessage(textToSearch);
			}
		}

		// Call getFilms to get all the films and call getFilmData for each film
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
						self.appendNoResultsMessage(textToSearch);
					}
				})
				.then((finalFilms) => {
					if (finalFilms != undefined) {
						setTimeout(() => {
							self.clearSearch();
							Promise.all(finalFilms).then((finalFilms) => {
								finalFilms = self.order(finalFilms).slice(0, constants.MAX_RESULTS);
								finalFilms.map((film) => {
									//Create an instance of the card component for each film and append the result
									let filmCard = new Card(film.Title, film.Poster != 'N/A' ? film.Poster : poster.default, film.Year, film.imdbRating, film.Plot);
									self.appendResultItem(filmCard.render());
								});
							});
						}, 2000);
					}
				});
		} else {
			self.clearSearch();
			self.appendNoInputMessage();
		}
	}

	/**
	 * Prints a loading spinner in the results div
	 */
	loadSpinner() {
		this.clearSearch();
		DOM.render(this.spinner.render(), document.getElementById('results'));
	}

	/**
	 * Sorts out an array depending on the user input
	 * @param  {Array} array A keyed array
	 */
	order(array) {
		const key = document.getElementById('orderBy').value;
		return array.sort(Helpers.compareValues(key, 'desc'));
	}

	/**
	 * Clears out the results div
	 */
	clearSearch() {
		document.getElementById('results').innerHTML = '';
	}

	/**
	 * Creates an unordered list in the results div and appends a list item to it
	 * @param  {String} item The content of the list item to append
	 */
	appendResultItem(item) {
		if (!document.getElementById('search-results')) {
			let unorderedList = document.createElement('ul');
			unorderedList.id = 'search-results';
			document.getElementById('results').appendChild(unorderedList);
		}
		let listItem = document.createElement('li');
		listItem.innerHTML = item;
		document.getElementById('search-results').appendChild(listItem);
	}

	/**
	 * Appends a "no results" message in the results div
	 * @param  {String} text The text the user set as input to search for
	 */
	appendNoResultsMessage(text) {
		let noResultsDiv = document.createElement('div');
		noResultsDiv.id = 'no-results';
		noResultsDiv.innerHTML = 'We did not find anything with "' + text + '"';
		document.getElementById('results').appendChild(noResultsDiv);
	}

	/**
	 * Appends a "no input" message in the results div
	 */
	appendNoInputMessage() {
		let noInputDiv = document.createElement('div');
		noInputDiv.id = 'no-input';
		noInputDiv.innerHTML = 'Please, introduce something to search';
		document.getElementById('results').appendChild(noInputDiv);
	}
}
