// Get all unique props
// Compare ObjectA & ObjectB with AllUniquePropsObject

// 1. If prop isn't exists at ObjectB:
// → → → → ${propName} was removed

// 2. If prop isn't exists at ObjectA:
// 2.1. If objBPropVal !== object
// → → → → ${propName} was added with value: '${objBPropVal}'

// 2.2. If objBPropVal === object
// → → → → ${propName} was added with value: [complex value]


  // 3. If prop is exists at ObjectA and ObjectB:
// 3.1. objAPropVal !== object && objBPropVal !== object
// → → → → ${propName} was updated. From '${ObjectAPropValue}' to value: '${ObjBPropVal}'

// 3.2. If objAPropVal === object && objBPropVal === object
// → → → → ${propName} was updated. From [complex value] to value: [complex value]

// 3.3. If objAPropVal === object && objBPropVal !== object
// → → → → ${propName} was updated. From [complex value] to value: '${ObjBPropVal}'

// 3.4. If objAPropVal !== object && objBPropVal === object
// → → → → ${propName} was updated. From '${ObjBPropVal}' to value: [complex value]
