import _ from 'lodash';

export default (diff) => {
  const getPath = (prevPath, key) => {
    if (prevPath && key) return [prevPath, key].join('.');
    if (prevPath) return prevPath;
    return key;
  };
  const getValueOutput = (value) => {
    if (value === null) return value;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'object') return '[complex value]';
    if (typeof value === 'string') return `'${value}'`;
    if (typeof value === 'number') return `'${value}'`;
  };
  const mapping = {
    deleted: (way, key) => `Property '${getPath(way, key)}' was removed\n`,
    added: (way, key, value) => `Property '${getPath(way, key)}' was added with value: ${getValueOutput(value)}\n`,
    changed: (way, key, value1, value2) => {
      return `Property '${getPath(way, key)}' was updated. From ${getValueOutput(value1)} to ${getValueOutput(value2)}\n`;
    },
  };
  const iter = (childs, prevPath, prevKey) => {
    const list = [];
    const path = getPath(prevPath, prevKey);
    childs.forEach((node) => {
      const {
        type, key, value, value1, value2, children,
      } = node;
      if (type === 'nested') list.push(iter(children, path, key));
      if (type === 'deleted') list.push(mapping[type](path, key));
      if (type === 'added') list.push(mapping[type](path, key, value));
      if (type === 'changed') list.push(mapping[type](path, key, value1, value2));
    });
    return _.flatten(list);
  };
  const result = iter(diff).join('');
  return result;
};
