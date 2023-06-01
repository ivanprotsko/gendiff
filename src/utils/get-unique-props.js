import _ from "lodash";

const getAllUniquePropsList = (tree) => {
  const allProps = [];
  for (const obj of tree) {
    allProps.push(Object.keys(obj));
  }
  const props = allProps.flat();
  return _.uniqBy(props, JSON.stringify).sort();
};
export default getAllUniquePropsList;
