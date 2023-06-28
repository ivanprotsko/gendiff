import _ from 'lodash';

const getPath = (path, key) => {
    if (path && key) return [path, key].join('.');
    if (path) return path;
    return key;
};
const getValueOutput = (value) => {
    if (_.isNull(value)) return value;
    switch (typeof value) {
    case 'boolean': return value;
    case 'number': return value;
    case 'object': return '[complex value]';
    default: return `'${value}'`;
    }
};
const mapping = {
    nested: ({ children, key }, path, iter) => iter(children, path, key),
    deleted: ({ key }, path) => `Property '${getPath(path, key)}' was removed`,
    added: ({ key, value }, path) => `Property '${getPath(path, key)}' was added with value: ${getValueOutput(value)}`,
    changed: ({ key, value1, value2 }, path) => `Property '${getPath(path, key)}' was updated. From ${getValueOutput(value1)} to ${getValueOutput(value2)}`,
};
const iter = (childs, previousPath, previousKey) => {
    const path = getPath(previousPath, previousKey);
    const changedNodes = childs.filter((node) => { return node.type !== 'unchanged'; });
    return changedNodes.flatMap((node) => mapping[node.type](node, path, iter));
};
export default (diff) => {
    return iter(diff).join('\n');
};
