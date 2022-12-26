export const parseValue = (value: string) => {
  if (value.indexOf('var:') === 0) {
    return `${value.replace(':', '(--wp--').split('|').join('--')})`;
  }
  return value;
};
