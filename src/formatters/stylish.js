import _ from "lodash";
import getAllUniquePropsList from '../utils/get-unique-props.js';
const getLevelParams = (level) => {
  let newLevel = level; newLevel += 1;
  const indent = _.repeat('....', newLevel);
  return { newLevel, indent };
};
const stylishFormatter = (tree, formatStyle) => {
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
  const case_1_1_1 = (objectOne, objectTwo, key, indent) => {
    return `${indent}  ${key}: ${objectOne[key]}\n`;
  }

  const printResult = (tree, level = 0) => {
    const [objectOne, objectTwo] = tree;
    const { newLevel, indent } = getLevelParams(level);
    const props = getAllUniquePropsList(tree);
    props.map((key) => {
      const params = [objectOne, objectTwo, key, indent, newLevel];

      // 1. Если свойство есть в обоих объектах
      if (_.has(objectOne, key) && _.has(objectTwo, key)) {
        // 1.1. Если значения не являются объектами и не равны Null
        if (objectOne[key] === null
          || objectTwo[key] === null
          || (typeof objectOne[key] !== 'object'
            && typeof objectTwo[key] !== 'object')) {
          // 1.1.1. Если значения свойства у обоих объектов равны
          if (objectOne[key] === objectTwo[key]) {
            list.push(`${indent}  ${key}: ${objectOne[key]}\n`);
          }
          // 1.1.2. Если значения свойства у обоих объектов не равны
          if (objectOne[key] !== objectTwo[key]) {
            list.push(`${indent}- ${key}: ${objectOne[key]}\n`);
            list.push(`${indent}+ ${key}: ${objectTwo[key]}\n`);
          }
        }
        // 1.2. Если значения свойства у обоих значений является объектом
        if (typeof objectOne[key] === 'object'
          && typeof objectTwo[key] === 'object') {
          // list.push(switchPrintOutput('1.2', params));
          list.push(`${indent} ${key}: {\n`);
          printResult([objectOne[key], objectTwo[key]], newLevel);
          list.push(`${indent}}\n`);
        }
        // 1.3. Если значение свойства объекта № 1 является объектом
        if (typeof objectOne[key] === 'object'
          && typeof objectTwo[key] !== 'object') {
          list.push(`${indent}- ${key}: {\n`);
          printSimpleFlatList(objectOne[key], newLevel);
          list.push(`${indent}}\n`);
          list.push(`${indent}+ ${key}: ${objectTwo[key]}\n`);
        }
      }
      // 2. Если объект № 1 не содержит свойство
      if (!_.has(objectOne, key)) {
        // 2.1. Если свойство равно Null или не является объектом
        if (objectTwo[key] !== null
          && typeof objectTwo[key] === 'object') {
          list.push(`${indent}+ ${key}: {\n`);
          printSimpleFlatList(objectTwo[key], newLevel);
          list.push(`${indent}}\n`);
        }
        // 2.1. Если свойство равно Null или не является объектом
        if (objectTwo[key] === null
          || typeof objectTwo[key] !== 'object') {
          list.push(`${indent}+ ${key}: ${objectTwo[key]}\n`);
        }
      }
      // 3. Если объект № 2 не содержит свойство
      if (!_.has(objectTwo, key)) {
        // 3.1. Если свойство является объектом и не равно Null
        if (objectTwo[key] !== null
          && typeof objectOne[key] === 'object') {
          list.push(`${indent}- ${key}: {\n`);
          printSimpleFlatList(objectOne[key], newLevel);
          list.push(`${indent}}\n`);
        }
        // 3.2. Если свойство равно Null или не является объектом
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
