import {render, remove} from '../utils.js';
import CommentComponent from '../components/comment.js';
// import CommentModel from '../models/comment.js';
import {RenderPosition} from '../const.js';

export default class CommentController {
  constructor(container, onCommentsDataChange) {
    this._container = container;
    this._onCommentsDataChange = onCommentsDataChange;

    this._commentComponent = null;
    this._id = null;

    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  _destroy() {
    remove(this._commentComponent);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    this._onCommentsDataChange(this._id, null);
    this._destroy();
  }


  render(comment) {
    this._id = comment.id;
    this._commentComponent = new CommentComponent(comment);
    this._commentComponent.setClickHandler(this._onDeleteButtonClick);
    render(this._container, this._commentComponent, RenderPosition.BEFOREEND);
  }
}
