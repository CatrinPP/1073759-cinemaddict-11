import {FilterTitle, ProfileRating, RenderPosition} from './const.js';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const getRandomBoolean = () => Math.random() > 0.5;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomDecimalNumber = (min, max) => {
  return (min + (max - min) * Math.random()).toFixed(1);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getProfileRating = (count) => {
  let result = ``;
  if (count > 1 && count <= 10) {
    result = ProfileRating.NOVICE;
  } else if (count > 10 && count <= 20) {
    result = ProfileRating.FAN;
  } else if (count > 21) {
    result = ProfileRating.MOVIE_BUFF;
  }
  return result;
};

const getWatchedFilmsCount = (films) => {
  return films.filter((item) => item.userDetails.isAlreadyWatched).length;
};

const getFilters = (films) => {
  const favoritesCount = films.filter((item) => item.userDetails.isFavorite).length;
  const watchlistCount = films.filter((item) => item.userDetails.isInWatchlist).length;
  const alreadyWatchedCount = getWatchedFilmsCount(films);

  return [{
    name: FilterTitle.WATCHLIST,
    count: watchlistCount
  }, {
    name: FilterTitle.HISTORY,
    count: alreadyWatchedCount
  }, {
    name: FilterTitle.FAVORITES,
    count: favoritesCount
  }];
};

const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {
  createElement,
  getFilters,
  getProfileRating,
  getRandomArrayItem,
  getRandomBoolean,
  getRandomDecimalNumber,
  getRandomIntegerNumber,
  getWatchedFilmsCount,
  remove,
  render,
  replace,
};
