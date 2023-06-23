import printStylishFormat from "./stylish.js";
import printJSONformat from "./json.js";
import printPlainFormat from "./plain.js";

const formatters = {
  stylish: printStylishFormat,
  plain: printPlainFormat,
  json: printJSONformat,
}
export default (diff, formatStyle) => {
  return formatters[formatStyle](diff);
}
