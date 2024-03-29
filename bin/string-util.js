import { readFileSync } from 'fs';
import { Command } from 'commander';

const metaData = JSON.parse(readFileSync('./package.json'));
const program = new Command();

program
  .name('gendiff')
  .description('  Compares two configuration files and shows a difference.\n')
  .version(metaData.version);
program
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<pathOne>', 'First file path')
  .argument('<pathTwo>', 'Second file path');
program.parse();

export const [filePathOne, filePathTwo] = program.args;
export const formatStyle = program.opts().format;
