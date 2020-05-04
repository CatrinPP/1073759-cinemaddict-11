export default class CommentAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.comment = data[`comment`];
    this.date = data[`date`];
    this.emotion = data[`emotion`];
  }

  static parseComment(data) {
    return new CommentAdapter(data);
  }

  static parseComments(data) {
    return data.map(CommentAdapter.parseComment);
  }
}
