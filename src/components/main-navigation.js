import AbstractComponent from './abstract-component.js';
import {FilterType} from '../const.js';

const createFilterMarkup = (filter) => {
  const count = filter.name === `All movies` ? `` : `<span class="main-navigation__item-count">${filter.count}</span>`;
  const isActive = filter.name === `All movies` ? true : false;

  return (
    `<a href="#${filter.id}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}" data-filter-type="${filter.name}">${filter.name} ${count}</a>`
  );
};

const createMainNavigationTemplate = (data) => {
  const filters = data.map((item) => createFilterMarkup(item)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filters}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
    this._currentFilterType = FilterType.ALL;
  }

  getFilterType() {
    return this._currentFilterType;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._data);
  }

  setFilterTypeChangeHandler(handler) {
    const filterButtons = Array.from(this.getElement().querySelectorAll(`.main-navigation__item`));
    this.getElement().addEventListener(`click`, (evt) => {

      evt.preventDefault();

      if (evt.target.tagName !== `A` || evt.target.textContent === `Stats`) {
        return;
      }

      filterButtons.forEach((button) => button.classList.remove(`main-navigation__item--active`));
      evt.target.classList.add(`main-navigation__item--active`);

      const filterType = evt.target.dataset.filterType;

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      handler(this._currentFilterType);
    });
  }
}
