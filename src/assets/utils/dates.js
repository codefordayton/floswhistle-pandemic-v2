import moment from "moment";

// reformats date data for POST request after ReportFormPage form submission
export const getDate = (date) => moment(`${date}`, "MM/DD/YYYY").unix();
// reformats date to Month/Day/Year with no leading zero on month e.g. 03/18/2020 becomes 3/18/2020
export const formatDateData = (date) =>
  moment.utc(date).format("MM/DD/YYYY").replace(/\b0/g, "");

// gets dates and supplies Date options for reported_date Select in ReportFormPage
export let today = moment().format("MM/DD/YYYY");
export let yesterday = moment().subtract(1, "day").format("MM/DD/YYYY");
export let twodaysago = moment().subtract(2, "day").format("MM/DD/YYYY");

// sort data by date
export const sortDataByDate = (data) =>
  data.sort(function (left, right) {
    return moment(left.reported_date).diff(moment(right.reported_date));
  });
