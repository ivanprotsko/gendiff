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
  const printValueFormat = (key) => {
    if (typeof key === 'boolean' || key === null) {
      return `${key}`;
    } else if (typeof key === 'string') {
      return `'${key}'`
    } else if (typeof key === 'object') {
      return '[complex value]';
    } else if (typeof key === 'number') {
      return `'${key}'`;
    }
  }
  const printResult = (tree, key, previousWay) => {
    const [objectOne, objectTwo] = tree;
    const props = getAllUniquePropsList(tree);
    let way = previousWay ? previousWay : [];
    if (key) way.push(`${key}.`);
    const theWay = way.join('');

    props.map((key) => {
      // 1. Если свойство есть в обоих объектах
      if (_.has(objectOne, key) && _.has(objectTwo, key)) {
        // 1.1. Если значения не являются объектами и не равны Null
        if (objectOne[key] === null
          || objectTwo[key] === null
          || (typeof objectOne[key] !== 'object'
            && typeof objectTwo[key] !== 'object')) {
          // 1.1.1. Если значения свойства у обоих объектов равны
          if (objectOne[key] === objectTwo[key]) {
            // do nothing
          }
          // 1.1.2. Если значения свойства у обоих объектов не равны
          if (objectOne[key] !== objectTwo[key]) {
              list.push(`Property ${theWay}${key} was updated. From value ${printValueFormat(objectOne[key])} to ${printValueFormat(objectTwo[key])}\n`);
            }
          }
        }
        // 1.2. Если значения свойства у обоих значений является объектом
        if (typeof objectOne[key] === 'object'
          && typeof objectTwo[key] === 'object') {
          // list.push(switchPrintOutput('1.2', params));
          printResult([objectOne[key], objectTwo[key]], key, way);
        }
        // 1.3. Если значение свойства объекта № 1 является объектом
        if (typeof objectOne[key] === 'object'
          && typeof objectTwo[key] !== 'object' && objectTwo[key] !== undefined) {
          list.push(`Property ${theWay}${key} was updated. From value [complex value] to ${printValueFormat(objectTwo[key])}\n`);
        }
        // 1.4. Если значение свойства объекта № 2 является объектом
        if (typeof objectOne[key] !== 'object' && objectOne[key] !== undefined
          && typeof objectTwo[key] === 'object' && objectTwo[key] !== null) {
          // ! need test
          list.push(`Property ${theWay}${key} was updated. From value ${printValueFormat(objectOne[key])} to [complex value]\n`);
        }

      // 2. Если объект № 1 не содержит свойство
      if (!_.has(objectOne, key)) {
        // 2.1. Если свойство равно Null или не является объектом
        if (objectTwo[key] !== null
          && typeof objectTwo[key] === 'object') {
          list.push(`Property ${theWay}${key} added with value: [complex value]\n`);
        }
        // 2.1. Если свойство равно Null или не является объектом
        if (objectTwo[key] === null
          || typeof objectTwo[key] !== 'object') {
          list.push(`Property ${theWay}${key} added with value: ${printValueFormat(objectTwo[key])}\n`);
        }
      }
      // 3. Если объект № 2 не содержит свойство
      if (!_.has(objectTwo, key)) {
        // 3.1. Если свойство является объектом и не равно Null
        if (objectTwo[key] !== null && typeof objectOne[key] === 'object') {
          list.push(`Property ${theWay}${key} was removed\n`);
        }
        // 3.2. Если свойство равно Null или не является объектом
        if (objectTwo[key] === null || typeof objectOne[key] !== 'object') {
          list.push(`Property ${theWay}${key} was removed\n`);
        }
      }
      way = []
      return list;
    });
  };

  printResult(tree);
  result = list.join('');
  return result;
}
export default stylishFormatter;
