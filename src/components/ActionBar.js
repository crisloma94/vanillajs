import Input from './Input';
import Select from './Select';

import './../styles/components/ActionBar.scss';

import * as searchIcon from './../assets/images/search-icon.png';
export default class ActionBar {
	/**
	 * The class constructor
	 */
	constructor() {
		this.inputSearch = new Input('text', 'searchInput', 'action-item', 'search', '', 'Type something...');
		this.orderBy = new Select('orderBy', 'select-order-by', 'orderBy', [ { value: 'Year', label: 'Year' }, { value: 'imdbRating', label: 'Rating' } ]);
		this.submitButton = new Input('submit', 'searchSubmit', 'action-item btn btn-submit', 'submit', 'Search', '');
	}

	/**
	 * Returns the HTML of the component
	 */
	render() {
		return `
			<form id="action-bar" class="box">
				<img class="search-icon" src="${searchIcon.default}" alt="search-icon">
				${this.inputSearch.render()}
				<div class="action-item">
					<label for="orderBy">Order by: </label>
					${this.orderBy.render()}
				</div>
				${this.submitButton.render()}
			</form>
		`;
	}
}
