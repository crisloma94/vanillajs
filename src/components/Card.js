import './../styles/components/card.scss';

/**
 * Card component
 */
export default class Card {
	/**
	 * The class constructor
	 * @param  {string} title The title of film in the card
	 * @param  {string} src The path to the image of the film in the card
	 * @param  {string} year The year of the film in the card
	 * @param  {string} rating The  rating of the film in the card
	 * @param  {string} description The description of the film in the card
	 */
	constructor(title, src, year, rating, description) {
		this.title = title;
		this.src = src;
		this.year = year;
		this.rating = rating;
		this.description = description;
	}

	/**
	 * Returns the HTML of the component
	 */
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
