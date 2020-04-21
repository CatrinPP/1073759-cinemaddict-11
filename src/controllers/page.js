import FilmController from '../controllers/film.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsListExtraComponent from '../components/films-list-extra.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import {FILM_CARDS_EXTRA_COUNT, RenderPosition, SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON, SortType} from '../const.js';
import {remove, render} from '../utils.js';

const getSortedFilms = (films, sortType) => {
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
};

const renderFilmCards = (array, container, count) => {
  for (let i = 0; i < count; i++) {
    const filmController = new FilmController(container);
    filmController.render(array[i]);
  }
};

export default class PageController {
  constructor(container, sortComponent) {
    this._container = container;
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsListTopRatedComponent = new FilmsListExtraComponent(`Top rated`);
    this._filmsListMostCommentedComponent = new FilmsListExtraComponent(`Most commented`);
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = sortComponent;
  }

  render(films) {
    const container = this._container.getElement();
    let currentFilmsList = films.slice();

    if (!currentFilmsList.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    let showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;
    const filmsSortedByRating = currentFilmsList.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const filmsSortedByCommentsCount = currentFilmsList.slice().sort((a, b) => b.comments.length - a.comments.length);

    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);

    const filmsListElement = container.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
    const filmsListExtraElements = Array.from(container.querySelectorAll(`.films-list--extra`));

    const onShowMoreButtonClick = () => {
      const prevFilmCardsCount = showingFilmCardsCount;
      showingFilmCardsCount = showingFilmCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;
      const filmsToShow = currentFilmsList.slice(prevFilmCardsCount, showingFilmCardsCount);
      renderFilmCards(filmsToShow, filmsListContainerElement, filmsToShow.length);

      if (showingFilmCardsCount >= currentFilmsList.length) {
        remove(this._showMoreButtonComponent);
      }
    };

    const renderShowMoreButton = () => {
      if (showingFilmCardsCount >= currentFilmsList.length) {
        return;
      }

      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
    };

    renderFilmCards(currentFilmsList, filmsListContainerElement, showingFilmCardsCount);

    filmsListExtraElements.forEach((element) => {
      if (element.querySelector(`h2`).textContent === `Top rated`) {
        renderFilmCards(filmsSortedByRating, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
      } else {
        renderFilmCards(filmsSortedByCommentsCount, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
      }
    });

    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHadler((sortType) => {
      showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;
      currentFilmsList = getSortedFilms(films, sortType);

      filmsListContainerElement.innerHTML = ``;
      renderFilmCards(currentFilmsList, filmsListContainerElement, showingFilmCardsCount);
      renderShowMoreButton();
    });
  }
}
