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

// const getLongestObj = (objectOne, objectTwo) => {
//     if ( Object.keys(objectOne).length >=  Object.keys(objectTwo).length) {
//         return { long: objectOne, short: objectTwo }
//     } else {
//         return { long: objectTwo, short: objectOne }
//     }
// }
const getDiffString = (objectOne, objectTwo) => {
    let resultRows = [];

    for (const [key, value] of Object.entries(objectOne)) {
        if (Object.hasOwn(objectTwo, key) && objectOne[key] === objectTwo[key]) {
            resultRows.push(`  ${key}: ${value} \n`);
        } else if (!Object.hasOwn(objectTwo, key)) {
            resultRows.push(`- ${key}: ${value} \n`);
        } else if (Object.hasOwn(objectTwo, key) && objectOne[key] !== objectTwo[key]) {
            resultRows.push(`- ${key}: ${value} \n`);
            resultRows.push(`+ ${key}: ${objectTwo[key]} \n`);
        }
    }
    for (const [key, value] of Object.entries(objectTwo)) {
        if (!Object.hasOwn(objectOne, key)) {
            resultRows.push(`+ ${key}: ${value} \n`);
        }
    }

    return resultRows.join('');
}
const genDiff = () => {
    let [, , filePath_1, filePath_2] = process.argv;
    const fileObject_1 = getObjectFromJSONFile(readFile(filePath_1));
    const fileObject_2 = getObjectFromJSONFile(readFile(filePath_2));
    console.log(
        getDiffString(fileObject_1, fileObject_2)
    );
};
export default genDiff;
