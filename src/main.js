import Profile from './components/profile.js';
import MainNavigation from './components/main-navigation.js';
import Sort from './components/sort.js';
import Films from './components/films.js';
import FilmsList from './components/films-list.js';
import FilmsListExtra from './components/films-list-extra.js';
import ShowMoreButton from './components/show-more-button.js';
import FilmCard from './components/film-card.js';
import FooterStatistics from './components/footer-statistics.js';
// import FilmDetails from './components/films-details.js';
import {generateFilms} from './mock/film.js';
import {FILM_CARDS_EXTRA_COUNT, RenderPosition, SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON} from './const.js';
import {getFilters, getWatchedFilmsCount, render} from './utils.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const films = generateFilms();
const wathedFilmsCount = getWatchedFilmsCount(films);

const renderFilmCards = (array, container, count) => {
  for (let i = 0; i < count; i++) {
    render(container, new FilmCard(array[i]).getElement(), RenderPosition.BEFOREEND);
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

    films.slice(prevFilmCardsCount, showingFilmCardsCount).forEach((card) => render(filmsListContainerElement, new FilmCard(card).getElement(), RenderPosition.BEFOREEND));

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

// render(document.body, new FilmDetails(films[0]).getElement(), RenderPosition.BEFOREEND);
