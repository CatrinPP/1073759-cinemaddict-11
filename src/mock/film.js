import {FILM_CARDS_COUNT, POSTER_ITEMS, GENRE_ITEMS, DESCRIPTION_ITEMS, TITLE_ITEMS} from '../const.js';
import {getRandomArrayItem, getRandomBoolean, getRandomDecimalNumber, getRandomIntegerNumber} from '../utils.js';
import {getComments} from '../mock/comment.js';

const getDescription = () => {
  let description = ``;
  const descriptionLength = getRandomIntegerNumber(1, 3);
  for (let i = 0; i < descriptionLength; i++) {
    description += ` ` + getRandomArrayItem(DESCRIPTION_ITEMS);
  }
  return description;
};

const generateFilm = () => {
  const title = getRandomArrayItem(TITLE_ITEMS);
  const genre = GENRE_ITEMS.filter(() => Math.random() > 0.5);

  return {
    id: String(new Date() + Math.random()),
    comments: getComments(getRandomIntegerNumber(0, 5)),
    filmInfo: {
      title,
      alternativeTitle: title,
      totalRating: getRandomDecimalNumber(2, 10),
      poster: getRandomArrayItem(POSTER_ITEMS),
      ageRating: `18+`,
      director: `Anthony Mann`,
      writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
      actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
      release: {
        date: new Date(),
        country: `USA`,
      },
      runtime: getRandomIntegerNumber(20, 180),
      genre,
      description: getDescription(),
    },
    userDetails: {
      isInWatchlist: getRandomBoolean(),
      isAlreadyWatched: getRandomBoolean(),
      isFavorite: getRandomBoolean(),
    }
  };
};

const generateFilms = () => {
  return new Array(FILM_CARDS_COUNT)
    .fill(null)
    .map(generateFilm);
};

export {generateFilms};
