import _ from "lodash";

export default (diff) => {
  const mapping = {
    nested: (children, way, key) => iter(children, way, key),
    deleted: (way, key) => `Property '${getPath(way, key)}' was removed\n`,
    added: (way, key, value) => `Property '${getPath(way, key)}' was added with value: ${getValOutput(value)}\n`,
    changed: (way, key, value1, value2) => {
      return `Property '${getPath(way, key)}' was updated. From ${getValOutput(value1)} to ${getValOutput(value2)}\n`},
  }
  const getPath = (prevPath, key) => {
    let path = '';
    if (prevPath && key ) path += prevPath + '.' + key;
    else if (prevPath) path = prevPath;
    else if (key) path = key;
    return path;
  }
  const getValOutput = (value) => {
    if (value !== null && typeof value === 'object') return `[complex value]`;
    if (typeof value === 'boolean' || _.isNull(value)) return value;
    if (typeof value === 'string') return `'${value}'`;
  }

  const iter = (diff, prevPath, prevKey) => {
    let list = []
    let path = getPath(prevPath, prevKey);
    diff.map((node) => {
      const {type, key, value, value1, value2, children} = node;
      if (node.type === 'nested') list.push(mapping[type](children, path, key));
      if (type === 'deleted') list.push(mapping[type](path, key));
      if (type === 'added') list.push(mapping[type](path, key, value));
      if (type === 'changed') list.push(mapping[type](path, key, value1, value2));
    });
    return _.flatten(list);
  }
  const result = iter(diff).join('');
  return result;
}
