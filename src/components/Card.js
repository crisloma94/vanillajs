import './../styles/components/card.scss';

export default class Card {
	constructor(title, src, year, rating, description) {
		this.title = title;
		this.src = src;
		this.year = year;
		this.rating = rating;
		this.description = description;
	}

	render() {
		return `
			<div class="card box">
				<img src="${this.src}" alt="${this.title}">
				<div class="title">${this.title}</div>
				<div class="info">
					<span class="info-title">Year: </span>
					${this.year}
				</div>
				<div class="info">
					<span class="info-title">imdbRating: </span>
					${this.rating}
				</div>
				<div class="description">${this.description}</div>
			</div>
		`;
	}
}
