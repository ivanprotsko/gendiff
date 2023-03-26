import gendiff from "../src/gendiff.js";

const file_1 = {
    "follow": false,
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22"
};
const file_2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
};
const expectResult = '' +
    '- follow: false \n' +
    '  host: hexlet.io \n' +
    '- timeout: 50 \n' +
    '+ timeout: 20 \n' +
    '- proxy: 123.234.53.22 \n' +
    '+ verbose: true \n';

test('test', () => {
    expect(gendiff(file_1, file_2)).toEqual(expectResult);
});

gendiff(file_1, file_2);

