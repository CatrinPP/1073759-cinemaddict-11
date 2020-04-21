import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/films-details.js';
import {ESC_KEYCODE, RenderPosition} from '../const.js';
import {remove, render} from '../utils.js';

export default class FilmController {
  constructor(container) {
    this._container = container;
    this._cardComponent = null;
    this._popupComponent = null;

    this._onPopupCloseButtonClick = this._onPopupCloseButtonClick.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  _closePopup() {
    remove(this._popupComponent);
  }

  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }

  _onPopupCloseButtonClick() {
    this._closePopup();
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  _onFilmCardClick() {
    render(document.body, this._popupComponent, RenderPosition.BEFOREEND);
    this._popupComponent.setClickHandler(this._onPopupCloseButtonClick);
    this._popupComponent.setWatchlistCheckboxClickHandler(() => {});
    this._popupComponent.setWatchedCheckboxClickHandler(() => {});
    this._popupComponent.setFavoriteCheckboxClickHandler(() => {});
    document.addEventListener(`keydown`, this._onEscPress);
  }

  render(film) {
    this._cardComponent = new FilmCardComponent(film);
    this._popupComponent = new FilmDetailsComponent(film);
    this._cardComponent.setCardClickHandler(this._onFilmCardClick);
    this._cardComponent.setWatchlistButtonClickHandler(() => {});
    this._cardComponent.setWatchedButtonClickHandler(() => {});
    this._cardComponent.setFavoriteButtonClickHandler(() => {});

    render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
  }
}
