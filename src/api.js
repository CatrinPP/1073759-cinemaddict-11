import FilmAdapter from './models/film-adapter.js';
import CommentAdapter from './models/comment-adapter.js';

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getComments(filmId) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/comments/${filmId}`, {headers})
      .then((response) => response.json())
      .then((data) => {
        return CommentAdapter.parseComments(data);
      });
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((response) => response.json())
      .then((data) => {
        return FilmAdapter.parseFilms(data);
      });
  }
};

export default API;
