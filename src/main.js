import PageController from './controllers/page.js';
import ProfileComponent from './components/profile.js';
import FilterController from './controllers/filter.js';
import SortComponent from './components/sort.js';
import FooterStatistics from './components/footer-statistics.js';
import FilmsComponent from './components/films.js';
import FilmsModel from './models/films.js';
import {generateFilms} from './mock/film.js';
import {RenderPosition} from './const.js';
import {getWatchedFilmsCount, render} from './utils.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const filmsComponent = new FilmsComponent();
const sortComponent = new SortComponent();

const films = generateFilms();
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);
const pageController = new PageController(filmsComponent, sortComponent, filmsModel);
const wathedFilmsCount = getWatchedFilmsCount(films);
const filterController = new FilterController(mainElement, filmsModel);

filterController.render();

render(headerElement, new ProfileComponent(wathedFilmsCount), RenderPosition.BEFOREEND);
render(footerElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);
render(mainElement, sortComponent, RenderPosition.BEFOREEND);
render(mainElement, filmsComponent, RenderPosition.BEFOREEND);
pageController.render(films);
