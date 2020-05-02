// these values are based off of every single "category" that can be a shortages/
// e.g. each true or false value for each item like surgical masks, ventilators, adequate staffings, etc...
// counts as a report of a shortage or nonshortage

export const filteredByDistrict = (filteredReportData) => {
  const filteredDistricts = filteredReportData.map(
    ({ facility, shortages, test_data, reported_date }) => {
      return {
        ...facility,
        shortages,
        test_data,
        reported_date,
      };
    }
  );
  const formatedDistrictObjects = filteredDistricts.map(
    ({ district, district_state, shortages, test_data, reported_date }) => {
      const shortagesValuesArr = Object.values(shortages);
      const shortagesReported = shortagesValuesArr.filter(Boolean).length;

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
        resourceReports: shortagesValuesArr.length,
        testingUnavailable: count,
        testingReports: 1,
        reported_date,
      };
    }
  );
  console.log(formatedDistrictObjects);
  const reducedDistrictObjects = Object.values(
    formatedDistrictObjects.reduce((newObj, { district, ...rest }) => {
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
  return reducedDistrictObjects;
};
