import moment from "moment";
// filters all formattedReportData by all dates before or the same as the requested report date
export const filterByDateRange = (formattedReportData, requestedReport) => {
  const { reportedDate } = requestedReport;
  const result = formattedReportData.filter((report) =>
    moment(report.reported_date).isSameOrBefore(reportedDate, "day")
  );
  return result;
};
