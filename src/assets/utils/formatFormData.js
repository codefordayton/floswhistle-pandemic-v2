import { getDate } from "./dates";

// reformats data shape for POST request after form submission
export const formatBody = ({ reported_date, ...rest }) => ({
  ...rest,
  reported_date: getDate(reported_date),
});

export const formatData = (data) => {
  const { testStatus, resultsSwab, resultsAnti } = data;
  const testData = {
    test_none: false,
    test_tried: false,
    test_no_result: false,
    test_swab_neg: false,
    test_swab_pos: false,
    test_anti_neg: false,
    test_anti_pos: false,
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
  delete newTestData["resultsSwab"];
  delete newTestData["resultsAnti"];
  return newTestData;
};
