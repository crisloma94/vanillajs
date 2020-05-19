export const Helpers = (() => {
	'use strict';

	let methods = {};

	/**
	 * Orders a keyed array based on a given key
	 * @param  {String} key The key for the order to be based on
	 * @param  {String} order 'asc' to order from highest to lowes, 'desc' to order from lowest to highest
	 */
	methods.compareValues = (key, order = 'asc') => {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
			const comparison = a[key].localeCompare(b[key]);
			return order === 'desc' ? comparison * -1 : comparison;
		};
	};

	return methods;
})();
