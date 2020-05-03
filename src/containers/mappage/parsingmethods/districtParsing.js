import moment from "moment";
// ***Same notes in MapInfo.js***
// There is ALOT happening here. Some of it may not be necessary and is tied to the map component not rerendering, thus not
// updating the prop values as the date range is adjusted with how it is set up currently. This is also the reason why
// the heat mapping of the map currently doesn't change via the slider.
// These are methods for dynamically calculating the values that should be displayed if the map rerendered and used updated prop values
// but that also presents the problem of whether it is good or not to rerender the map constantly

export const formattedDistrictsArray = (filteredReportData) => {
  const filteredData = filteredReportData.map(
    ({ facility, shortages, test_data, reported_date }) => {
      return {
        ...facility,
        shortages,
        test_data,
        reported_date,
      };
    }
  );
  const formatedDistrictObjects = filteredData.map(
    ({ district, district_state, shortages, test_data, reported_date }) => {
      const shortagesValuesArr = Object.values(shortages);
      const shortagesReported = shortagesValuesArr.filter(Boolean).length;
      const nonShortagesReported =
        shortagesValuesArr.length - shortagesReported;

      const testTried = test_data.test_tried;
      let count = 0;
      if (testTried === true) {
        count = count + 1;
      }

      const reformatDistrict = `${district}`;

      return {
        district: `${district_state}-${reformatDistrict.replace(
          /\b(\d)\b/g,
          "0$1"
        )}`,
        shortagesReported,
        nonShortagesReported,
        resourceReports: shortagesValuesArr.length,
        testingUnavailable: count,
        testingReports: 1,
        reported_date,
      };
    }
  );
  return formatedDistrictObjects;
};

export const reducedDistrictObjects = (districtObjectArr) => {
  const mapData = Object.values(
    districtObjectArr.reduce((newObj, { district, ...rest }) => {
      if (!newObj[district]) {
        newObj[district] = { ...rest, district };
        return newObj;
      }

      Object.entries(rest).forEach(([key, val]) => {
        newObj[district][key] += val;
      });

      return newObj;
    }, {})
  );
  return mapData;
};

export const filterDistrictsTotalReports = (
  districtObjectArr,
  currentDistrict
) => {
  return districtObjectArr.filter(
    (districtObj) => districtObj.district === currentDistrict.district
  ).length;
};

export const findCurrentDistrictShortagesToDate = (
  districtObjectArr,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = districtObjectArr.filter(
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

export const findCurrentDistrictNonShortagesToDate = (
  districtObjectArr,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = districtObjectArr.filter(
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

export const findCurrentDistricTestingToDate = (
  districtObjectArr,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = districtObjectArr.filter(
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

export const findCurrentDateDistrictShortages = (
  districtObjectArr,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = districtObjectArr.filter(
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

export const findCurrentDateDistrictNonShortages = (
  districtObjectArr,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = districtObjectArr.filter(
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

export const findCurrentDateDistrictTesting = (
  districtObjectArr,
  currentDistrict,
  requestedReport
) => {
  const currentDistrictArr = districtObjectArr.filter(
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
