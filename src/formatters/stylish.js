import _ from 'lodash';

const getLevelParams = (level) => {
  let newLevel = level; newLevel += 1;
  const indent = _.repeat('    ', newLevel);
  return { newLevel, indent };
};
const printSimpleFlatList = (obj, level) => {
  const { newLevel, indent } = getLevelParams(level);
  const list = [];
  console.log(Object.entries(obj));
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

const printResult = (diff, level = 0) => {
  const list = [];
  diff.map(obj => {
    const { newLevel, indent } = getLevelParams(level);
    const { key, value, value1, value2, type, children } = obj;

    if (type === 'nested') {
      list.push(`${indent}  ${key}: {\n`);
      list.push(printResult(children, newLevel));
      list.push(`${indent}  }\n`);
    }
    if (type === 'added') {
      if (value !== null && typeof value === 'object') {
        list.push(`${indent}+ ${key}: {\n`);
        list.push(printSimpleFlatList(value, newLevel));
        list.push(`${indent}  }\n`);
      } else {
        list.push(`${indent}+ ${key}: ${value}\n`);
      }
    }
    if (type === 'changed') {
      if (value1 !== null && typeof value1 === 'object') {
        list.push(`${indent}- ${key}: {\n`);
        list.push(printSimpleFlatList(value1, newLevel));
        list.push(`${indent}  }\n`);
      } else {
        list.push(`${indent}- ${key}: ${value1}\n`);
      }
      if (value2 !== null && typeof value2 === 'object') {
        list.push(`${indent}+ ${key}: {\n`);
        list.push(printSimpleFlatList(value2, newLevel));
        list.push(`${indent}  }\n`);
      } else {
        list.push(`${indent}+ ${key}: ${value2}\n`);
      }
    }
    if (type === 'deleted') {
      if (value !== null && typeof value === 'object') {
        list.push(`${indent}- ${key}: {\n`);
        list.push(printSimpleFlatList(value, newLevel));
        list.push(`${indent}  }\n`);
      } else {
        list.push(`${indent}- ${key}: ${value}\n`);
      }
    }
    if (type === 'unchanged') {
      list.push(`${indent}  ${key}: ${value}\n`);
    }
  });
  return _.flatten(list).join('');
}
const printStylishFormat = (diff) => {
  const result = printResult(diff);
  return `{\n${result}}`;
}
export default printStylishFormat;
