import {createProfileTemplate} from './components/profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmsListExtraTemplate} from './components/films-list-extra.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFooterStatisticsTemplate} from './components/footer-statistics.js';
// import {createFilmDetailsTemplate} from './components/films-details.js';
import {generateFilms} from './mock/film.js';
import {FILM_CARDS_EXTRA_COUNT, SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON} from './const.js';
import {getFilters, getWatchedFilmsCount} from './utils.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
let showingFilmCardsCount = SHOWING_CARDS_COUNT_ON_START;

const films = generateFilms();
const filters = getFilters(films);
const wathedFilmsCount = getWatchedFilmsCount(films);
const filmsSortedByRating = films.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
const filmsSortedByCommentsCount = films.slice().sort((a, b) => b.comments.length - a.comments.length);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileTemplate(wathedFilmsCount));
render(footerElement, createFooterStatisticsTemplate(films.length));
render(mainElement, createMainNavigationTemplate(filters));
render(mainElement, createSortTemplate());
render(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate());
render(filmsElement, createFilmsListExtraTemplate(`Top rated`));
render(filmsElement, createFilmsListExtraTemplate(`Most commented`));

const filmsListElement = filmsElement.querySelector(`.films-list`);

render(filmsListElement, createShowMoreButton());

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmCardsCount = showingFilmCardsCount;
  showingFilmCardsCount = showingFilmCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  films.slice(prevFilmCardsCount, showingFilmCardsCount).forEach((card) => render(filmsListContainerElement, createFilmCardTemplate(card)));

  if (showingFilmCardsCount >= films.length) {
    showMoreButton.remove();
  }
});

const renderFilmCards = (array, container, count) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCardTemplate(array[i]));
  }
};

renderFilmCards(films, filmsListContainerElement, showingFilmCardsCount);

filmsListExtraElements.forEach((element) => {
  if (element.querySelector(`h2`).textContent === `Top rated`) {
    renderFilmCards(filmsSortedByRating, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
  } else {
    renderFilmCards(filmsSortedByCommentsCount, element.querySelector(`.films-list__container`), FILM_CARDS_EXTRA_COUNT);
  }
});

// render(document.body, createFilmDetailsTemplate(films[0]));
