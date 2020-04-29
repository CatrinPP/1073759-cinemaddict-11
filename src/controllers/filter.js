import MainNavigationComponent from '../components/main-navigation.js';
import {FilterType, RenderPosition} from '../const.js';
import {getFilters, render, replace} from '../utils.js';

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._activeFilterType = FilterType.ALL;
    this._mainNavigationComponent = null;


    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsModel.getFilmsAll();
    const filters = getFilters(allFilms);
    const oldComponent = this._mainNavigationComponent;

    this._mainNavigationComponent = new MainNavigationComponent(filters);
    this._mainNavigationComponent.setFilterTypeChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._mainNavigationComponent, oldComponent);
    } else {
      render(container, this._mainNavigationComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
