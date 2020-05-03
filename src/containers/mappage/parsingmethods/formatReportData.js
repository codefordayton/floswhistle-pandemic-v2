import { sortDataByDate } from "../../../assets/utils/dates";

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
      const shortageReports = Object.entries(shortages).reduce(
        (acc, [k, v]) => {
          acc[k] = Number(v);
          return acc;
        },
        {}
      );

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
        shortages: shortageReports,
        shortagesReported,
        nonShortagesReported,
        resourceReports: shortagesValuesArr.length,
        testingUnavailable: count,
        testingReports: 1,
        reported_date,
      };
    }
  );
  return formattedTableObjects;
};
