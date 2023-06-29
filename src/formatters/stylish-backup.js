// import _ from 'lodash';
//
// const getLevel = (level) => {
//   if (_.isUndefined(level)) return 0;
//   return level + 1;
// };
// const getIndent = (newLevel) => {
//   const initialIndent = '  ';
//   const regularIndent = '    ';
//   if (newLevel === 0) return '  ';
//   return _.repeat(regularIndent, newLevel) + initialIndent;
// };
// const printSimpleFlatList = (obj, level, counter = 0) => {
//   const newLevel = getLevel(level);
//   const indent = getIndent(newLevel);
//   const objEntries = Object.entries(obj);
//   const result = objEntries.flatMap(([key, value]) => {
//     if (value !== null && typeof value === 'object') return `${indent}  ${key}: {\n${printSimpleFlatList(value, newLevel, counter)}${indent}  }\n`;
//     else return `${indent}  ${key}: ${value}\n`;
//   })
//
//   return result.join('');
// };
//
// const mapping = {
//   nested: ({ children, key }, prevLevel, indent, printResult) => `${indent}  ${key}: {\n${printResult(children, prevLevel)}${indent}  }\n`,
//   added: {
//     obj: ({ value, key }, prevLevel, indent) => `${indent}+ ${key}: {\n${printSimpleFlatList(value, prevLevel)}${indent}  }\n`,
//     nonObj: ({ value, key }, indent) => `${indent}+ ${key}: ${value}\n`,
//   },
//   deleted: {
//     obj: ({ value, key }, prevLevel, indent) => `${indent}- ${key}: {\n${printSimpleFlatList(value, prevLevel)}${indent}  }\n`,
//     nonObj: ({ value, key }, indent) => `${indent}- ${key}: ${value}\n`,
//   },
//   changed: {
//     added: {
//       obj: ({ value2, key }, prevLevel, indent) => `${indent}+ ${key}: {\n${printSimpleFlatList(value2, prevLevel)}${indent}  }\n`,
//       nonObj: ({ value2, key }, indent) => `${indent}+ ${key}: ${value2}\n`,
//     },
//     deleted: {
//       obj: ({ value1, key }, prevLevel, indent) => `${indent}- ${key}: {\n${printSimpleFlatList(value1, prevLevel)}${indent}  }\n`,
//       nonObj: ({ value1, key }, indent) => `${indent}- ${key}: ${value1}\n`,
//     },
//   },
//   unchanged: {
//     nonObj: ({ value, key }, indent) => `${indent}  ${key}: ${value}\n`,
//   },
// };
//
// const printResult = (childs, level) => {
//   const list = [];
//   const newLevel = getLevel(level);
//   childs.flatMap((node) => {
//     const indent = getIndent(newLevel);
//     const {
//       value, value1, value2, type,
//     } = node;
//
//     if (type === 'nested') list.push(mapping[type](node, newLevel, indent, printResult));
//
//     if (type === 'added' && value !== null && typeof value === 'object') list.push(mapping[type].obj(node, newLevel, indent));
//     else if (type === 'added') list.push(mapping[type].nonObj(node, indent));
//
//     if (type === 'changed') {
//       if (value1 !== null && typeof value1 === 'object') list.push(mapping[type].deleted.obj(node, newLevel, indent));
//       else if (type === 'changed') list.push(mapping[type].deleted.nonObj(node, indent));
//
//       if (value2 !== null && typeof value2 === 'object') list.push(mapping[type].added.obj(node, newLevel, indent));
//       else if (type === 'changed') list.push(mapping[type].added.nonObj(node, indent));
//     }
//
//     if (type === 'deleted' && value !== null && typeof value === 'object') list.push(mapping[type].obj(node, newLevel, indent));
//     else if (type === 'deleted') list.push(mapping[type].nonObj(node, indent));
//
//     if (type === 'unchanged') list.push(mapping[type].nonObj(node, indent));
//     return list;
//   });
//   return list.join('');
// };
// export default (diff) => `{\n${printResult(diff)}}`;
