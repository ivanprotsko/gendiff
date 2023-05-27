import gendiff from "../src/gendiff.js";
import path from 'path';
import resultJSON from '../__fixtures__/flat-1-and-2-result.js';
import resultYAML from '../__fixtures__/flat-1-and-2-result.js';

const __dirname = path.resolve();
const jsonFileOne = `${__dirname}/__fixtures__/flat-1.json`;
const jsonFileTwo = `${__dirname}/__fixtures__/flat-2.json`;
const yamlFileOne = `${__dirname}/__fixtures__/flat-1.yaml`;
const yamlFileTwo = `${__dirname}/__fixtures__/flat-2.yaml`;

test('format json data', () => {
    expect(gendiff(jsonFileOne, jsonFileTwo)).toEqual(resultJSON);
});
// test('format yaml data', () => {
// 	expect(gendiff(yamlFileOne, yamlFileTwo)).toEqual(resultYAML);
// });
