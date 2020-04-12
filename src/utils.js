import {ProfileRating} from './const.js';

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

const getRandomDate = () => {
  const targetDate = new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDay();
  const hours = targetDate.getHours() < 10 ? `0${targetDate.getHours()}` : targetDate.getHours();
  const minutes = targetDate.getMinutes() < 10 ? `0${targetDate.getMinutes()}` : targetDate.getMinutes();

  return `${year}/${month}/${day} ${hours}:${minutes}`;
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

export {getRandomArrayItem, getRandomBoolean, getRandomDecimalNumber, getRandomIntegerNumber, getRandomDate, getProfileRating};
