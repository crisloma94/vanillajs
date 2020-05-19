import './../styles/components/input.scss';

/**
 * Input component
 */
export default class Input {
	/**
	 * The class constructor
	 * @param  {string} type The input type
	 * @param  {string} id The HTML ID of the component
	 * @param  {string} classes The HTML classes of the component
	 * @param  {string} name The HTML name of the component
	 * @param  {string} value The HTML value of the component
	 * @param  {string} placeholder The HTML placeholder of the component
	 */
	constructor(type, id, classes, name, value, placeholder) {
		this.type = type;
		this.id = id;
		this.classes = classes;
		this.name = name;
		this.value = value;
		this.placeholder = placeholder;
	}

	/**
	 * Returns the HTML of the component
	 */
	render() {
		return `
			<input type="${this.type}" id="${this.id}" class="${this.classes}" name="${this.name}" placeholder="${this.placeholder}" value="${this.value}">
		`;
	}
}
