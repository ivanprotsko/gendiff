import gendiff from "../src/gendiff.js";
import path from 'path';
import result from '../__fixtures__/flat-1-and-2-result.js';

const __dirname = path.resolve();
const path_1 = `${__dirname}/__fixtures__/flat-1.json`;
const path_2 = `${__dirname}/__fixtures__/flat-2.json`;

test('test', () => {
    expect(gendiff(path_1, path_2)).toEqual(result);
});


