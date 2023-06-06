import gendiff from "../src/gendiff.js";
import path from 'path';
import stylishFlatFilesResult from '../__fixtures__/formatter-result/stylish-flat.js';
import stylishNestedFilesResult from '../__fixtures__/formatter-result/stylish-nested.js';
import plainFlatFilesResult from '../__fixtures__/formatter-result/plain-flat.js';
import plainNestedFlatFilesResult from '../__fixtures__/formatter-result/plain-nested.js';
import stylish from "../src/formatters/stylish.js";

const __dirname = path.resolve();
const flatJSONFileOne = `${__dirname}/__fixtures__/flat-1.json`;
const flatJSONFileTwo = `${__dirname}/__fixtures__/flat-2.json`;
const nestedJSONFileOne = `${__dirname}/__fixtures__/nested-1.json`;
const nestedJSONFileTwo = `${__dirname}/__fixtures__/nested-2.json`;
const flatYAMLFileOne = `${__dirname}/__fixtures__/flat-1.yaml`;
const flatYAMLFileTwo = `${__dirname}/__fixtures__/flat-2.yaml`;
const nestedYAMLFileOne = `${__dirname}/__fixtures__/nested-1.yaml`;
const nestedYAMLFileTwo = `${__dirname}/__fixtures__/nested-2.yaml`;

test('stylish format flat JSON data', () => {
    expect(gendiff(flatJSONFileOne, flatJSONFileTwo, 'stylish')).toEqual(stylishFlatFilesResult);
});
test('stylish format nested JSON data', () => {
  expect(gendiff(nestedJSONFileOne, nestedJSONFileTwo, 'stylish')).toEqual(stylishNestedFilesResult);
});
test('stylish format flat YAML data', () => {
  expect(gendiff(flatYAMLFileOne, flatYAMLFileTwo, 'stylish')).toEqual(stylishFlatFilesResult);
});
test('stylish format nested YAML data', () => {
  expect(gendiff(nestedYAMLFileOne, nestedYAMLFileTwo, 'stylish')).toEqual(stylishNestedFilesResult);
});
test('plain format flat JSON data', () => {
  expect(gendiff(flatJSONFileOne, flatJSONFileTwo, 'plain')).toEqual(plainFlatFilesResult);
});
test('plain format nested JSON data', () => {
  expect(gendiff(nestedJSONFileOne, nestedJSONFileTwo, 'plain')).toEqual(plainNestedFlatFilesResult);
});
test('plain format flat YAML data', () => {
  expect(gendiff(flatYAMLFileOne, flatYAMLFileTwo, 'plain')).toEqual(plainFlatFilesResult);
});
test('plain format nested YAML data', () => {
  expect(gendiff(nestedYAMLFileOne, nestedYAMLFileTwo, 'plain')).toEqual(plainNestedFlatFilesResult);
});
