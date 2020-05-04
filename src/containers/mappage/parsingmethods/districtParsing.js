import moment from "moment";
// ***Same notes in MapInfo.js***
// There is ALOT happening here that may not be necessary and is tied to the map component not rerendering, thus not
// updating the prop values as the date range is adjusted with how it is set up currently. This is also the reason why
// the heat mapping of the map currently doesn't change via the slider.
// These are methods for dynamically calculating the values that should be displayed if the map rerendered and used updated prop values
// but that also presents the problem of whether it is good or not to rerender the map constantly

export const districtTotalReports = (filteredReportData, currentDistrict) => {
  return filteredReportData.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  ).length;
};

export const currentDistrictShortagesToDate = (
  filteredReportData,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = filteredReportData.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  );
  const DistrictArrDateRange = currentDistrictArr.filter((districtObj) =>
    moment(districtObj.reported_date).isSameOrBefore(
      requestedReport.reportedDate,
      "day"
    )
  );
  if (DistrictArrDateRange.length === 0) {
    return "No Reports";
  } else {
    const shortages = DistrictArrDateRange.map(
      ({ shortagesReported }) => shortagesReported
    ).reduce((a, b) => a + b, 0);
    return shortages;
  }
};

export const currentDistrictNonShortagesToDate = (
  filteredReportData,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = filteredReportData.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  );
  const DistrictArrDateRange = currentDistrictArr.filter((districtObj) =>
    moment(districtObj.reported_date).isSameOrBefore(
      requestedReport.reportedDate,
      "day"
    )
  );
  if (DistrictArrDateRange.length === 0) {
    return "No Reports";
  } else {
    const nonShortages = DistrictArrDateRange.map(
      ({ nonShortagesReported }) => nonShortagesReported
    ).reduce((a, b) => a + b, 0);
    return nonShortages;
  }
};

export const currentDistricTestingToDate = (
  filteredReportData,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = filteredReportData.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  );
  const DistrictArrDateRange = currentDistrictArr.filter((districtObj) =>
    moment(districtObj.reported_date).isSameOrBefore(
      requestedReport.reportedDate,
      "day"
    )
  );
  if (DistrictArrDateRange.length === 0) {
    return "No Reports";
  } else {
    const testing = DistrictArrDateRange.map(
      ({ testingUnavailable }) => testingUnavailable
    ).reduce((a, b) => a + b, 0);
    return testing;
  }
};

export const currentDateDistrictShortages = (
  filteredReportData,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = filteredReportData.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  );
  const selectedDateDistrictArr = currentDistrictArr.filter(
    (districtObj) => districtObj.reported_date === requestedReport.reportedDate
  );
  if (selectedDateDistrictArr.length === 0) {
    return "No Reports";
  } else {
    const shortages = selectedDateDistrictArr
      .map(({ shortagesReported }) => shortagesReported)
      .reduce((a, b) => a + b, 0);
    return shortages;
  }
};

export const currentDateDistrictNonShortages = (
  filteredReportData,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = filteredReportData.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  );
  const selectedDateDistrictArr = currentDistrictArr.filter(
    (districtObj) => districtObj.reported_date === requestedReport.reportedDate
  );
  if (selectedDateDistrictArr.length === 0) {
    return "No Reports";
  } else {
    const shortages = selectedDateDistrictArr
      .map(({ nonShortagesReported }) => nonShortagesReported)
      .reduce((a, b) => a + b, 0);
    return shortages;
  }
};

export const currentDateDistrictTesting = (
  filteredReportData,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = filteredReportData.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  );
  const selectedDateDistrictArr = currentDistrictArr.filter(
    (districtObj) => districtObj.reported_date === requestedReport.reportedDate
  );
  if (selectedDateDistrictArr.length === 0) {
    return "No Reports";
  } else {
    const shortages = selectedDateDistrictArr
      .map(({ testingUnavailable }) => testingUnavailable)
      .reduce((a, b) => a + b, 0);
    return shortages;
  }
};
