import fs from 'fs';
const readFile = (file) => {
    return fs.readFileSync(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    });
};
const getObjectFromJSONFile = (json) => {
    return JSON.parse(json);
}
const gendiffFromAnObject = (objectOne, objectTwo) => {
    let result = [];
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
}
let [, , filePath_1, filePath_2] = process.argv;

const gendiffFromAfilePath = (file_1, file_2) => {
    const fileObject_1 = getObjectFromJSONFile(readFile(file_1)),
        fileObject_2 = getObjectFromJSONFile(readFile(file_2));
    const result = gendiffFromAnObject(fileObject_1, fileObject_2);
    return result;
}


const genDiff = (data_1 = filePath_1, data_2 = filePath_2) => {
    let result;

    let pathData = (typeof data_1 === 'string' && typeof data_2 === 'string');
    let objectData = (typeof data_1 === 'object' && typeof data_2 === 'object' );

    if (pathData === true) {
        result = gendiffFromAfilePath(data_1, data_2);
    } else if (objectData === true) {
        result = gendiffFromAnObject(data_1, data_2);
    }

    console.log(result);
    return result;
};
export default genDiff;
