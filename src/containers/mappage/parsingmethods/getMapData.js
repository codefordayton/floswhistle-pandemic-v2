export const getMapData = (filteredReportData) => {
  const mapData = Object.values(
    filteredReportData.reduce(
      (newObj, { district, reported_date, shortages, ...rest }) => {
        if (!newObj[district]) {
          newObj[district] = { ...rest, district };
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
  return mapData;
};
