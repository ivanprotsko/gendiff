import getData from "./get-data.js";
const getObjects = (pathOne, pathTwo) => {
  const objectOne = getData(pathOne);
  const objectTwo = getData(pathTwo);
  return [objectOne, objectTwo];
};

export default getObjects;
