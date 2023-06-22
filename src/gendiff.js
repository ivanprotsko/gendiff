import getObjects from './utils/get-objects.js';
import buildTree from "./utils/build-tree.js";
import printResult from "./formatters/index.js";

export default (pathOne, pathTwo, formatStyle) => {
  const [objA, objB] = getObjects(pathOne, pathTwo);
  const diff = buildTree(objA, objB);
  return printResult(diff, formatStyle);
};
