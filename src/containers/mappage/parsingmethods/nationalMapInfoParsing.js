// totals of all time
export const totalsOfAllTime = (filteredReportData) => {
  const totals = filteredReportData.map(
    ({ shortagesReported, nonShortagesReported, testingUnavailable }) => {
      return {
        shortages: shortagesReported,
        nonShortages: nonShortagesReported,
        unavailableTesting: testingUnavailable,
      };
    }
  );
  const newTotals = totals.reduce((acc, n) => {
    for (var prop in n) {
      if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
      else acc[prop] = n[prop];
    }
    return acc;
  }, {});
  return newTotals;
};

// totals on selected date
export const totalsOnSelectedDate = (filteredReports, requestedReport) => {
  const totals = filteredReports
    .filter((report) => report.reported_date === requestedReport.reportedDate)
    .map(({ shortagesReported, nonShortagesReported, testingUnavailable }) => {
      return {
        shortages: shortagesReported,
        nonShortages: nonShortagesReported,
        unavailableTesting: testingUnavailable,
      };
    });
  const newTotals = totals.reduce((acc, n) => {
    for (var prop in n) {
      if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
      else acc[prop] = n[prop];
    }
    return acc;
  }, {});
  return newTotals;
};
