import _ from "lodash";
import getLevelUniqueProps from '../utils/get-unique-props.js';

const buildTree = (objects, level = 0, parent = 'root') => {
  level += 1;
  return getLevelUniqueProps(objects).map((key) => {
    let nestedObjects = [];
    let r = { level, keyName: key ? key : '', valueType: {},
              value: {}, doesExist: {}, childs: [] };
    for (let i = 0; i < objects.length; i++) {
      r.parent = parent;
      r.doesExist[`o${i}`] = (objects[i][key] !== undefined);
      r.valueType[`o${i}`] = _.isNull(objects[i][key]) ? null : typeof objects[i][key];
      r.value[`o${i}`] = objects[i][key];

      if (!_.isNull(objects[i][key]) && typeof objects[i][key] === 'object') {
        nestedObjects.push(objects[i][key]);
      }
    }
    r.childs.push(buildTree(nestedObjects,level,key));

    return r;
  });
}
// demo
// const objA = {
//   follow: "follow",
//   common: {
//     setting1: "Value 1",
//     setting3: {
//       common2: {
//         setting1: "Value 4",
//         setting3: "Value 5"
//       }
//     }
//   }
// };
// const objB = {
//   follow: "follow",
//   common: {
//     setting1: "Value 2"
//   }
// }
//
// console.log(buildTree([objA, objB], ));
// console.log(JSON.stringify(buildTree([objA, objB]), null, 2));
export default buildTree;
