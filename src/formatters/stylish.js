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

const render = (node, prevLevel, symbol, renderRegular) => {
  const indent = getIndent(prevLevel);
  const { key, value } = node;
  if (_.isObject(value)) return `${indent}${symbol} ${key}: {\n${renderUnchanged(value, prevLevel)}${indent}  }\n`;
  return `${indent}${symbol} ${key}: ${value}\n`;
};
const renderUnchanged = (obj, level) => {
  const newLevel = getLevel(level);
  return Object.entries(obj).flatMap(
    ([key, value]) => render({ key, value }, newLevel, ' ', renderUnchanged),
  ).join('');
};
const renderChanged = ({ value1, value2, key }, prevLevel) => {
  const list = [
    render({ value: value1, key }, prevLevel, '-', renderUnchanged),
    render({ value: value2, key }, prevLevel, '+', renderUnchanged),
  ].join('');
  return list;
};
const renderNested = ({ key, children }, prevLevel, renderResult) => {
  const indent = getIndent(prevLevel);
  return `${indent}  ${key}: {\n${renderResult(children, prevLevel)}${indent}  }\n`;
};
const mapping = {
  nested: (node, prevLevel, renderResult) => renderNested(node, prevLevel, renderResult),
  unchanged: (node, prevLevel) => render(node, prevLevel, ' ', renderUnchanged),
  deleted: (node, prevLevel) => render(node, prevLevel, '-', renderUnchanged),
  added: (node, prevLevel) => render(node, prevLevel, '+', renderUnchanged),
  changed: (node, prevLevel) => renderChanged(node, prevLevel),
};

const renderResult = (childs, level) => {
  const newLevel = getLevel(level);
  return childs.flatMap((node) => mapping[node.type](node, newLevel, renderResult)).join('');
};
export default (diff) => `{\n${renderResult(diff)}}`;
