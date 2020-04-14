const FILM_CARDS_COUNT = 20;
const FILM_CARDS_EXTRA_COUNT = 2;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const SHOWING_CARDS_COUNT_ON_START = 5;

const COMMENT_TEXTS = [
  `Almost two hours? Seriously?`,
  `Booooooooooring`,
  `Interesting setting and a good cast`,
  `Very very old. Meh`,
];

const DESCRIPTION_ITEMS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const Emotion = {
  ANGRY: `angry`,
  PUKE: `puke`,
  SLEEPING: `sleeping`,
  SMILE: `smile`,
};

const EMOTIONS = [Emotion.ANGRY, Emotion.PUKE, Emotion.SLEEPING, Emotion.SMILE];

const FilterTitle = {
  ALL: `All movies`,
  FAVORITES: `Favorites`,
  HISTORY: `History`,
  WATCHLIST: `Watchlist`,
};

// const FILTER_TITLES = [FilterTitle.ALL, FilterTitle.WATCHLIST, FilterTitle.HISTORY, FilterTitle.FAVORITES];

const Genre = {
  ACTION: `action`,
  ADVENTURE: `adventure`,
  ANIMATION: `animation`,
  COMEDY: `comedy`,
  DRAMA: `drama`,
  FICTION: `fiction`,
  THRILLER: `thriller`,
  WAR: `war`,
  WESTERN: `western`,
};

const GENRE_ITEMS = [
  Genre.ACTION,
  Genre.ADVENTURE,
  Genre.ANIMATION,
  Genre.COMEDY,
  Genre.DRAMA,
  Genre.FICTION,
  Genre.THRILLER,
  Genre.WAR,
  Genre.WESTERN,
];

const POSTER_ITEMS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const ProfileRating = {
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
  NOVICE: `Novice`,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const TITLE_ITEMS = [
  `Kingdom Of Heaven`,
  `Lara Croft: Tomb Raider`,
  `A Bridge Too Far`,
  `Death Proof`,
  `Total Recall`,
  `It’s a Wonderful Life`,
  `Jaws`,
  `Pulp Fiction`,
  `Rear Window`,
  `Some Like It Hot`,
  `The Truman Show`,
  `Blade Runner`,
  `Citizen Kane`,
  `Eyes Wide Shut`,
  `Atomic Blonde`,
  `Baby Driver`,
  `Black Panther`,
  `Creed`,
  `The Disaster Artist`,
  `Guardians of the Galaxy`,
  `The Hateful Eight`,
  `Neon Demon`,
  `The Revenant`,
  `Ted`,
];

export {
  COMMENT_TEXTS,
  DESCRIPTION_ITEMS,
  FILM_CARDS_COUNT,
  FILM_CARDS_EXTRA_COUNT,
  FilterTitle,
  EMOTIONS,
  GENRE_ITEMS,
  POSTER_ITEMS,
  ProfileRating,
  RenderPosition,
  SHOWING_CARDS_COUNT_BY_BUTTON,
  SHOWING_CARDS_COUNT_ON_START,
  TITLE_ITEMS,
};
