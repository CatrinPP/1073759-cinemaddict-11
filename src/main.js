import {createProfileTemplate} from './components/profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createFilmsListExtraTemplate} from './components/films-list-extra.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {generateFilms} from './mock/film.js';
import {FILM_CARDS_COUNT, FILM_CARDS_EXTRA_COUNT} from './const.js';
import {createFilmDetailsTemplate} from './components/films-details.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const films = generateFilms();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createProfileTemplate());
render(mainElement, createMainNavigationTemplate());
render(mainElement, createSortTemplate());
render(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate());
render(filmsElement, createFilmsListExtraTemplate(`Top rated`));
render(filmsElement, createFilmsListExtraTemplate(`Most commented`));

const filmsListElement = filmsElement.querySelector(`.films-list`);

render(filmsListElement, createShowMoreButton());

const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
const filmsListExtraContainerElements = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);

const renderFilmCards = (container, count) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCardTemplate(films[i]));
  }
};

renderFilmCards(filmsListContainerElement, FILM_CARDS_COUNT);

filmsListExtraContainerElements.forEach((extraContainer) => {
  renderFilmCards(extraContainer, FILM_CARDS_EXTRA_COUNT);
});

render(document.body, createFilmDetailsTemplate(films[0]));
