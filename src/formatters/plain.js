import _ from "lodash";

export default (diff) => {
  const mapping = {
    nested: (children, way, key) => iter(children, way, key),
    deleted: (way, key) => `Property '${getPath(way, key)}' was removed`,
    added: (way, key, value) => `Property '${getPath(way, key)}' was added with value: ${value}`,
    changed: (way, key, val1, val2) => `Property '${getPath(way, key)}' was updated. From ${val1} to ${val2}`,
  }
  const getPath = (prevWay, key) => {
    let path = '';
    if (prevWay && key ) path += prevWay + '.' + key;
    else if (prevWay) path = prevWay;
    else if (key) path = key;
    return path;
  }
  const getValueOutput = (value) => {
    if (value !== null && typeof value === 'object') return `[complex value]`;
    if (typeof value === 'boolean' || _.isNull(value)) return value;
    if (typeof value === 'string') return `'${value}'`;
  }

  const iter = (diff, path, prevKey) => {
    let list = []

    for (const node of diff) {
      const {type, key, value, value1, value2, children} = node;
      let way = getPath(path, prevKey);

      if (node.type === 'nested') {
        list.push(mapping[type](children, key));
      } else {
        const val = getValueOutput(value);
        const val1 = getValueOutput(value1);
        const val2 = getValueOutput(value2);
        if (type === 'nested') list.push(mapping[type](children, way, key));
        if (type === 'deleted') list.push(mapping[type](way, key));
        if (type === 'added') list.push(mapping[type](way, key, val));
        if (type === 'changed') list.push(mapping[type](way, key, val1, val2));
      }
    }

    return list;
  }
  const result = iter(diff);
  return result;
}
