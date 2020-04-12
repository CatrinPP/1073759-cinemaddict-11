import {getRandomBoolean, getRandomArrayItem, getRandomDate} from '../utils.js';
import {EMOTIONS, COMMENT_TEXTS} from '../const.js';

const getComment = () => {
  const author = getRandomBoolean() ? `Tim Macoveev` : `John Doe`;

  return {
    author,
    comment: getRandomArrayItem(COMMENT_TEXTS),
    emotion: getRandomArrayItem(EMOTIONS),
    date: getRandomDate()
  };
};

const getComments = (count) => {
  return new Array(count)
  .fill(null)
  .map(getComment);
};

export {getComments};
