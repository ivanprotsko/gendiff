import path from 'path';
import gendiff from "../src/gendiff.js";
import stylishFlatRes from '../__fixtures__/expected-format/stylish/flat.js';
import stylishNestRes from '../__fixtures__/expected-format/stylish/nested.js';
import plainNestRes from '../__fixtures__/expected-format/plain/nested.js';
import plainFlatRes from '../__fixtures__/expected-format/plain/flat.js';
import jsonNestRes from '../__fixtures__/expected-format/json/nested.js';
import stylish from "../src/formatters/stylish.js";

const __dirname = path.resolve();

const fixturesPath = `${__dirname}/__fixtures__/files/`;
const flatJSON1 = `${fixturesPath}json/flat-1.json`;
const flatJSON2 = `${fixturesPath}json/flat-2.json`;
const nestedJSON1 = `${fixturesPath}json/nested-1.json`;
const nestedJSON2 = `${fixturesPath}json/nested-2.json`;
const flatYAML1 = `${fixturesPath}yaml/flat-1.yaml`;
const flatYAML2 = `${fixturesPath}yaml/flat-2.yaml`;
const nestedYAML1 = `${fixturesPath}yaml/nested-1.yaml`;
const nestedYAML2 = `${fixturesPath}yaml/nested-2.yaml`;

// Stylish format
test('Stylish, JSON, flat', () => {
    expect(gendiff(flatJSON1, flatJSON2, 'stylish')).toEqual(stylishFlatRes);
});
test('Stylish, JSON, nested', () => {
  expect(gendiff(nestedJSON1, nestedJSON2, 'stylish')).toEqual(stylishNestRes);
});
test('Stylish, YAML, nested', () => {
  expect(gendiff(flatYAML1, flatYAML2, 'stylish')).toEqual(stylishFlatRes);
});
test('Stylish, YAML, nested', () => {expect(gendiff(nestedYAML1, nestedYAML2, 'stylish')).toEqual(stylishNestRes);});

test('Plain, JSON, nested', () => {
  expect(gendiff(nestedJSON1, nestedJSON2, 'plain')).toEqual(plainNestRes);
});
test('Plain, JSON, flat', () => {
  expect(gendiff(flatJSON1, flatJSON2, 'plain')).toEqual(plainFlatRes);
});
test('JSON, JSON, nested', () => {
  expect(gendiff(nestedJSON1, nestedJSON2, 'json')).toEqual(jsonNestRes);
});
