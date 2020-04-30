import { getDate } from "./dates";

// reformats data shape for POST request after form submission
export const formatBody = ({ reported_date, ...rest }) => ({
  ...rest,
  reported_date: getDate(reported_date),
});

export const formatData = (data) => {
  const { testStatus, testResults } = data;
  const { resultsSwab, resultsAnti } = testResults;
  const testData = {
    test_none: null,
    test_tried: null,
    test_no_result: null,
    test_swab_neg: null,
    test_swab_pos: null,
    test_anti_neg: null,
    test_anti_pos: null,
  };
  const newKeyVal = Object.entries(testData)
    .filter(
      ([key]) =>
        key === testStatus || key === resultsSwab || key === resultsAnti
    )
    .reduce((accum, [key]) => {
      accum[key] = true;
      return accum;
    }, {});

  const newTestData = {
    ...data,
    ...testData,
    ...newKeyVal,
  };
  delete newTestData["testStatus"];
  delete newTestData["testResults"];

  return newTestData;
};
