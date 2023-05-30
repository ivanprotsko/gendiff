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
  
