import _ from "lodash";

const getLevelUniqueProps = (objects) => {
  const allProps = [];
  for (const obj of objects) {
    allProps.push(Object.keys(obj));
  }
  const props = allProps.flat();
  return _.uniqBy(props, JSON.stringify).sort();
};
export default getLevelUniqueProps;
