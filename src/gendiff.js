import fs from 'fs';
import yaml from 'js-yaml';
export default (pathOne = filePathOne, pathTwo = filePathTwo) => {
	const internalTree = buildTree(pathOne, pathTwo);
	return format(internalTree);
};

const format = (internalTree) => {
	const [objectOne, objectTwo] = internalTree;
	const rawResult = [];
	for (const [key, value] of Object.entries(objectOne)) {
		if (Object.hasOwn(objectTwo, key) && objectOne[key] === objectTwo[key]) {
			rawResult.push(`  ${key}: ${value} \n`);
		} else if (!Object.hasOwn(objectTwo, key)) {
			rawResult.push(`- ${key}: ${value} \n`);
		} else if (Object.hasOwn(objectTwo, key) && objectOne[key] !== objectTwo[key]) {
			rawResult.push(`- ${key}: ${value} \n`);
			rawResult.push(`+ ${key}: ${objectTwo[key]} \n`);
		}
	}
	for (const [key, value] of Object.entries(objectTwo)) {
		if (!Object.hasOwn(objectOne, key)) {
			rawResult.push(`+ ${key}: ${value} \n`);
		}
	}
	const finalResultString = rawResult.join('');
	console.log(finalResultString);
	return finalResultString;
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
// export default genDiff;
