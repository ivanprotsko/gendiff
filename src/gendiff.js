import fs from 'fs';
import yaml from 'js-yaml';
import printResult from './formatters/index.js';

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



export default (pathOne, pathTwo, formatStyle) => {
  const innerTree = buildTree(pathOne, pathTwo);
  return printResult(innerTree, formatStyle);
};
