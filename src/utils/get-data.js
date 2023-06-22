import getFileFormat from "./get-file-format.js";
import readFile from "./read-file.js";
import yaml from "js-yaml";

const getData = (file) => {
  const fileFormat = getFileFormat(file);
  let data;

  switch (fileFormat) {
    case 'json':
      data = JSON.parse(readFile(file));
      break;
    case 'yaml':
      data = yaml.load(readFile(file));
      break;
    default:
      console.log('File format undefined');
  }
  return data;
};

export default getData;
