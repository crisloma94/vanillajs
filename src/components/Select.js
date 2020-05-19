import './../styles/components/select.scss';

/**
 * Select component
 */
export default class Select {
	/**
	 * The class constructor
	 * @param  {string} id The HTML ID of the component
	 * @param  {string} classes The HTML classes of the component
	 * @param  {string} name The HTML name of the component
	 * @param  {array} options An array with the options in the select dropdown
	 */
	constructor(id, classes, name, options) {
		this.id = id;
		this.classes = classes;
		this.name = name;
		this.options = options;
	}

	/**
	 * Returns the HTML of the component
	 */
	render() {
		return `
			<select id="${this.id}" class="${this.classes}" name="${this.name}">
				${this.options.map((option) => {
					return `<option value="${option.value}">${option.label}</option>`;
				})}	
			</select>
		`;
	}
}
