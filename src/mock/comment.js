import {getRandomBoolean, getRandomArrayItem} from '../utils.js';
import {EMOTIONS, COMMENT_TEXTS} from '../const.js';

const getComment = () => {
  const author = getRandomBoolean() ? `Tim Macoveev` : `John Doe`;

  return {
    id: String(new Date() + Math.random()),
    author,
    comment: getRandomArrayItem(COMMENT_TEXTS),
    emotion: getRandomArrayItem(EMOTIONS),
    date: new Date()
  };
};

const getComments = (count) => {
  return new Array(count)
  .fill(null)
  .map(getComment);
};

export {getComments};
