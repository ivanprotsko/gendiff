import _ from "lodash";
import getAllUniquePropsList from '../utils/get-unique-props.js';
const getLevelParams = (level) => {
  let newLevel = level; newLevel += 1;
  const indent = _.repeat('....', newLevel);
  return { newLevel, indent };
};
const stylishFormatter = (tree) => {
  let result = '';
  const list = [];
  const printSimpleFlatList = (obj, level) => {
    const { newLevel, indent } = getLevelParams(level);

    Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object') {
        list.push(`${indent}${key}: { \n`);
        printSimpleFlatList(value, newLevel);
        list.push(`${indent}}\n`);
      } else {
        list.push(`${indent}${key}: ${value} \n`);
      }
      return list;
    });
  };

  const printResult = (tree, level = 0) => {
    const [objectOne, objectTwo] = tree;
    const { newLevel, indent } = getLevelParams(level);
    const props = getAllUniquePropsList(tree);
    props.map((key) => {
      if (_.has(objectOne, key) && _.has(objectTwo, key)) {
        if (objectOne[key] === null
          || objectTwo[key] === null
          || (typeof objectOne[key] !== 'object'
            && typeof objectTwo[key] !== 'object')) {
          if (objectOne[key] === objectTwo[key]) {
            list.push(`${indent}  ${key}: ${objectOne[key]}\n`);
          }
          if (objectOne[key] !== objectTwo[key]) {
            list.push(`${indent}- ${key}: ${objectOne[key]}\n`);
            list.push(`${indent}+ ${key}: ${objectTwo[key]}\n`);
          }
        }
        if (typeof objectOne[key] === 'object'
          && typeof objectTwo[key] === 'object') {
          list.push(`${indent} ${key}: {\n`);
          printResult([objectOne[key], objectTwo[key]], newLevel);
          list.push(`${indent}}\n`);
        }
        if (typeof objectOne[key] === 'object'
          && typeof objectTwo[key] !== 'object') {
          list.push(`${indent}- ${key}: {\n`);
          printSimpleFlatList(objectOne[key], newLevel);
          list.push(`${indent}}\n`);
          list.push(`${indent}+ ${key}: ${objectTwo[key]}\n`);
        }
      }
      if (!_.has(objectOne, key)) {
        if (objectTwo[key] !== null
          && typeof objectTwo[key] === 'object') {
          list.push(`${indent}+ ${key}: {\n`);
          printSimpleFlatList(objectTwo[key], newLevel);
          list.push(`${indent}}\n`);
        }
        if (objectTwo[key] === null
          || typeof objectTwo[key] !== 'object') {
          list.push(`${indent}+ ${key}: ${objectTwo[key]}\n`);
        }
      }
      if (!_.has(objectTwo, key)) {
        if (objectTwo[key] !== null
          && typeof objectOne[key] === 'object') {
          list.push(`${indent}- ${key}: {\n`);
          printSimpleFlatList(objectOne[key], newLevel);
          list.push(`${indent}}\n`);
        }
        if (objectTwo[key] === null
          || typeof objectOne[key] !== 'object') {
          list.push(`${indent}- ${key}: ${objectOne[key]}\n`);
        }
      }
      return list;
    });
  };

  list.push('{\n');
  printResult(tree);
  list.push('}');

  result = list.join('');
  console.log(result);
  return result;
}
export default stylishFormatter;
