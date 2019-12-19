export const setPath = (obj: object, path: string | string[], value: any, delimiter = '.') => {
  let arr;
  let key;
  let p = path;
  if (typeof path === 'string') {
    p = path.split(delimiter || '.');
  }
  if (p.length > 0) {
    arr = p;
    [key] = arr;
    if (arr.length > 1) {
      arr.shift();
      // eslint-disable-next-line no-param-reassign
      obj[key] = setPath(obj[key] || {}, arr, value, delimiter);
    } else {
      // eslint-disable-next-line no-param-reassign
      obj[key] = value;
    }
  }
  return obj;
};
