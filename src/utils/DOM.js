export const DOM = (() => {
	'use strict';

	let methods = {};

	/**
	 * Prints content inside a given node
	 * @param  {String} template The content you want to print
	 * @param  {Node} node The HTML node where you want to insert the content
	 */
	methods.render = (template, node) => {
		if (!node) return;
		node.innerHTML = template;
	};

	return methods;
})();
