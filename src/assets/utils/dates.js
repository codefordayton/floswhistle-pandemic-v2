import moment from "moment";

// reformats date data for POST request after ReportFormPage form submission
export const getDate = (date) => moment(`${date}`, "MM/DD/YYYY").unix();
// Need to fix this slightly still. Formatted dates are being set to 1 day behind
export const formatDateData = (date) =>
  moment(date).format("MM/DD/YYYY").replace(/\b0/g, "");

// gets dates and supplies Date options for reported_date Select in ReportFormPage
export let today = moment().format("MM/DD/YYYY");
export let yesterday = moment().subtract(1, "day").format("MM/DD/YYYY");
export let twodaysago = moment().subtract(2, "day").format("MM/DD/YYYY");

// sort data by date
export const sortDataByDate = (data) =>
  data.sort(function (left, right) {
    return moment(left.reported_date).diff(moment(right.reported_date));
  });
