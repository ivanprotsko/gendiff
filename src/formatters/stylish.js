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
    return `${indent}  ${key}: ${value}\n`;
  });
  return result.join('');
};
const getSymbol = (type) => {
  switch (type) {
    case 'added': return '+';
    case 'deleted': return '-';
    default: return ' ';
  }
};
const render = (node, indent, prevLevel, symbol) => {
  const { key, value } = node;
  if (_.isObject(value)) return `${indent}${symbol} ${key}: {\n${printSimpleFlatList(value, prevLevel)}${indent}  }\n`;
  return `${indent}${symbol} ${key}: ${value}\n`;
};
const mapping = {

  nested: ({ type, key, children }, indent, prevLevel, printResult) => `${indent}${getSymbol(type)} ${key}: {\n${printResult(children, prevLevel)}${indent}  }\n`,
  unchanged: (node, indent, prevLevel) => render(node, indent, prevLevel, ' '),
  deleted: (node, indent, prevLevel) => render(node, indent, prevLevel, '-'),
  added: (node, indent, prevLevel) => render(node, indent, prevLevel, '+'),
  changed: ({ value1, value2, key }, indent, prevLevel) => {
    const list = ['-', '+'].flatMap((symbol) => {
      if (symbol === '-') return render({ value: value1, key }, indent, prevLevel, symbol);
      return render({ value: value2, key }, indent, prevLevel, symbol);
    });
    return list.join('');
  },
};

const printResult = (childs, level) => {
  const newLevel = getLevel(level);
  const list = childs.flatMap((node) => {
    const indent = getIndent(newLevel);
    return mapping[node.type](node, indent, newLevel, printResult);
  });
  return list.join('');
};
export default (diff) => `{\n${printResult(diff)}}`;
