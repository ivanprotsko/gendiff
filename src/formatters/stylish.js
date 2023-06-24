import _ from 'lodash';

const getLevel = (level) => { return level += 1 };
const getIndent = (newLevel) => { return _.repeat('    ', newLevel) };
const printSimpleFlatList = (obj, level) => {
  const newLevel = getLevel(level);
  const indent = getIndent(newLevel);
  const list = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && typeof value === 'object') {
      list.push(`${indent}  ${key}: { \n`);
      list.push(`${printSimpleFlatList(value, newLevel)}`);
      list.push(`${indent}  }\n`);
    } else {
      list.push(`${indent}  ${key}: ${value} \n`);
    }
  }

  return _.flatten(list).join('');
};

const mapping = {
  nested: (children, key, newLevel, indent) => `${indent}  ${key}: {\n${printResult(children, newLevel)}${indent}  }\n`,
  added: {
    obj: (value, key, newLevel, indent) => `${indent}+ ${key}: {\n${printSimpleFlatList(value, newLevel)}${indent}  }\n`,
    nonObj: (value, key, indent) => `${indent}+ ${key}: ${value}\n`
  },
  deleted: {
    obj: (value, key, newLevel, indent) => `${indent}- ${key}: {\n${printSimpleFlatList(value, newLevel)}${indent}  }\n`,
    nonObj: (value, key, indent) => `${indent}- ${key}: ${value}\n`
  },
  changed: {
    obj: (value, key, newLevel, indent) => `${indent}- ${key}: {\n${printSimpleFlatList(value, newLevel)}${indent}  }\n`,
    nonObj: (value, key, indent) => `${indent}- ${key}: ${value}\n`
  },
  unchanged: {
    nonObj: (value, key, indent) => `${indent}  ${key}: ${value}\n`
  },
}

const printResult = (diff, level = 0) => {
  const list = [];
  const newLevel = getLevel(level);

  diff.map(obj => {
    const indent = getIndent(newLevel);
    const { key, value, value1, value2, type, children } = obj;

    if (type === 'nested') {
      list.push(mapping[type](children, key, newLevel, indent));
    }
    if (type === 'added') {
      if (value !== null && typeof value === 'object') list.push(mapping[type]['obj'](value, key, newLevel, indent));
      else list.push(mapping[type]['nonObj'](value, key, indent));
    }
    if (type === 'changed') {
      if (value1 !== null && typeof value1 === 'object') list.push(mapping['deleted']['obj'](value1, key, newLevel, indent));
      else list.push(mapping['deleted']['nonObj'](value1, key, indent));

      if (value2 !== null && typeof value2 === 'object') list.push(mapping['added']['obj'](value2, key, newLevel, indent));
      else list.push(mapping['added']['nonObj'](value2, key, indent));
    }
    if (type === 'deleted') {
      if (value !== null && typeof value === 'object') list.push(mapping[type]['obj'](value, key, newLevel, indent));
      else list.push(mapping[type]['nonObj'](value, key, indent));
    }
    if (type === 'unchanged') list.push(mapping[type]['nonObj'](value, key, indent));

  });

  return _.flatten(list).join('');
}
export default (diff) => {
  const result = printResult(diff);
  return `{\n${result}}`;
}
