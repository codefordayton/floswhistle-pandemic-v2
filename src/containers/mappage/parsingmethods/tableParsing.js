import moment from "moment";

export const districtShortagesTableDataToDate = (
  tableObjectsArr,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = tableObjectsArr.filter(
    (tableObj) => tableObj.district === currentDistrict.district
  );
  const districtArrDateRange = currentDistrictArr.filter((tableObj) =>
    moment(tableObj.reported_date).isSameOrBefore(
      requestedReport.reportedDate,
      "day"
    )
  );
  // then needs to map or reduce all entries in the DistrictArrDateRange into one
  // object with totals of key values to use for table. Doesn't need a reported_date since it spans
  // multiple dates
  const tableData = districtArrDateRange
    .map(({ shortages }) => shortages)
    .reduce((acc, n) => {
      for (var prop in n) {
        if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
        else acc[prop] = n[prop];
      }
      return acc;
    }, {});
  console.log(tableData);
};
// finds reports for a district on the selected date and reduces them all to one report object for table
// reported on selected date
export const districtShortagesTableData = (
  tableObjectsArr,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = tableObjectsArr.filter(
    (tableObj) => tableObj.district === currentDistrict.district
  );
  const selectedDateDistrictArr = currentDistrictArr.filter(
    (tableObj) => tableObj.reported_date === requestedReport.reportedDate
  );
  const test = Object.values(
    selectedDateDistrictArr.reduce(
      (newObj, { district, reported_date, shortages, ...rest }) => {
        if (!newObj[district]) {
          newObj[district] = { ...rest, district, reported_date };
          return newObj;
        }
        Object.entries(rest).forEach(([key, val]) => {
          newObj[district][key] += val;
        });
        return newObj;
      },
      {}
    )
  );
  const reducedShortages = selectedDateDistrictArr
    .map(({ shortages }) => shortages)
    .reduce((acc, n) => {
      for (var prop in n) {
        if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
        else acc[prop] = n[prop];
      }
      return acc;
    }, {});
  const tableData =
    selectedDateDistrictArr.length > 0
      ? {
          ...test[0],
          reducedShortages,
        }
      : {};
  console.log(tableData);
};
