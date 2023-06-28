import _ from 'lodash';

const getLevel = (level) => {
    if (_.isUndefined(level)) return 0;
    return level + 1;
};
const getIndent = (newLevel) => {
    const initialIndent = '  ';
    const regularIndent = '    ';
    if (newLevel === 0) return '  ';
    return _.repeat(regularIndent, newLevel) + initialIndent;
};
const printSimpleFlatList = (obj, level) => {
    const newLevel = getLevel(level);
    const indent = getIndent(newLevel);
    const list = [];

    for (const [key, value] of Object.entries(obj)) {
        if (value !== null && typeof value === 'object') {
            list.push(`${indent}  ${key}: {\n`);
            list.push(`${printSimpleFlatList(value, newLevel)}`);
            list.push(`${indent}  }\n`);
        } else {
            list.push(`${indent}  ${key}: ${value}\n`);
        }
    }
    return _.flatten(list).join('');
};

const printResult = (childs, level) => {
    const list = [];
    const newLevel = getLevel(level);
    const mapping = {
        nested: (children, key, prevLevel, indent) => `${indent}  ${key}: {\n${printResult(children, prevLevel)}${indent}  }\n`,
        added: {
            obj: (value, key, prevLevel, indent) => `${indent}+ ${key}: {\n${printSimpleFlatList(value, prevLevel)}${indent}  }\n`,
            nonObj: (value, key, indent) => `${indent}+ ${key}: ${value}\n`,
        },
        deleted: {
            obj: (value, key, prevLevel, indent) => `${indent}- ${key}: {\n${printSimpleFlatList(value, prevLevel)}${indent}  }\n`,
            nonObj: (value, key, indent) => `${indent}- ${key}: ${value}\n`,
        },
        changed: {
            obj: (value, key, prevLevel, indent) => `${indent}- ${key}: {\n${printSimpleFlatList(value, prevLevel)}${indent}  }\n`,
            nonObj: (value, key, indent) => `${indent}- ${key}: ${value}\n`,
        },
        unchanged: {
            nonObj: (value, key, indent) => `${indent}  ${key}: ${value}\n`,
        },
    };

    childs.map((obj) => {
        const indent = getIndent(newLevel);
        const {
            key, value, value1, value2, type, children,
        } = obj;

        if (type === 'nested') {
            list.push(mapping[type](children, key, newLevel, indent));
        }
        if (type === 'added') {
            if (value !== null && typeof value === 'object') list.push(mapping[type].obj(value, key, newLevel, indent));
            else list.push(mapping[type].nonObj(value, key, indent));
        }
        if (type === 'changed') {
            if (value1 !== null && typeof value1 === 'object') list.push(mapping.deleted.obj(value1, key, newLevel, indent));
            else list.push(mapping.deleted.nonObj(value1, key, indent));

            if (value2 !== null && typeof value2 === 'object') list.push(mapping.added.obj(value2, key, newLevel, indent));
            else list.push(mapping.added.nonObj(value2, key, indent));
        }
        if (type === 'deleted') {
            if (value !== null && typeof value === 'object') list.push(mapping[type].obj(value, key, newLevel, indent));
            else list.push(mapping[type].nonObj(value, key, indent));
        }
        if (type === 'unchanged') list.push(mapping[type].nonObj(value, key, indent));
        return null;
    });
    return _.flatten(list).join('');
};
export default (diff) => {
    const result = printResult(diff);
    return `{\n${result}}`;
};
