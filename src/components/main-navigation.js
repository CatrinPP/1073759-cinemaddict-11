import {createElement} from '../utils.js';

const createFilterMarkup = (filter) => {
  return (
    `<a href="#watchlist" class="main-navigation__item">${filter.name} <span class="main-navigation__item-count">${filter.count}</span></a>`
  );
};

const createMainNavigationTemplate = (data) => {
  const filters = data.map((item) => createFilterMarkup(item)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filters}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation {
  constructor(data) {
    this._data = data;

    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
