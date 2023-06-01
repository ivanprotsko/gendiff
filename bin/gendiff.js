#!/usr/bin/env node
import genDiff from '../src/gendiff.js';
import {filePathOne, filePathTwo, formatStyle} from './string-util.js';



genDiff(filePathOne, filePathTwo, formatStyle);
