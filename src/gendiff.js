import * as fs from 'fs';


const genDiff = () => {
    let filePath_1 = process.argv[2];
    let filePath_2 = process.argv[3];
    let resultRows = [];
    let result = '';

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

    const fileObject_1 = getObjectFromJSONFile(readFile(filePath_1));
    const fileObject_2 = getObjectFromJSONFile(readFile(filePath_2));

    const getDiffString = (obj_1, obj_2) => {
        const getLongest = (obj_1, obj_2) => {
            if ( Object.keys(obj_1).length >=  Object.keys(obj_2).length) {
                return { long: obj_1, short: obj_2 }
            } else {
                return { long: obj_2, short: obj_1 }
            }
        }
        const object = getLongest(obj_1, obj_2);

        for (const [key, value] of Object.entries(object.long)) {
            if (Object.hasOwn(object.short, key)) {
                if (object.long[key] === object.short[key]) {
                    resultRows.push(`   ${key}: ${value} \n`);
                } else {
                    resultRows.push(`- ${key}: ${value} \n`);
                    resultRows.push(`+ ${key}: ${object.short[key]} \n`);
                }
            } else {
                resultRows.push(`+ ${key}: ${value} \n`);
            }
        }
        for (const [key, value] of Object.entries(object.short)) {
            if (!Object.hasOwn(object.long, key)) {
                resultRows.push(`+ ${key}: ${value} \n`);
            }
        }
        return resultRows.join('');
    }

    result = getDiffString(fileObject_1, fileObject_2)

    console.log(result);

}

genDiff();

export default genDiff;
