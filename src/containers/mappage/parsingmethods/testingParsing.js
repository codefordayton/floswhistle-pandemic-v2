export const calculateUnavailableTestingTotal = (filteredReportData) => {
  const filteredReports = filteredReportData.map(({ test_data }) => test_data);
  return filteredReports.map(({ test_tried }) => test_tried).filter(Boolean)
    .length;
};

export const calculateUnavailableTestingOnDate = (
  filteredReports,
  requestedReport
) => {
  const findReportsWithDate = filteredReports
    .filter((report) => report.reported_date === requestedReport.reportedDate)
    .map(({ test_data }) => test_data);
  return findReportsWithDate.map(({ test_tried }) => test_tried).filter(Boolean)
    .length;
};

// Really long, weird, ugly way to create an object with all the individual boolean value totals of test_data.
// Not needed anymore unless we get deep into individual data points and likely can be refactored a lot

// export const reduceTesting = (data) => {
//   const mapTesting = data.map(({ test_data }) => test_data);

//   const soughtTesting = mapTesting.map(({ test_none }) => test_none);
//   const soughtTestingNo = soughtTesting.filter(Boolean).length;
//   const soughtTestingYes = soughtTesting.length - soughtTestingNo;

//   const triedTesting = mapTesting.map(({ test_tried }) => test_tried);
//   const couldntGetTested = triedTesting.filter(Boolean).length;
//   const gotTested = triedTesting.length - couldntGetTested;

//   const testedWaiting = mapTesting.map(({ test_no_result }) => test_no_result);
//   const waitingForResults = testedWaiting.filter(Boolean).length;
//   const receivedResults = testedWaiting.length - waitingForResults;

//   const testResults = mapTesting.map(({ test_results }) => test_results);

//   const testSwab = testResults.map(({ test_swab_neg }) => test_swab_neg);
//   const testSwabPos = testSwab.filter(Boolean).length;
//   const testSwabNeg = receivedResults - testSwabPos;

//   const testAnti = testResults.map(({ test_anti_neg }) => test_anti_neg);
//   const testAntiPos = testAnti.filter(Boolean).length;
//   const testAntiNeg = receivedResults - testAntiPos;

//   return {
//     soughtTesting: {
//       yes: soughtTestingYes,
//       no: soughtTestingNo,
//     },
//     triedToGetTested: {
//       couldntGetTested,
//       gotTested,
//     },
//     testedResultsStatus: {
//       waitingForResults,
//       receivedResults,
//     },
//     testResults: {
//       swabTest: {
//         numberOfTests: testSwab.length,
//         posResults: testSwabPos,
//         negResults: testSwabNeg,
//       },
//       antibodyTest: {
//         numberOfTests: testAnti.length,
//         posResults: testAntiPos,
//         negResults: testAntiNeg,
//       },
//     },
//   };
// };

// export const calculateUnavailableTesting = (allTesting) => {
//   const { }
// .map(
//   ({ triedToGetTested }) => triedToGetTested
// );
// return tried
//   .map(({ withShortage }) => withShortage)
//   .reduce((a, b) => a + b, 0);
// };
