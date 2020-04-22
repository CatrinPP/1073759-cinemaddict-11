import AbstractComponent from './abstract-component.js';
import moment from 'moment';

const createFilmCardTemplate = (film) => {
  const genres = film.filmInfo.genre.join(`, `);
  const runtime = moment.duration(film.filmInfo.runtime, `m`);
  const runtimeToShow = runtime.hours() === 0 ? `${runtime.minutes()}m` : `${runtime.hours()}h ${runtime.minutes()}m`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${film.filmInfo.title}</h3>
      <p class="film-card__rating">${film.filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(film.filmInfo.release.date).format(`YYYY`)}</span>
        <span class="film-card__duration">${runtimeToShow}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src=${film.filmInfo.poster} alt="" class="film-card__poster">
      <p class="film-card__description">${film.filmInfo.description}</p>
      <a class="film-card__comments">${film.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button ${film.userDetails.isInWatchlist ? `film-card__controls-item--active` : ``} film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button ${film.userDetails.isAlreadyWatched ? `film-card__controls-item--active` : ``} film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button ${film.userDetails.isFavorite ? `film-card__controls-item--active` : ``} film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }

  setCardClickHandler(handler) {
    const cover = this.getElement().querySelector(`.film-card__poster`);
    const title = this.getElement().querySelector(`.film-card__title`);
    const comments = this.getElement().querySelector(`.film-card__comments`);

    cover.style = `cursor:pointer`;
    title.style = `cursor:pointer`;

    cover.addEventListener(`click`, handler);
    title.addEventListener(`click`, handler);
    comments.addEventListener(`click`, handler);
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

}
