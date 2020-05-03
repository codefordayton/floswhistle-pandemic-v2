import moment from "moment";
// currently unused methods that will populate table data

// takes report data filtered by date ranges and reduces values for table usage
export const districtShortagesTableDataToDate = (
  filteredReportData,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = filteredReportData.filter(
    (tableObj) => tableObj.district === currentDistrict.district
  );
  const districtArrDateRange = currentDistrictArr.filter((tableObj) =>
    moment(tableObj.reported_date).isSameOrBefore(
      requestedReport.reportedDate,
      "day"
    )
  );
  const tableData = districtArrDateRange
    .map(({ shortages }) => shortages)
    .reduce((acc, n) => {
      for (var prop in n) {
        if (acc.hasOwnProperty(prop)) acc[prop] += n[prop];
        else acc[prop] = n[prop];
      }
      return acc;
    }, {});
  return tableData;
};
// finds reports for a district on the selected date and reduces them all to one report object for table usage
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

{
  /* <div>
            <div>Face Shields: {tableData.face_shields}</div>
            <div>ICU Beds: {tableData.icu_beds}</div>
            <div>Adequate Staffing: {tableData.icu_trained_nurses}</div>
            <div>Isolation Gowns: {tableData.isolation_gowns}</div>
            <div>n95 Masks: {tableData.n95_masks}</div>
            <div>Narcotic Analgesics: {tableData.narcotic_analgesics}</div>
            <div>Non Sterile Gloves: {tableData.non_sterile_gloves}</div>
            <div>Oxygen: {tableData.oxygen}</div>
            <div>Papr Hoods: {tableData.papr_hoods}</div>
            <div>Paralytics: {tableData.paralytics}</div>
            <div>Sedatives: {tableData.sedatives}</div>
            <div>Surgical Masks: {tableData.surgical_masks}</div>
            <div>Ventilators: {tableData.ventilators}</div>
          </div> */
}
