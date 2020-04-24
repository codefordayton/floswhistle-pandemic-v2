import moment from "moment";

// reformats date data for POST request after ReportFormPage form submission
export const getDate = (date) => moment(`${date}`, "MM/DD/YYYY").unix();

// gets dates and supplies Date options for reported_date Select in ReportFormPage
export let today = moment().format("MM/DD/YYYY");
export let yesterday = moment().subtract(1, "day").format("MM/DD/YYYY");
export let twodaysago = moment().subtract(2, "day").format("MM/DD/YYYY");
