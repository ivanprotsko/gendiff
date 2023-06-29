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
const printSimpleFlatList = (obj, level, counter = 0) => {
  const newLevel = getLevel(level);
  const indent = getIndent(newLevel);
  const objEntries = Object.entries(obj);
  const result = objEntries.flatMap(([key, value]) => {
    if (value !== null && typeof value === 'object') return `${indent}  ${key}: {\n${printSimpleFlatList(value, newLevel, counter)}${indent}  }\n`;
    else return `${indent}  ${key}: ${value}\n`;
  })

  return result.join('');
};

const mapping = {
  nested: ({ children, key }, indent, prevLevel, printResult) => `${indent}  ${key}: {\n${printResult(children, prevLevel)}${indent}  }\n`,
  added: {
    obj: ({ value, key }, indent, prevLevel) => `${indent}+ ${key}: {\n${printSimpleFlatList(value, prevLevel)}${indent}  }\n`,
    nonObj: ({ value, key }, indent) => `${indent}+ ${key}: ${value}\n`,
  },
  deleted: {
    obj: ({ value, key }, indent, prevLevel) => `${indent}- ${key}: {\n${printSimpleFlatList(value, prevLevel)}${indent}  }\n`,
    nonObj: ({ value, key }, indent) => `${indent}- ${key}: ${value}\n`,
  },
  changed: {
    added: {
      obj: ({ value2, key }, indent, prevLevel) => mapping.added.obj({value: value2, key}, indent, prevLevel),
      nonObj: ({ value2, key }, indent) => mapping.added.nonObj({value: value2, key}, indent),
    },
    deleted: {
      obj: ({ value1, key }, indent, prevLevel) => mapping.deleted.obj({value: value1, key}, indent, prevLevel),
      nonObj: ({ value1, key }, indent) => mapping.deleted.nonObj({value: value1, key}, indent),
    },
  },
  unchanged: {
    nonObj: ({ value, key }, indent) => `${indent}  ${key}: ${value}\n`,
  },
};

const printResult = (childs, level) => {
  const list = [];
  const newLevel = getLevel(level);

  childs.flatMap((node) => {
    const indent = getIndent(newLevel);
    const { value, value1, value2, type, } = node;
    const valueType = _.isObject(value) ? 'obj' : 'nonObj';

    if (type === 'nested')   list.push(mapping[type](node, indent, newLevel, printResult));
    if (type === 'added')    list.push(mapping[type][valueType](node, indent, newLevel));
    if (type === 'deleted' ) list.push(mapping[type][valueType](node, indent, newLevel));

    if (type === 'changed') {
      if (_.isObject(value1)) list.push(mapping[type].deleted.obj(node, indent, newLevel));
      else list.push(mapping[type].deleted.nonObj(node, indent));

      if (_.isObject(value2)) list.push(mapping[type].added.obj(node, newLevel, indent));
      else list.push(mapping[type].added.nonObj(node, indent));
    }

    if (type === 'unchanged') list.push(mapping[type].nonObj(node, indent));
    return list;
  });g
  return list.join('');
};
export default (diff) => `{\n${printResult(diff)}}`;
