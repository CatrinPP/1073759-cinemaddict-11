import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/films-details.js';
import {ESC_KEYCODE, RenderPosition} from '../const.js';
import {remove, render, replace} from '../utils.js';

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._cardComponent = null;
    this._popupComponent = null;
    this._film = null;

    this._onPopupCloseButtonClick = this._onPopupCloseButtonClick.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  _closePopup() {
    remove(this._popupComponent);
    this._onDataChange(this, this._film, this._film);
  }

  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this.setDefaultView();
    }
  }

  _onPopupCloseButtonClick() {
    this.setDefaultView();
  }

  _onFilmCardClick() {
    this._onViewChange();
    render(document.body, this._popupComponent, RenderPosition.BEFOREEND);
    this._popupComponent.setClickHandler(this._onPopupCloseButtonClick);
    this._popupComponent.setEmojiClickHandler();
    document.addEventListener(`keydown`, this._onEscPress);
  }

  setDefaultView() {
    this._closePopup();
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  render(film) {
    this._film = film;
    const oldCard = this._cardComponent;
    this._cardComponent = new FilmCardComponent(film);
    this._popupComponent = new FilmDetailsComponent(film);
    this._cardComponent.setCardClickHandler(this._onFilmCardClick);
    this._cardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        userDetails: {
          isInWatchlist: !this._film.userDetails.isInWatchlist,
          isAlreadyWatched: this._film.userDetails.isAlreadyWatched,
          isFavorite: this._film.userDetails.isFavorite,
        }
      }));
    });
    this._cardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        userDetails: {
          isAlreadyWatched: !this._film.userDetails.isAlreadyWatched,
          isInWatchlist: this._film.userDetails.isInWatchlist,
          isFavorite: this._film.userDetails.isFavorite,
        }
      }));
    });
    this._cardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        userDetails: {
          isFavorite: !this._film.userDetails.isFavorite,
          isInWatchlist: this._film.userDetails.isInWatchlist,
          isAlreadyWatched: this._film.userDetails.isAlreadyWatched,
        }
      }));
    });

    if (oldCard) {
      replace(this._cardComponent, oldCard);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }
}
