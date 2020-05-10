import { sortDataByDate } from "../../../assets/utils/dates";
import { repData } from "../../../assets/reps";
// Takes raw response data and formats the reports to be used for all other components
export const formatReportData = (reportData) => {
  const sortedReportData = sortDataByDate(reportData);
  const filteredData = sortedReportData.map(
    ({ facility, shortages, test_data, reported_date }) => {
      return {
        ...facility,
        shortages,
        test_data,
        reported_date,
      };
    }
  );
  const formattedTableObjects = filteredData.map(
    ({ district, district_state, shortages, test_data, reported_date }) => {
      // turns boolean values of shortages into false = 0 and true = 1
      // for data integrity, needs to validate that all shortage values are boolean or
      // POST requests from need to use authorization headers validated on back end to make sure
      // data isn't submitted with incorrect types by sources
      const shortagesAsNumbers = Object.entries(shortages).reduce(
        (acc, [k, v]) => {
          acc[k] = Number(v);
          return acc;
        },
        {}
      );

      const shortagesValuesArr = Object.values(shortages).filter(Boolean)
        .length;
      const reportCitingShortage = shortagesValuesArr > 0 ? 1 : 0;
      // const shortagesReported = shortagesValuesArr.filter(Boolean).length;
      // const reportCitingNoShortage
      // const nonShortagesReported =
      //   shortagesValuesArr.length - shortagesReported;

      // creates binary value of the test_data values to determine not tested or tested
      const testNone = test_data.test_none;
      const testTried = test_data.test_tried;
      const testNoResult = test_data.test_no_result;
      const testResults = Object.values(test_data.test_results).filter(
        (val) => val === true
      ).length;
      let count = 0;
      if (testTried === true || testNone === true) {
        count = count + 1;
      }

      const reformatDistrict = `${district}`;
      const newDistrictFormat = `${district_state}-${reformatDistrict.replace(
        /\b(\d)\b/g,
        "0$1"
      )}`;

      const filteredRepData = repData.filter(
        (rep) => rep.st_dis === newDistrictFormat
      );

      return {
        district: newDistrictFormat,
        reported_date,
        shortages: shortagesAsNumbers,
        testData: {
          testNone: testNone === true ? 1 : 0,
          testTried: testTried === true ? 1 : 0,
          testNoResult: testNoResult === true ? 1 : 0,
          testResults: testResults !== 0 ? 1 : 0,
        },
        citedNoTesting: count,
        citedShortage: reportCitingShortage,
        reports: 1,
        rep: filteredRepData[0],
      };
    }
  );
  return formattedTableObjects;
};
