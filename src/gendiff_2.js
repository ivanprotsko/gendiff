import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

export default (pathOne = filePathOne, pathTwo = filePathTwo, formatName = 'stylysh') => {
	const internalTree = buildTree(pathOne, pathTwo);
	return format(internalTree);
};
const getLevelIndent = (level) => {
	const indent = '11';
	let levelIndent = '';
	do {
		levelIndent += indent;
		level -= 1;
	} while (level !== 0);
	console.log(levelIndent)
	return levelIndent;
}

const format = ([objectOne, objectTwo]) => {
	let result;
	const genFlatResultList = (objectOne, objectTwo) => {
		const list = [];
		const printResult = (objectOne, objectTwo, indent = '') => {
			indent += '  ';
			Object.entries(objectOne).map(([key, value]) => {
				if (typeof value !== 'object') {
					if (Object.hasOwn(objectTwo, key) && objectOne[key] === objectTwo[key]) {
						list.push(`${indent}  ${key}: ${value} \n`);
					} else if (!Object.hasOwn(objectTwo, key)) {
						list.push(`${indent}- ${key}: ${value} \n`);
					} else if (Object.hasOwn(objectTwo, key) && objectOne[key] !== objectTwo[key]) {
						list.push(`${indent}- ${key}: ${value} \n`);
						list.push(`${indent}+ ${key}: ${objectTwo[key]} \n`);
					}
				} else if (typeof value === 'object' && _.has(objectTwo, key)) {
					list.push(`${key}: {\n`);
					printResult(value, objectTwo[key], indent);
					list.push(`}\n`);
				}
			});
			Object.entries(objectTwo).map(([key, value]) => {
				if (!Object.hasOwn(objectOne, key) && typeof value !== 'object') {
					list.push(`${indent}+ ${key}: ${value} \n`);
				}
			});
		}
		list.push(`{ \n`);
		printResult(objectOne, objectTwo );
		list.push(`}`);
		return list.join('');
	}


	result = genFlatResultList(objectOne, objectTwo);
	console.log(result);
	return result;
}
const buildTree = (pathOne, pathTwo) => {
	const objectOne = getData(pathOne);
	const objectTwo = getData(pathTwo);
	return [objectOne, objectTwo];
}
const getData = (file) => {
    const fileFormat = getFileFormat(file);
    if (fileFormat === 'json') {
        return JSON.parse(readFile(file));
    } else if (fileFormat === 'yaml') {
				return yaml.load(readFile(file));
    }
}
const getFileFormat = (filePath) => {
	const [, fileFormat] = filePath.split('.');
	if (fileFormat === 'json') { return 'json' }
	else if ('yml' || 'yaml') { return 'yaml' }
}
const readFile = (file) => {
	return fs.readFileSync(file, 'utf8', (err) => {
		if (err) {
			console.error(err);
		}
	});
};
const [, , filePathOne, filePathTwo] = process.argv;
