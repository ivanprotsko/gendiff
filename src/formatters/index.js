import printStylishFormat from "./stylish.js";
import printPlainFormat from "./plain.js";
import printJSONformat from "./json.js";

const printResult = (diff, formatStyle) => {
  switch (formatStyle) {
    case 'stylish':
      return printStylishFormat(diff);
      console.log('123');
      break;
    case 'plain':
      return printPlainFormat(diff);
      break;
    case 'json':
      return printJSONformat(diff);
      break;
    default:
      console.log('Result Format undefined.');
  }
};
export default printResult;
