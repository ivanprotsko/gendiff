const getFileFormat = (filePath) => {
  const [, fileFormat] = filePath.split('.');

  return fileFormat;
};

export default getFileFormat;
