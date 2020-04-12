export const createFilmCardTemplate = (film) => {
  const genres = film.filmInfo.genre.join(`, `);
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${film.filmInfo.title}</h3>
      <p class="film-card__rating">${film.filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${film.filmInfo.release.date.getFullYear()}</span>
        <span class="film-card__duration">${film.filmInfo.runtime}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src=${film.filmInfo.poster} alt="" class="film-card__poster">
      <p class="film-card__description">${film.filmInfo.description}</p>
      <a class="film-card__comments">${film.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};
