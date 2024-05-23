
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);
const getRandomArrayElement = (items) =>items[Math.floor(Math.random() * items.length)];
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));


export {getRandomArrayElement, getRandomInteger, getRandomDate, updateItem};
