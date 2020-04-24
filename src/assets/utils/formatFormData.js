import { getDate } from "./dates";

// reformats data shape for POST request after form submission
export const formatBody = ({ reported_date, ...rest }) => ({
  ...rest,
  reported_date: getDate(reported_date),
});

// ** Will be refactored. Need to figure out how to do more complex conditional validation for ungrouped data in form state **
// really, really, REALLY ugly way to incorporate a complex validation schema in ReportFormPage form
// for "My current status re COVID lab tests"
// Checkboxes push value "1", "2", or "3" to arrays in form state.
// Validation is based on array lengths determined by which checkboxes are selected.
// When data is submitted, this function checks the arrays for which values are present
// adds the corresponding data objects based on array values
// combines form data and new data objects
// then removes the arrays from the over all object shape
export const formatData = (data) => {
  const { tests, results_swab, results_anti } = data;
  let test1 = {};
  let test2 = {};
  let test3 = {};
  if (tests.includes("1")) {
    test1 = { test_none: true, test_tried: false, test_no_result: false };
  } else if (tests.includes("2")) {
    test1 = { test_none: false, test_tried: true, test_no_result: false };
  } else if (tests.includes("3")) {
    test1 = { test_none: false, test_tried: false, test_no_result: true };
  } else {
    test1 = { test_none: false, test_tried: false, test_no_result: false };
  }
  if (results_swab.includes("1")) {
    test2 = { test_swab_neg: true, test_swab_pos: false };
  } else if (results_swab.includes("2")) {
    test2 = { test_swab_neg: false, test_swab_pos: true };
  } else {
    test2 = { test_swab_neg: false, test_swab_pos: false };
  }
  if (results_anti.includes("1")) {
    test3 = { test_anti_neg: true, test_anti_pos: false };
  } else if (results_anti.includes("2")) {
    test3 = { test_anti_neg: false, test_anti_pos: true };
  } else {
    test3 = { test_anti_neg: false, test_anti_pos: false };
  }
  const newData = {
    ...data,
    ...test1,
    ...test2,
    ...test3,
  };
  delete newData["tests"];
  delete newData["results_swab"];
  delete newData["results_anti"];
  return newData;
};
