import path from 'path';
import gendiff from "../src/gendiff.js";
import result from '../__fixtures__/expected-formats.js';

const buildPath = (format, structure, file) => {
  const __dirname = path.resolve();
  return `${__dirname}/__fixtures__/files/${format}/${structure}/${file}.${format}`;
}

test('Stylish, YAML, flat', () => {
  expect(gendiff(
    buildPath('yaml', 'flat', 'a'),
    buildPath('yaml', 'flat', 'b'),
    'stylish')).toEqual(result.stylish.flat);
});
test('Stylish, YAML, nested', () => {
  expect(gendiff(
    buildPath('yaml', 'nested', 'a'),
    buildPath('yaml', 'nested', 'b'),
    'stylish')).toEqual(result.stylish.nested);
});

test('Stylish, JSON, flat', () => {
  expect(gendiff(
    buildPath('json', 'flat', 'a'),
    buildPath('json', 'flat', 'b'),
    'stylish')).toEqual(result.stylish.flat);
});
test('Stylish, JSON, nested', () => {
  expect(gendiff(
    buildPath('json', 'nested', 'a'),
    buildPath('json', 'nested', 'b'),
    'stylish')).toEqual(result.stylish.nested);
});
test('Plain, JSON, nested', () => {
  expect(gendiff(
    buildPath('json', 'nested', 'a'),
    buildPath('json', 'nested', 'b'),
    'plain')).toEqual(result.plain.nested);
});
test('Plain, JSON, flat', () => {
  expect(gendiff(
    buildPath('json', 'flat', 'a'),
    buildPath('json', 'flat', 'b'),
    'plain')).toEqual(result.plain.flat);
});
test('JSON, JSON, nested', () => {
  expect(gendiff(
    buildPath('json', 'nested', 'a'),
    buildPath('json', 'nested', 'b'),
    'json')).toEqual(result.json.nested);
});
test('JSON, JSON, flat', () => {
  expect(gendiff(
    buildPath('json', 'flat', 'a'),
    buildPath('json', 'flat', 'b'),
    'json')).toEqual(result.json.flat);
});
