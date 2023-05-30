import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';
import stylishFormatter from './formatters/stylish.js'

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

const format = (innerTree, formatStyle) => {
  let result;
  if (formatStyle === 'stylish') {
    result = stylishFormatter(innerTree);
  }
  return result;
};

export default (pathOne = filePathOne, pathTwo = filePathTwo, formatStyle = 'stylish') => {
  const innerTree = buildTree(pathOne, pathTwo);
  return format(innerTree, formatStyle);
};
