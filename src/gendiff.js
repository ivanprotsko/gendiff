import fs from 'fs';
import yaml from 'js-yaml';
import _ from 'lodash';

export default (pathOne = filePathOne, pathTwo = filePathTwo, formatName = 'stylysh') => {
	const innerTree = buildTree(pathOne, pathTwo);
	return format(innerTree);
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

const format = (innerTree) => {
	let result;
	let list = [];

	const printSimpleFlatList = (obj, level) => {
		level += 1;
		let indent = _.repeat('    ', level);
		Object.entries(obj).map(([key, value]) => {
			if (typeof value === 'object') {
				list.push(`${indent}  ${key}: { \n`);
				printSimpleFlatList(value, level);
				list.push(`${indent}  }\n`);
			} else {
				list.push(`${indent}  ${key}: ${value} \n`);
			}
		});
		return list;
	}
	const getAllUniquePropsList = (innerTree) => {
		let allProps = [];
		for (let obj of innerTree) {
			allProps.push(Object.keys(obj));
		}
		const props = allProps.flat();
		return _.uniqBy(props,JSON.stringify).sort();
	}

	const printResult = (innerTree, level = 0) => {
		const [objectOne, objectTwo] = innerTree;
		level++;
		let indent = _.repeat('    ', level);
		const props = getAllUniquePropsList(innerTree);
		props.map((key) => {

			if (_.has(objectOne, key) && _.has(objectTwo, key)) {
				if (objectOne[key] === null ||
						objectTwo[key] === null ||
						typeof objectOne[key] !== 'object' &&
						typeof objectTwo[key] !== 'object') {
							if (objectOne[key] === objectTwo[key]) {
								list.push(`${indent}  ${key}: ${objectOne[key]}\n`);
							}
							if (objectOne[key] !== objectTwo[key]) {
								list.push(`${indent}- ${key}: ${objectOne[key]}\n`);
								list.push(`${indent}+ ${key}: ${objectTwo[key]}\n`);
							}
				}
				if (typeof objectOne[key] === 'object' &&
						typeof objectTwo[key] === 'object') {
					list.push(`${indent} ${key}: {\n`);
					printResult([objectOne[key],objectTwo[key]], level);
					list.push(`${indent}  }\n`);
				}
			}
			if (!_.has(objectOne, key)) {
				if (objectTwo[key] !== null && typeof objectTwo[key] === 'object') {
					list.push(`${indent}+ ${key}: {\n`);
					printSimpleFlatList(objectTwo[key], level);
					list.push(`${indent}  }\n`);
				}
				if (objectTwo[key] === null || typeof objectTwo[key] !== 'object') {
					list.push(`${indent}+ ${key}: ${objectTwo[key]} \n`);
				}
			}
			if (!_.has(objectTwo, key)) {
				if (objectTwo[key] !== null && typeof objectOne[key] === 'object') {
					list.push(`${indent}- ${key}: {\n`);
					printSimpleFlatList(objectOne[key], level);
					list.push(`${indent}  }\n`);
				}
				if (objectTwo[key] === null || typeof objectOne[key] !== 'object') {
					list.push(`${indent}- ${key}: ${objectOne[key]} \n`);
				}
			}

		});
		// 1. Если оба объекта имеют ключ
		// 		1.1. и значения ключей не являются объектами
		// 				 1.1.1. а также значения ключей равны
		//				 1.1.2. значения ключей не равны
		// 		1.2. если оба объекта являются объектами
		// 		1.3. если значение первого ключа является объектом
		// 		1.4. если значение второго ключа является объектом
		// 2. Если первый объект не имеет ключа
		//		2.1. и если ключ не является объектом
		// 		2.2. и если ключ является объектом
		// 3. Если второй объект не имеет ключа
		// 		3.1. и если ключ не является объектом
		// 		3.2. и если ключ является объектом

	}
	list.push(`{ \n`);
	printResult(innerTree);
	list.push(`}`);

	result = list.join('');
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
