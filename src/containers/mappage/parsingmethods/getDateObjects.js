// takes all raw report data and finds all reports made on the same date
// then reduces those reports to one date object that has the date and number of reports made
// on that date
export const getDateObjects = (reportData) => {
  const frequency = reportData
    .map(({ reported_date }) => reported_date)
    .reduce((newObj, reported_date) => {
      const count = newObj[reported_date] || 0;
      newObj[reported_date] = count + 1;
      return newObj;
    }, {});
  const result = Object.entries(frequency).map(([key, val]) => {
    return { reportedDate: key, numberOfReports: val };
  });
  return result;
};
