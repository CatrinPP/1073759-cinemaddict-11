import FilmController from '../controllers/film.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsListExtraComponent from '../components/films-list-extra.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {FILM_CARDS_EXTRA_COUNT, RenderPosition, SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON, SortType} from '../const.js';
import {remove, render} from '../utils.js';

export default class PageController {
  constructor(container, sortComponent) {
    this._container = container;
    this._sortComponent = sortComponent;
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListTopRatedComponent = new FilmsListExtraComponent(`Top rated`);
    this._filmsListMostCommentedComponent = new FilmsListExtraComponent(`Most commented`);
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._currentFilmsList = [];
    this._filmsListElement = null;
    this._filmsListContainerElement = null;
    this._films = [];

    this._renderFilmCards = this._renderFilmCards.bind(this);
    this._getSortedFilms = this._getSortedFilms.bind(this);
    this. _onShowMoreButtonClick = this. _onShowMoreButtonClick.bind(this);
    this. _renderShowMoreButton = this. _renderShowMoreButton.bind(this);
    this. _onSortTypeChange = this. _onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHadler(this._onSortTypeChange);
  }

  _renderFilmCards(array, container, count) {
    for (let i = 0; i < count; i++) {
      const filmController = new FilmController(container);
      filmController.render(array[i]);
    }
  }

  _getSortedFilms(films, sortType) {
    let sortedFilms = [];
    const showingFilms = films.slice();

    switch (sortType) {
      case SortType.DATE:
        sortedFilms = showingFilms.sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
        break;

      case SortType.RATING:
        sortedFilms = showingFilms.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;

      case SortType.DEFAULT:
        sortedFilms = showingFilms;
        break;
    }

    return sortedFilms;
  }

  _onShowMoreButtonClick() {
    const prevFilmCardsCount = this._showingFilmCardsCount;
    this._showingFilmCardsCount = this._showingFilmCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;
    const filmsToShow = this._currentFilmsList.slice(prevFilmCardsCount, this._showingFilmCardsCount);
    this._renderFilmCards(filmsToShow, this._filmsListContainerElement, filmsToShow.length);

    if (this._showingFilmCardsCount >= this._currentFilmsList.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showingFilmCardsCount >= this._currentFilmsList.length) {
      return;
    }

    render(this._filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onSortTypeChange(sortType) {
    this._showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._currentFilmsList = this._getSortedFilms(this._films, sortType);

    this._filmsListContainerElement.innerHTML = ``;
    this._renderFilmCards(this._currentFilmsList, this._filmsListContainerElement, this._showingFilmCardsCount);
    this._renderShowMoreButton();
  }

  render(films) {
    const container = this._container.getElement();
    this._films = films;
    this._currentFilmsList = this._films.slice();

    if (!this._currentFilmsList.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const filmsSortedByRating = this._currentFilmsList.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const filmsSortedByCommentsCount = this._currentFilmsList.slice().sort((a, b) => b.comments.length - a.comments.length);

    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);

    this._filmsListElement = container.querySelector(`.films-list`);
    this._filmsListContainerElement = this._filmsListElement.querySelector(`.films-list__container`);
    const filmsListExtraElements = Array.from(container.querySelectorAll(`.films-list--extra`));

    this._renderFilmCards(this._currentFilmsList, this._filmsListContainerElement, this._showingFilmCardsCount);

    filmsListExtraElements.forEach((element) => {
      if (element.querySelector(`h2`).textContent === `Top rated`) {
        this._renderFilmCards(filmsSortedByRating, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
      } else {
        this._renderFilmCards(filmsSortedByCommentsCount, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
      }
    });

    this._renderShowMoreButton();
  }
}
