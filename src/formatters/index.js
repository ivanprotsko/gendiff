import stylishFormatter from "./stylish.js";
import plainFormatter from "./plain.js";

const printResult = (innerTree, formatStyle) => {
  switch (formatStyle) {
    case 'stylish':
      return stylishFormatter(innerTree);
      break;
    case 'plain':
      return plainFormatter(innerTree);
      break;
    default:
      console.log('Result Format undefined.');
  }
};
export default printResult;
