#!/usr/bin/env node
import genDiff from '../src/gendiff.js';
import { filePathOne, filePathTwo, formatStyle } from './string-util.js';

const diff = genDiff(filePathOne, filePathTwo, formatStyle);
console.log(diff);
