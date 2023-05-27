import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

const [, , filePathOne, filePathTwo] = process.argv;

const readFile = (file) => {
  return fs.readFileSync(file, 'utf8', (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const getFileFormat = (filePath) => {
  const [, fileFormat] = filePath.split('.');
  return fileFormat;
};

const getData = (file) => {
  const fileFormat = getFileFormat(file);
  let data;

  switch (fileFormat) {
  case 'json':
    data = JSON.parse(readFile(file));
    break;
  case 'yaml':
    data = yaml.load(readFile(file));
    break;
  default:
    console.log('File format undefined');
  }
  return data;
};

const buildTree = (pathOne, pathTwo) => {
  const objectOne = getData(pathOne);
  const objectTwo = getData(pathTwo);
  return [objectOne, objectTwo];
};
const getLevelParams = (level) => {
  let newLevel = level; newLevel += 1;
  const indent = _.repeat('    ', newLevel);
  return { newLevel, indent };
};

const format = (innerTree) => {
  let result = '';
  const list = [];

  const printSimpleFlatList = (obj, level) => {
    const { newLevel, indent } = getLevelParams(level);

    Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object') {
        list.push(`${indent}  ${key}: { \n`);
        printSimpleFlatList(value, newLevel);
        list.push(`${indent}  }\n`);
      } else {
        list.push(`${indent}  ${key}: ${value} \n`);
      }
      return list;
    });
  };

  const getAllUniquePropsList = (tree) => {
    const allProps = [];
    for (const obj of tree) {
      allProps.push(Object.keys(obj));
    }
    const props = allProps.flat();
    return _.uniqBy(props, JSON.stringify).sort();
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
  printResult(innerTree);
  list.push('}');

  result = list.join('');
  console.log(result);
  return result;
};

export default (pathOne = filePathOne, pathTwo = filePathTwo) => {
  const innerTree = buildTree(pathOne, pathTwo);
  return format(innerTree);
};
