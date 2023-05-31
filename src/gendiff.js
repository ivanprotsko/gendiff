import fs from 'fs';
import yaml from 'js-yaml';
import stylishFormatter from './formatters/stylish.js';
import {Command} from "commander";
import metaData from "../package.json" assert {type: 'json'};

const program = new Command();

program
  .name('gendiff')
  .description('  Compares two configuration files and shows a difference.\n')
  .version(metaData.version);
program
  .option('-f, --format <type>', 'output format')
program.parse();

const options = program.opts();
if (options.format) console.log(options.format);
const formatStyle = options.format;

export const [, , filePathOne, filePathTwo] = process.argv;

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
  let result;
  switch (formatStyle) {
    case 'stylish':
      return result = stylishFormatter(innerTree);
      break;
    default:
      console.log('Result Format undifined.');
  }
  return result;
};


export default (pathOne = filePathOne, pathTwo = filePathTwo, style = formatStyle) => {
  const innerTree = buildTree(pathOne, pathTwo);
  return printResult(innerTree, style);
};
