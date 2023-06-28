import _ from 'lodash';

const getPath = (path, key) => {
  if (path && key) return [path, key].join('.');
  if (path) return path;
  return key;
};
const getValueOutput = (value) => {
  if (_.isNull(value)) return value;
  switch (typeof value) {
  case 'boolean': return value;
  case 'object': return '[complex value]';
  case 'string': return `'${value}'`;
  case 'number': return `'${value}'`;
  default: return null;
  }
};
const mapping = {
  nested: ({ children, key }, path) => iter(children, path, key),
  deleted: ({ key }, path) => `Property '${getPath(path, key)}' was removed\n`,
  added: ({ key, value }, path) => `Property '${getPath(path, key)}' was added with value: ${getValueOutput(value)}\n`,
  changed: ({ key, value1, value2 }, path) => `Property '${getPath(path, key)}' was updated. From ${getValueOutput(value1)} to ${getValueOutput(value2)}\n`,
  unchanged: () => {},
};
const iter = (childs, previousPath, key) => {
  const list = [];
  const path = getPath(previousPath, key);
  childs.flatMap((node) => list.push(mapping[node.type](node, path)));
  return _.flatten(list);
};
export default (diff) => {
  const result = iter(diff).join('');
  return result;
};
