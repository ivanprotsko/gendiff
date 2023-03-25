import genDiff from "./src/gendiff.js";
import {Command} from "commander";
import metaData from "./package.json" assert {type: 'json'};

const program = new Command();

program
    .name('gendiff')
    .description('  Compares two configuration files and shows a difference.\n')
    .version(metaData.version);
program
    .option('-f, --format <type>', 'output format')
program.parse();

export default genDiff;
// for (const [key, value] of Object.entries(objectOne)) {
//     if (Object.hasOwn(objectTwo, key) && objectOne[key] === objectTwo[key]) {
//         resultRows.push(`  ${key}: ${value} \n`);
//     } else if (Object.hasOwn(objectTwo, key) && objectOne[key] !== objectTwo[key]) {
//         resultRows.push(`- ${key}: ${value} \n`);
//         resultRows.push(`+ ${key}: ${objectTwo[key]} \n`);
//     } else {
//         resultRows.push(`- ${key}: ${value} \n`);
//     }
// }
// for (const [key, value] of Object.entries(objectTwo)) {
//     if (!Object.hasOwn(objectOne, key)) {
//         resultRows.push(`+ ${key}: ${value} \n`);
//     }
// }