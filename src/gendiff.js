import fs from 'fs';

const readFile = (file) => {
    return fs.readFileSync(file, 'utf8', (err) => {
        if (err) {
            console.error(err);
        }
    });
};
const getObjectFromJSONFile = (json) => {
    return JSON.parse(json);
};
const gendiffFromAnObject = (objectOne, objectTwo) => {
    const result = [];

    for (const [key, value] of Object.entries(objectOne)) {
        if (Object.hasOwn(objectTwo, key) && objectOne[key] === objectTwo[key]) {
            result.push(`  ${key}: ${value} \n`);
        } else if (!Object.hasOwn(objectTwo, key)) {
            result.push(`- ${key}: ${value} \n`);
        } else if (Object.hasOwn(objectTwo, key) && objectOne[key] !== objectTwo[key]) {
            result.push(`- ${key}: ${value} \n`);
            result.push(`+ ${key}: ${objectTwo[key]} \n`);
        }
    }
    for (const [key, value] of Object.entries(objectTwo)) {
        if (!Object.hasOwn(objectOne, key)) {
            result.push(`+ ${key}: ${value} \n`);
        }
    }
    return result.join('');
};
const [, , filePathOne, filePathTwo] = process.argv;

const gendiffFromAfilePath = (fileOne, fileTwo) => {
    const fileObjectOne = getObjectFromJSONFile(readFile(fileOne));
    const fileObjectTwo = getObjectFromJSONFile(readFile(fileTwo));
    const result = gendiffFromAnObject(fileObjectOne, fileObjectTwo);
    return result;
};

const genDiff = (dataOne = filePathOne, dataTwo = filePathTwo) => {
    let result;
    const pathData = (typeof dataOne === 'string' && typeof dataTwo === 'string');
    const objectData = (typeof dataOne === 'object' && typeof dataTwo === 'object');
    if (pathData === true) {
        result = gendiffFromAfilePath(dataOne, dataTwo);
    } else if (objectData === true) {
        result = gendiffFromAnObject(dataOne, dataTwo);
    }

    console.log(result);
    return result;
};
export default genDiff;
