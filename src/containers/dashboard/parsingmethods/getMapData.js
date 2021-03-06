// takes filtered report data and creates the data objects needed to populate the SVG map
export const getMapData = (filteredReportData) => {
  const mapData = Object.values(
    filteredReportData.reduce(
      (
        newObj,
        { district, reported_date, shortages, test_data, rep, ...rest }
      ) => {
        if (!newObj[district]) {
          newObj[district] = { ...rest, district, rep };
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
  return mapData.map(({ citedShortage, citedNoTesting, reports, ...rest }) => {
    return {
      shortagesRate: ((citedShortage * 100) / reports).toFixed(2),
      noTestingRate: ((citedNoTesting * 100) / reports).toFixed(2),
      ...rest,
    };
  });
};
