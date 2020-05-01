// import { shortagesTotal, nonShortagesTotal } from "./shortageParsing";

// these values are based off of every single "category" that can be a shortages/
// e.g. each true or false value for each item like surgical masks, ventilators, adequate staffings, etc...
// counts as a report of a shortage or nonshortage

// currently only formats district objects. They are not reduced for multiple reports from the same state district
export const filteredByDistrict = (filteredReportData) => {
  const filteredDistricts = filteredReportData.map(
    ({ facility, shortages, test_data }) => {
      return {
        ...facility,
        shortages,
        test_data,
      };
    }
  );

  const formatedDistrictObjects = filteredDistricts.map(
    ({ district, district_state, shortages, test_data }) => {
      const shortagesValuesArr = Object.values(shortages);
      const shortagesReported = shortagesValuesArr.filter(Boolean).length;
      const shortagesRate = Math.floor(
        (shortagesReported * 100) / shortagesValuesArr.length
      );

      const testTried = test_data.test_tried;
      let count = 0;
      if (testTried === true) {
        count = count + 1;
      }
      console.log(count);

      const reformatDistrict = `${district}`;

      return {
        districtState: `${district_state}-${reformatDistrict.replace(
          /\b(\d)\b/g,
          "0$1"
        )}`,
        shortagesRate: `${shortagesRate}`,
        testingUnavailable: count,
      };
    }
  );
  console.log(formatedDistrictObjects);
};
