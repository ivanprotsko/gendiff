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
const yamlFileOne = `${__dirname}/__fixtures__/flat-1.yaml`;
const yamlFileTwo = `${__dirname}/__fixtures__/flat-2.yaml`;

test('format flat json data', () => {
    expect(gendiff(flatJSONFileOne, flatJSONFileTwo)).toEqual(flatFilesResult);
});
test('format nested json data', () => {
  expect(gendiff(nestedJSONFileOne, nestedJSONFileTwo)).toEqual(nestedFilesResult);
});
// test('format yaml data', () => {
// 	expect(gendiff(yamlFileOne, yamlFileTwo)).toEqual(resultYAML);
// });
