import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/films-details.js';
import CommentsModel from '../models/comments.js';
import FilmModel from '../models/film.js';
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
    this._onCommentsDataChange = this._onCommentsDataChange.bind(this);
    this._onNewCommentSubmit = this._onNewCommentSubmit.bind(this);
    this._onEmojiClick = this._onEmojiClick.bind(this);
  }

  _onCommentsDataChange(oldDataId, newData) {
    if (oldDataId === null) {
      const onSuccess = () => {
        this._commentsModel.addComment(newData);
        this._film.comments.push(newData.id);
        const parent = document.querySelector(`.film-details__comments-list`);
        parent.innerHTML = ``;
        this._renderComments(this._commentsModel.getComments(), this._onCommentsDataChange);
      };

      this._api.postComment(this._film.id, newData, onSuccess);
    }

    if (newData === null) {
      const onSuccess = () => {
        this._commentsModel.removeComment(oldDataId);
        const index = this._film.comments.findIndex((it) => it === oldDataId);
        this._film.comments.splice(index, 1);
        const count = this._popupComponent.getElement().querySelector(`.film-details__comments-count`);
        count.textContent = this._commentsModel.getComments().length;
      };

      this._api.deleteComment(oldDataId, onSuccess);
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

    const onSuccess = (comments) => {
      this._popupComponent.rerender();
      this._popupComponent.getElement().querySelector(`.film-details__comments-list`).innerHTML = ``;
      this._commentsModel = new CommentsModel();
      this._commentsModel.setComments(comments);
      this._renderComments(this._commentsModel.getComments(), this._onCommentsDataChange);
    };

    this._api.getComments(this._film.id, onSuccess);
    document.addEventListener(`keydown`, this._onEscPress);
  }

  _renderComments(array, onCommentsDataChange) {
    const commentsList = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    // const commentsControllers = [];
    for (let i = 0; i < array.length; i++) {
      const commentController = new CommentController(commentsList, onCommentsDataChange);
      commentController.render(array[i]);
      // commentsControllers.push(commentController);
    }
    // return commentsControllers;
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    remove(this._popupComponent);
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
      const newCard = FilmModel.clone(this._film);
      newCard.userDetails.isInWatchlist = !newCard.userDetails.isInWatchlist;
      this._onDataChange(this, this._film, newCard);
    });
    this._cardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      const newCard = FilmModel.clone(this._film);
      newCard.userDetails.isAlreadyWatched = !newCard.userDetails.isAlreadyWatched;
      this._onDataChange(this, this._film, newCard);
    });
    this._cardComponent.setFavoriteButtonClickHandler((evt) => {
      evt.preventDefault();
      const newCard = FilmModel.clone(this._film);
      newCard.userDetails.isFavorite = !newCard.userDetails.isFavorite;
      this._onDataChange(this, this._film, newCard);
    });

    this._popupComponent.setClickHandler(this._onPopupCloseButtonClick);
    this._popupComponent.setEmojiClickHandler(this._onEmojiClick);
    this._popupComponent.setSubmitHandler(this._onNewCommentSubmit);
    this._popupComponent.setWatchlistButtonClickHandler((evt) => {
      const newCard = FilmModel.clone(this._film);
      newCard.userDetails.isInWatchlist = evt.target.checked;
      this._onDataChange(this, this._film, newCard);
    });
    this._popupComponent.setWatchedButtonClickHandler((evt) => {
      const newCard = FilmModel.clone(this._film);
      newCard.userDetails.isAlreadyWatched = evt.target.checked;
      this._onDataChange(this, this._film, newCard);
    });
    this._popupComponent.setFavoriteButtonClickHandler((evt) => {
      const newCard = FilmModel.clone(this._film);
      newCard.userDetails.isFavorite = evt.target.checked;
      this._onDataChange(this, this._film, newCard);
    });

    if (oldCard) {
      replace(this._cardComponent, oldCard);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }
}
