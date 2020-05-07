// totals of all time
export const nationalTotals = (filteredReportData) => {
  const totals = filteredReportData
    .map(({ citedShortage, citedNoTesting, reports }) => {
      return {
        citedShortage,
        citedNoTesting,
        reports,
      };
    })
    .reduce((acc, n) => {
      for (var prop in n) {
        if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
        else acc[prop] = n[prop];
      }
      return acc;
    }, {});
  const shortagesTableData = filteredReportData
    .map(({ shortages }) => shortages)
    .reduce((acc, n) => {
      for (var prop in n) {
        if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
        else acc[prop] = n[prop];
      }
      return acc;
    }, {});
  const testingTableData = filteredReportData
    .map(({ testData }) => testData)
    .reduce((acc, n) => {
      for (var prop in n) {
        if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
        else acc[prop] = n[prop];
      }
      return acc;
    }, {});
  const newTotals = {
    shortagesTableData,
    testingTableData,
    ...totals,
  };
  return newTotals;
};
