import fs from 'fs';
import yaml from 'js-yaml';
import stylishFormatter from './formatters/stylish.js';
import plainFormatter from './formatters/plain.js';

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

const printResult = (innerTree, formatStyle) => {
  switch (formatStyle) {
    case 'stylish':
      return stylishFormatter(innerTree);
      break;
    case 'plain':
      return plainFormatter(innerTree);
      break;
    default:
      console.log('Result Format undefined.');
  }
};

export default (pathOne, pathTwo, formatStyle) => {
  const innerTree = buildTree(pathOne, pathTwo);
  return printResult(innerTree, formatStyle);
};
