import AbstractSmartComponent from './abstract-smart-component.js';
import moment from 'moment';

const createGenreItemMarkup = (genre) => {
  return (
    `<span class="film-details__genre">${genre}</span>`
  );
};

const createEmojiMarkup = (emojiName) => {
  return (
    `<img src="./images/emoji/${emojiName}.png" data-emoji="${emojiName}" width="55" height="55" alt="emoji-${emojiName}">`
  );
};

const createFilmDetailsTemplate = (film, emoji) => {
  const writers = film.filmInfo.writers.join(`, `);
  const actors = film.filmInfo.actors.join(`, `);
  const genres = film.filmInfo.genre.map((item) => createGenreItemMarkup(item)).join(`\n`);
  const isEmoji = emoji ? createEmojiMarkup(emoji) : ``;
  const runtime = moment.duration(film.filmInfo.runtime, `m`);
  const runtimeToShow = runtime.hours() === 0 ? `${runtime.minutes()}m` : `${runtime.hours()}h ${runtime.minutes()}m`;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${film.filmInfo.poster} alt="">

              <p class="film-details__age">${film.filmInfo.ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.filmInfo.title}</h3>
                  <p class="film-details__title-original">Original: ${film.filmInfo.alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.filmInfo.totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.filmInfo.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${moment(film.filmInfo.release.date).format(`DD MMMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtimeToShow}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.filmInfo.release.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${genres}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
              ${film.filmInfo.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.userDetails.isInWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.userDetails.isAlreadyWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.userDetails.isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${isEmoji}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._chosenEmoji = null;
    this._clickHandler = null;
    this._submitHandler = null;
    this._emojiClickHandler = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmCard, this._chosenEmoji);
  }

  recoveryListeners() {
    this.setClickHandler(this._clickHandler);
    this.setEmojiClickHandler(this._emojiClickHandler);
    this.setSubmitHandler(this._submitHandler);
  }

  setEmojiClickHandler(handler) {
    const emojis = Array.from(this.getElement().querySelectorAll(`.film-details__emoji-item`));
    emojis.map((emoji) => {
      emoji.addEventListener(`click`, (evt) => {
        this._chosenEmoji = evt.target.value;
        this.rerender();
        handler();
        this._emojiClickHandler = handler;
      });
    });
  }

  setClickHandler(handler) {
    const popupCloseButton = this.getElement().querySelector(`.film-details__close-btn`);
    popupCloseButton.addEventListener(`click`, handler);
    this._clickHandler = handler;

    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, () => {
        this._filmCard.userDetails.isInWatchlist = !this._filmCard.userDetails.isInWatchlist;
      });

    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, () => {
        this._filmCard.userDetails.isAlreadyWatched = !this._filmCard.userDetails.isAlreadyWatched;
      });

    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, () => {
        this._filmCard.userDetails.isFavorite = !this._filmCard.userDetails.isFavorite;
      });
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`.film-details__new-comment`)
      .addEventListener(`keydown`, handler);
    this._submitHandler = handler;
  }
}
