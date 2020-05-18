import './../styles/components/select.scss';

export default class Select {
	constructor(id, classes, name, options) {
		this.id = id;
		this.classes = classes;
		this.name = name;
		this.options = options;
	}

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
