import _ from "lodash";
import getLevelUniqueProps from '../utils/get-unique-props.js';
const getLevelParams = (level) => {
  let newLevel = level; newLevel += 1;
  const indent = _.repeat('    ', newLevel);
  return { newLevel, indent };
};
const stylishFormatter = (objects, level = 0) => {

  let r = '{\n';
  objects.map((obj) => {
    const { newLevel, indent} = getLevelParams(level);

    const A = obj.value[0], B = obj.value[1];
    console.log(obj);
    if (A === B) {
      r += `${indent}  ${obj.keyName}: ${A}\n`;
    }
    // const compareAndPrint = (objects) => {
    //   console.log
    //   // Тут я планировал сделать функцию, которая бы перебирала
    //   // сравниваемые объекты и подсатвляла +, пробел или -,
    //   // а также соответствующие значения, чтобы не дублировать код
    //   // цель избавиться от бесконечных деревьев из условий if
    //    for (let i = 0; i < objects.length; i++) {
    //      if (A !== B) {
    //        const obj = objects[i];
    //        (function(obj) {
    //          console.log(objects[i]);
    //
    //        })();
    //      }
    //    }
    // }
    // compareAndPrint([A, B]);
    // if (A !== B) {
    //   if ((A !== undefined || A === null) && typeof A !== 'object') {
    //     r += `${indent}- ${obj.keyName}: ${A}\n`;
    //   }
    //   if ((B !== undefined || B === null) && typeof B !== 'object') {
    //     r += `${indent}+ ${obj.keyName}: ${B}\n`;
    //   }
    // }

      // console.log(obj.value[i]);

  });
  // for (let i = 0; i < objects.length; i++) {
  //
  // // objects[i].doesExist
  // // 1. If the key is existing
  // // 1.1. Compare the keys values
  // // objects[i].doesExist ===, !==
  //
  //     console.log(objects[i].doesExist);
  //
  // }
  return r += '}';
}
export default stylishFormatter;
