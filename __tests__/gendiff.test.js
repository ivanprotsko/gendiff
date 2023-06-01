import gendiff from "../src/gendiff.js";
import path from 'path';
import flatFilesResult from '../__fixtures__/flat-1-and-2-result.js';
import nestedFilesResult from '../__fixtures__/nested-1-and-2-result.js';
import resultJSON from '../__fixtures__/flat-1-and-2-result.js';
import resultYAML from '../__fixtures__/flat-1-and-2-result.js';

const __dirname = path.resolve();
const flatJSONFileOne = `${__dirname}/__fixtures__/flat-1.json`;
const flatJSONFileTwo = `${__dirname}/__fixtures__/flat-2.json`;
const nestedJSONFileOne = `${__dirname}/__fixtures__/nested-1.json`;
const nestedJSONFileTwo = `${__dirname}/__fixtures__/nested-2.json`;
const flatYAMLFileOne = `${__dirname}/__fixtures__/flat-1.yaml`;
const flatYAMLFileTwo = `${__dirname}/__fixtures__/flat-2.yaml`;
const nestedYAMLFileOne = `${__dirname}/__fixtures__/nested-1.yaml`;
const nestedYAMLFileTwo = `${__dirname}/__fixtures__/nested-2.yaml`;

test('format flat JSON data', () => {
    expect(gendiff(flatJSONFileOne, flatJSONFileTwo, 'stylish')).toEqual(flatFilesResult);
});
test('format nested JSON data', () => {
  expect(gendiff(nestedJSONFileOne, nestedJSONFileTwo, 'stylish')).toEqual(nestedFilesResult);
});
test('format flat YAML data', () => {
  expect(gendiff(flatYAMLFileOne, flatYAMLFileTwo, 'stylish')).toEqual(flatFilesResult);
});
test('format nested YAML data', () => {
  expect(gendiff(nestedYAMLFileOne, nestedYAMLFileTwo, 'stylish')).toEqual(nestedFilesResult);
});
