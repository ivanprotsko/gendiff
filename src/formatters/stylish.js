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

const render = (node, indent, prevLevel, symbol, printSimpleNode) => {
  const { key, value } = node;
  if (_.isObject(value)) return `${indent}${symbol} ${key}: {\n${printSimpleNode(value, prevLevel)}${indent}  }\n`;
  return `${indent}${symbol} ${key}: ${value}\n`;
};
const printSimpleNode = (obj, level) => {
  const newLevel = getLevel(level);
  const indent = getIndent(newLevel);
  return Object.entries(obj).flatMap(
    ([key, value]) => render({ key, value }, indent, newLevel, ' ', printSimpleNode),
  ).join('');
};
const renderChangedNode = ({ value1, value2, key }, indent, prevLevel) => {
  const list = ['-', '+'].flatMap((symbol) => {
    if (symbol === '-') return render({ value: value1, key }, indent, prevLevel, symbol, printSimpleNode);
    return render({ value: value2, key }, indent, prevLevel, symbol, printSimpleNode);
  }).join('');
  return list;
};
const mapping = {
  nested: ({ key, children }, indent, prevLevel, printResult) => `${indent}  ${key}: {\n${printResult(children, prevLevel)}${indent}  }\n`,
  unchanged: (node, indent, prevLevel) => render(node, indent, prevLevel, ' ', printSimpleNode),
  deleted: (node, indent, prevLevel) => render(node, indent, prevLevel, '-', printSimpleNode),
  added: (node, indent, prevLevel) => render(node, indent, prevLevel, '+', printSimpleNode),
  changed: (node, indent, prevLevel) => renderChangedNode(node, indent, prevLevel),
};

const printResult = (childs, level) => {
  const newLevel = getLevel(level);
  return childs.flatMap((node) => {
    const indent = getIndent(newLevel);
    return mapping[node.type](node, indent, newLevel, printResult);
  }).join('');
};
export default (diff) => `{\n${printResult(diff)}}`;
