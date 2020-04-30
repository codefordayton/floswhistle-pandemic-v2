import moment from "moment";
// filters all raw report data by all dates before or the same as the requested report date
export const filterByRequested = (reportData, requestedReport) => {
  const { reportedDate } = requestedReport;
  const result = reportData.filter((report) =>
    moment(report.reported_date).isSameOrBefore(reportedDate, "day")
  );
  return result;
};
