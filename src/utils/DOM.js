export const DOM = (() => {
	'use strict';

	let methods = {};

	methods.render = (template, node) => {
		if (!node) return;
		node.innerHTML = template;
	};

	return methods;
})();
