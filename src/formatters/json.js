const printJSONformat = (diff) => {
  const result = printResult(diff);
  return JSON.stringify(diff, null, 4);
}
export default printJSONformat;
