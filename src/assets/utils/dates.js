import moment from "moment";

// reformats date data for POST request after ReportFormPage form submission
export const getDate = (date) => moment(`${date}`, "MM/DD/YYYY").unix();
export const formatDateData = (date) =>
  moment(date).add(1, "day").format("MM/DD/YYYY");

// gets dates and supplies Date options for reported_date Select in ReportFormPage
export let today = moment().format("MM/DD/YYYY");
export let yesterday = moment().subtract(1, "day").format("MM/DD/YYYY");
export let twodaysago = moment().subtract(2, "day").format("MM/DD/YYYY");

// sort data by date
export const sortDataByDate = (data) =>
  data.sort(function (left, right) {
    return moment(left.reported_date).diff(moment(right.reported_date));
  });
