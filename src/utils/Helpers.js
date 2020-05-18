export const Helpers = (() => {
	'use strict';

	let methods = {};

	methods.compareValues = (key, order = 'asc') => {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
			const comparison = a[key].localeCompare(b[key]);
			return order === 'desc' ? comparison * -1 : comparison;
		};
	};

	return methods;
})();
