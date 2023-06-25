import _ from 'lodash';
import yaml from 'js-yaml';

import printResult from './formatters/index.js';
import readFile from './utils/read-file.js';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
};
const getData = (path) => {
  const [, fileFormat] = path.split('.');
  const file = readFile(path);
  return parsers[fileFormat](file);
};

const buildTree = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: buildTree(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data2[key] };
  });
  return diff;
};
export default (pathOne, pathTwo, formatStyle) => {
  const objA = getData(pathOne);
  const objB = getData(pathTwo);
  const diff = buildTree(objA, objB);

  return printResult(diff, formatStyle);
};
