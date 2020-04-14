import Profile from './components/profile.js';
import MainNavigation from './components/main-navigation.js';
import Sort from './components/sort.js';
import Films from './components/films.js';
import FilmsList from './components/films-list.js';
import FilmsListExtra from './components/films-list-extra.js';
import ShowMoreButton from './components/show-more-button.js';
import FilmCard from './components/film-card.js';
import FooterStatistics from './components/footer-statistics.js';
import FilmDetails from './components/films-details.js';
import {generateFilms} from './mock/film.js';
import {ESC_KEYCODE, FILM_CARDS_EXTRA_COUNT, RenderPosition, SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON} from './const.js';
import {getFilters, getWatchedFilmsCount, render} from './utils.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const films = generateFilms();
const wathedFilmsCount = getWatchedFilmsCount(films);

const renderFilmCards = (array, container, count) => {
  for (let i = 0; i < count; i++) {
    const film = array[i];
    const cardElement = new FilmCard(film).getElement();
    const popupElement = new FilmDetails(film).getElement();
    const cover = cardElement.querySelector(`.film-card__poster`);
    const title = cardElement.querySelector(`.film-card__title`);
    const comments = cardElement.querySelector(`.film-card__comments`);
    const popupCloseButton = popupElement.querySelector(`.film-details__close-btn`);
    cover.style = `cursor:pointer`;
    title.style = `cursor:pointer`;

    const closePopup = () => {
      document.body.removeChild(popupElement);
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
      render(document.body, popupElement, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscPress);
    };

    cover.addEventListener(`click`, onFilmCardClick);
    title.addEventListener(`click`, onFilmCardClick);
    comments.addEventListener(`click`, onFilmCardClick);
    popupCloseButton.addEventListener(`click`, onPopupCloseButtonClick);
    render(container, cardElement, RenderPosition.BEFOREEND);
  }
};

const renderFilmsCatalog = () => {
  let showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;
  const filters = getFilters(films);
  const filmsSortedByRating = films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
  const filmsSortedByCommentsCount = films.slice().sort((a, b) => b.comments.length - a.comments.length);

  render(mainElement, new MainNavigation(filters).getElement(), RenderPosition.BEFOREEND);
  render(mainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
  render(mainElement, new Films().getElement(), RenderPosition.BEFOREEND);

  const filmsElement = mainElement.querySelector(`.films`);

  render(filmsElement, new FilmsList().getElement(), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmsListExtra(`Top rated`).getElement(), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmsListExtra(`Most commented`).getElement(), RenderPosition.BEFOREEND);

  const filmsListElement = filmsElement.querySelector(`.films-list`);

  render(filmsListElement, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
  const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmCardsCount = showingFilmCardsCount;
    showingFilmCardsCount = showingFilmCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;
    const filmsList = films.slice(prevFilmCardsCount, showingFilmCardsCount);
    renderFilmCards(filmsList, filmsListContainerElement, filmsList.length);

    if (showingFilmCardsCount >= films.length) {
      showMoreButton.remove();
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

render(headerElement, new Profile(wathedFilmsCount).getElement(), RenderPosition.BEFOREEND);
render(footerElement, new FooterStatistics(films.length).getElement(), RenderPosition.BEFOREEND);
renderFilmsCatalog();
