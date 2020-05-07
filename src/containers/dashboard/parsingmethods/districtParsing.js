export const districtTotals = (filteredReportData, currentDistrict) => {
  const filteredDistricts = filteredReportData.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  );
  const totals = filteredDistricts
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
  const shortagesTableData = filteredDistricts
    .map(({ shortages }) => shortages)
    .reduce((acc, n) => {
      for (var prop in n) {
        if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
        else acc[prop] = n[prop];
      }
      return acc;
    }, {});
  const testingTableData = filteredDistricts
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
