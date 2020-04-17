import Profile from './components/profile.js';
import MainNavigation from './components/main-navigation.js';
import Sort from './components/sort.js';
import Films from './components/films.js';
import FilmsList from './components/films-list.js';
import NoFilms from './components/no-films.js';
import FilmsListExtra from './components/films-list-extra.js';
import ShowMoreButton from './components/show-more-button.js';
import FilmCard from './components/film-card.js';
import FooterStatistics from './components/footer-statistics.js';
import FilmDetails from './components/films-details.js';
import {generateFilms} from './mock/film.js';
import {ESC_KEYCODE, FILM_CARDS_EXTRA_COUNT, RenderPosition, SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON} from './const.js';
import {getFilters, getWatchedFilmsCount, remove, render} from './utils.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const films = generateFilms();
const wathedFilmsCount = getWatchedFilmsCount(films);
const filters = getFilters(films);

const renderFilmCards = (array, container, count) => {
  for (let i = 0; i < count; i++) {
    const film = array[i];
    const cardComponent = new FilmCard(film);
    const popupComponent = new FilmDetails(film);
    const cover = cardComponent.getElement().querySelector(`.film-card__poster`);
    const title = cardComponent.getElement().querySelector(`.film-card__title`);
    const comments = cardComponent.getElement().querySelector(`.film-card__comments`);
    const popupCloseButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);
    cover.style = `cursor:pointer`;
    title.style = `cursor:pointer`;

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
      document.addEventListener(`keydown`, onEscPress);
    };

    cover.addEventListener(`click`, onFilmCardClick);
    title.addEventListener(`click`, onFilmCardClick);
    comments.addEventListener(`click`, onFilmCardClick);
    popupCloseButton.addEventListener(`click`, onPopupCloseButtonClick);
    render(container, cardComponent, RenderPosition.BEFOREEND);
  }
};

const renderFilmsCatalog = () => {
  render(mainElement, new Films(), RenderPosition.BEFOREEND);
  const filmsElement = mainElement.querySelector(`.films`);

  if (!films.length) {
    render(filmsElement, new NoFilms(), RenderPosition.BEFOREEND);
    return;
  }

  let showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;
  const filmsSortedByRating = films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  const filmsSortedByCommentsCount = films.slice().sort((a, b) => b.comments.length - a.comments.length);

  render(filmsElement, new FilmsList(), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmsListExtra(`Top rated`), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmsListExtra(`Most commented`), RenderPosition.BEFOREEND);

  const filmsListElement = filmsElement.querySelector(`.films-list`);
  const showMoreButtonComponent = new ShowMoreButton();

  render(filmsListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevFilmCardsCount = showingFilmCardsCount;
    showingFilmCardsCount = showingFilmCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;
    const filmsList = films.slice(prevFilmCardsCount, showingFilmCardsCount);
    renderFilmCards(filmsList, filmsListContainerElement, filmsList.length);

    if (showingFilmCardsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });

  renderFilmCards(films, filmsListContainerElement, showingFilmCardsCount);

  filmsListExtraElements.forEach((element) => {
    if (element.querySelector(`h2`).textContent === `Top rated`) {
      renderFilmCards(filmsSortedByRating, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
    } else {
      renderFilmCards(filmsSortedByCommentsCount, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
    }
  });
};

render(headerElement, new Profile(wathedFilmsCount), RenderPosition.BEFOREEND);
render(footerElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);
render(mainElement, new MainNavigation(filters), RenderPosition.BEFOREEND);
render(mainElement, new Sort(), RenderPosition.BEFOREEND);
renderFilmsCatalog();
