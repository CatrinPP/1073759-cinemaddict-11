export default class Comments {
  constructor(comments) {
    this._comments = comments;
  }

  addComment(comment) {
    this._comments = [].concat(comment, this._comments);
  }

  getComments() {
    return this._comments;
  }

  removeComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    return true;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }
}
