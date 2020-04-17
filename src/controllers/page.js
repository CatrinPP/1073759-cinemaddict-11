import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsListExtraComponent from '../components/films-list-extra.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/films-details.js';
import {ESC_KEYCODE, FILM_CARDS_EXTRA_COUNT, RenderPosition, SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON, SortType} from '../const.js';
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

  _renderFilmCards(array, container, count) {
    for (let i = 0; i < count; i++) {
      const film = array[i];
      const cardComponent = new FilmCardComponent(film);
      const popupComponent = new FilmDetailsComponent(film);

      const closePopup = () => {
        remove(popupComponent);
      };

      const onEscPress = (evt) => {
        if (evt.keyCode === ESC_KEYCODE) {
          closePopup();
          document.removeEventListener(`keydown`, onEscPress);
        }
      };

      const onPopupCloseButtonClick = () => {
        closePopup();
        document.removeEventListener(`keydown`, onEscPress);
      };

      const onFilmCardClick = () => {
        render(document.body, popupComponent, RenderPosition.BEFOREEND);
        popupComponent.setClickHandler(onPopupCloseButtonClick);
        document.addEventListener(`keydown`, onEscPress);
      };

      cardComponent.setClickHandler(onFilmCardClick);

      render(container, cardComponent, RenderPosition.BEFOREEND);
    }
  }

  render(films) {
    const container = this._container.getElement();

    if (!films.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    let showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;
    const filmsSortedByRating = films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
    const filmsSortedByCommentsCount = films.slice().sort((a, b) => b.comments.length - a.comments.length);

    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListTopRatedComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListMostCommentedComponent, RenderPosition.BEFOREEND);

    const filmsListElement = container.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
    const filmsListExtraElements = Array.from(container.querySelectorAll(`.films-list--extra`));

    const renderShowMoreButton = (filmsList) => {
      if (showingFilmCardsCount >= filmsList.length) {
        return;
      }

      const onShowMoreButtonClick = () => {
        const prevFilmCardsCount = showingFilmCardsCount;
        showingFilmCardsCount = showingFilmCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;
        const filmsToShow = filmsList.slice(prevFilmCardsCount, showingFilmCardsCount);
        this._renderFilmCards(filmsToShow, filmsListContainerElement, filmsToShow.length);

        if (showingFilmCardsCount >= filmsList.length) {
          remove(this._showMoreButtonComponent);
        }
      };

      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
    };

    this._renderFilmCards(films, filmsListContainerElement, showingFilmCardsCount);

    filmsListExtraElements.forEach((element) => {
      if (element.querySelector(`h2`).textContent === `Top rated`) {
        this._renderFilmCards(filmsSortedByRating, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
      } else {
        this._renderFilmCards(filmsSortedByCommentsCount, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
      }
    });

    renderShowMoreButton(films);

    this._sortComponent.setSortTypeChangeHadler((sortType) => {
      showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;
      const sortedFilms = getSortedFilms(films, sortType);

      filmsListContainerElement.innerHTML = ``;

      this._renderFilmCards(sortedFilms, filmsListContainerElement, showingFilmCardsCount);
      renderShowMoreButton(sortedFilms);
    });
  }
}
