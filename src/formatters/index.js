import printStylishFormat from './stylish.js';
import printJSONformat from './json.js';
import printPlainFormat from './plain.js';

const formatters = {
  stylish: printStylishFormat,
  plain: printPlainFormat,
  json: printJSONformat,
  undefined: 'какой-то код console.log с уведомлением, что передан неизвестный формат?'
};
export default (diff, formatStyle = 'stylish') => {
  console.log(formatters);
  return formatters[formatStyle](diff);
};
