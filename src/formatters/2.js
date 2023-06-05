// Get all unique props
// Compare ObjectA & ObjectB with AllUniquePropsObject






import _ from "lodash";
import getAllUniquePropsList from '../utils/get-unique-props.js';
const getLevelParams = (level) => {
  let newLevel = level; newLevel += 1;
  const indent = _.repeat('....', newLevel);
  return { newLevel, indent };
};
const plainFormatter = (tree, formatStyle) => {
  let result = '';
  const list = [];

  const [objectOne, objectTwo] = tree;
  const props = getAllUniquePropsList(tree);

  props.map((key) => {
    console.log(key);
    // 1. If prop is exists at ObjectA and ObjectB:
    if (_.has(objectOne, key) &&  _.has(objectTwo, key)) {
      // 1.1. objAPropVal !== object && objBPropVal !== object
      // console.log('Case: 1');
      // console.log(key);
      if (objectOne[key] === null
        || objectTwo[key] === null
        || (typeof objectOne[key] !== 'object'
          && typeof objectTwo[key] !== 'object')) {
            // console.log('Case: 1.1');
            // console.log(key);
      }
    }
    // → → → → ${propName} was updated. From '${ObjectAPropValue}' to value: '${ObjBPropVal}'

    // 1.2. If objAPropVal === object && objBPropVal === object
    // → → → → ${propName} was updated. From [complex value] to value: [complex value]

    // 1.3. If objAPropVal === object && objBPropVal !== object
    // → → → → ${propName} was updated. From [complex value] to value: '${ObjBPropVal}'

    // 1.4. If objAPropVal !== object && objBPropVal === object
    // → → → → ${propName} was updated. From '${ObjBPropVal}' to value: [complex value]


    // 2. If prop isn't exists at ObjectA:
    // 2.1. If objBPropVal !== object
    // → → → → ${propName} was added with value: '${objBPropVal}'

    // 2.2. If objBPropVal === object
    // → → → → ${propName} was added with value: [complex value]

    // 3. If prop isn't exists at ObjectB:
    // → → → → ${propName} was removed
    return list;
  });

  result = list.join('');
  console.log(result);
  return result;
}
export default plainFormatter;
