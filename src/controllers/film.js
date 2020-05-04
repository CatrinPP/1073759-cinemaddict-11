import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/films-details.js';
import CommentsModel from '../models/comments.js';
import {ENTER_KEYCODE, ESC_KEYCODE, RenderPosition} from '../const.js';
import {remove, render, replace, getRandomBoolean} from '../utils.js';
import CommentController from './comment.js';
import he from 'he';

export default class FilmController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._api = api;

    this._cardComponent = null;
    this._popupComponent = null;
    this._film = null;
    this._commentsModel = null;

    this._onPopupCloseButtonClick = this._onPopupCloseButtonClick.bind(this);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
    this._onNewCommentSubmit = this._onNewCommentSubmit.bind(this);
    this._onEmojiClick = this._onEmojiClick.bind(this);
  }

  _closePopup() {
    remove(this._popupComponent);
    this._onDataChange(this, this._film, this._film);
  }

  _onCommentsDataChange(oldDataId, newData) {
    if (oldDataId === null) {
      this._commentsModel.addComment(newData);
      const parent = document.querySelector(`.film-details__comments-list`);
      parent.innerHTML = ``;
      this._renderComments(this._commentsModel.getComments(), this._onCommentsDataChange);
    }

    if (newData === null) {
      this._commentsModel.removeComment(oldDataId);
      const count = this._popupComponent.getElement().querySelector(`.film-details__comments-count`);
      count.textContent = this._commentsModel.getComments().length;
    }
  }

  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this.setDefaultView();
    }
  }

  _onPopupCloseButtonClick() {
    this.setDefaultView();
  }

  _onNewCommentSubmit(evt) {
    if (evt.ctrlKey && evt.keyCode === ENTER_KEYCODE) {
      const emotion = this._popupComponent.getElement().querySelector(`.film-details__add-emoji-label img`).dataset.emoji;
      const newComment = {
        id: String(new Date() + Math.random()),
        author: getRandomBoolean() ? `Tim Macoveev` : `John Doe`,
        comment: he.encode(evt.target.value),
        emotion,
        date: new Date(),
      };

      this._onCommentsDataChange(null, newComment);
      evt.target.value = null;
      const count = this._popupComponent.getElement().querySelector(`.film-details__comments-count`);
      count.textContent = this._commentsModel.getComments().length;
    }
  }

  _onEmojiClick() {
    this._renderComments(this._commentsModel.getComments(), this._onCommentsDataChange);
  }

  _onFilmCardClick() {
    this._onViewChange();
    render(document.body, this._popupComponent, RenderPosition.BEFOREEND);
    this._popupComponent.setClickHandler(this._onPopupCloseButtonClick, this._onDeleteButtonClick);
    this._popupComponent.setEmojiClickHandler(this._onEmojiClick);
    this._popupComponent.setSubmitHandler(this._onNewCommentSubmit);
    this._commentsModel = new CommentsModel();

    this._api.getComments(this._film.id)
    .then((comments) => {
      this._commentsModel.setComments(comments);
      this._renderComments(this._commentsModel.getComments(), this._onCommentsDataChange);
    });

    document.addEventListener(`keydown`, this._onEscPress);
  }

  _renderComments(array, onCommentsDataChange) {
    const commentsList = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    const commentsControllers = [];
    for (let i = 0; i < array.length; i++) {
      const commentController = new CommentController(commentsList, onCommentsDataChange);
      commentController.render(array[i]);
      commentsControllers.push(commentController);
    }
    return commentsControllers;
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    this._closePopup();
    document.removeEventListener(`keydown`, this._onEscPress);
  }

  render(film) {
    this._film = film;
    const oldCard = this._cardComponent;
    this._cardComponent = new FilmCardComponent(film);
    this._popupComponent = new FilmDetailsComponent(film);
    this._cardComponent.setCardClickHandler(this._onFilmCardClick);
    this._cardComponent.setWatchlistButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        userDetails: {
          isInWatchlist: !this._film.userDetails.isInWatchlist,
          isAlreadyWatched: this._film.userDetails.isAlreadyWatched,
          isFavorite: this._film.userDetails.isFavorite,
        }
      }));
    });
    this._cardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        userDetails: {
          isAlreadyWatched: !this._film.userDetails.isAlreadyWatched,
          isInWatchlist: this._film.userDetails.isInWatchlist,
          isFavorite: this._film.userDetails.isFavorite,
        }
      }));
    });
    this._cardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        userDetails: {
          isFavorite: !this._film.userDetails.isFavorite,
          isInWatchlist: this._film.userDetails.isInWatchlist,
          isAlreadyWatched: this._film.userDetails.isAlreadyWatched,
        }
      }));
    });

    if (oldCard) {
      replace(this._cardComponent, oldCard);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }
}
