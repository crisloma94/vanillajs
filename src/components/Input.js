import './../styles/components/input.scss';
export default class Input {
	constructor(type, id, classes, name, value, placeholder) {
		this.type = type;
		this.id = id;
		this.classes = classes;
		this.name = name;
		this.value = value;
		this.placeholder = placeholder;
	}

	render() {
		return `
			<input type="${this.type}" id="${this.id}" class="${this.classes}" name="${this.name}" placeholder="${this.placeholder}" value="${this.value}">
		`;
	}
}
