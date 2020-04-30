export const shortagesTotal = (filteredReportData) => {
  const filteredReports = filteredReportData.map(({ shortages }) =>
    Object.values(shortages)
  );
  const shortagesFromFiltered = filteredReports.map(
    (valuesArr) => valuesArr.filter(Boolean).length
  );
  return shortagesFromFiltered.reduce((a, b) => a + b, 0);
};

export const nonShortagesTotal = (filteredReportData) => {
  const filteredReports = filteredReportData.map(({ shortages }) =>
    Object.values(shortages)
  );
  const nonShortagesFromFiltered = filteredReports.map(
    (valuesArr) => valuesArr.filter((val) => val === false).length
  );
  return nonShortagesFromFiltered.reduce((a, b) => a + b, 0);
};

export const shortagesOnDate = (filteredReports, requestedReport) => {
  const findReportsWithDate = filteredReports
    .filter((report) => report.reported_date === requestedReport.reportedDate)
    .map(({ shortages }) => Object.values(shortages));
  const shortagesOnDate = findReportsWithDate.map(
    (valuesArr) => valuesArr.filter(Boolean).length
  );
  return shortagesOnDate;
};

export const nonShortagesOnDate = (filteredReports, requestedReport) => {
  const findReportsWithDate = filteredReports
    .filter((report) => report.reported_date === requestedReport.reportedDate)
    .map(({ shortages }) => Object.values(shortages));
  const nonShortagesFromFiltered = findReportsWithDate.map(
    (valuesArr) => valuesArr.filter((val) => val === false).length
  );
  return nonShortagesFromFiltered.reduce((a, b) => a + b, 0);
};

// Really long, weird, ugly way to create an object with all the individual boolean value totals of each resource.
// Not needed anymore unless we get deep into individual data points and likely can be refactored a lot

// export const reduceShortages = (data) => {
//   const mapShortages = data.map(({ shortages }) => shortages);

//   const faceShields = mapShortages.map(({ face_shields }) => face_shields);
//   const faceShieldsTrue = faceShields.filter(Boolean).length;
//   const faceShieldsFalse = faceShields.length - faceShieldsTrue;

//   const icuBeds = mapShortages.map(({ icu_beds }) => icu_beds);
//   const icuBedsTrue = icuBeds.filter(Boolean).length;
//   const icuBedsFalse = icuBeds.length - icuBedsTrue;

//   const icuNurses = mapShortages.map(
//     ({ icu_trained_nurses }) => icu_trained_nurses
//   );
//   const icuNursesTrue = icuNurses.filter(Boolean).length;
//   const icuNursesFalse = icuNurses.length - icuNursesTrue;

//   const gowns = mapShortages.map(({ isolation_gowns }) => isolation_gowns);
//   const gownsTrue = gowns.filter(Boolean).length;
//   const gownsFalse = gowns.length - gownsTrue;

//   const n95masks = mapShortages.map(({ n95_masks }) => n95_masks);
//   const n95masksTrue = n95masks.filter(Boolean).length;
//   const n95masksFalse = n95masks.length - n95masksTrue;

//   const narcotics = mapShortages.map(
//     ({ narcotic_analgesics }) => narcotic_analgesics
//   );
//   const narcoticsTrue = narcotics.filter(Boolean).length;
//   const narcoticsFalse = narcotics.length - narcoticsTrue;

//   const gloves = mapShortages.map(
//     ({ non_sterile_gloves }) => non_sterile_gloves
//   );
//   const glovesTrue = gloves.filter(Boolean).length;
//   const glovesFalse = gloves.length - glovesTrue;

//   const oxygen = mapShortages.map(({ oxygen }) => oxygen);
//   const oxygenTrue = oxygen.filter(Boolean).length;
//   const oxygenFalse = oxygen.length - oxygenTrue;

//   const paper = mapShortages.map(({ papr_hoods }) => papr_hoods);
//   const paperTrue = paper.filter(Boolean).length;
//   const paperFalse = paper.length - paperTrue;

//   const paralytics = mapShortages.map(({ paralytics }) => paralytics);
//   const paralyticsTrue = paralytics.filter(Boolean).length;
//   const paralyticsFalse = paralytics.length - paralyticsTrue;

//   const sedatives = mapShortages.map(({ sedatives }) => sedatives);
//   const sedativesTrue = sedatives.filter(Boolean).length;
//   const sedativesFalse = sedatives.length - sedativesTrue;

//   const surgicalMasks = mapShortages.map(
//     ({ surgical_masks }) => surgical_masks
//   );
//   const surgicalMasksTrue = surgicalMasks.filter(Boolean).length;
//   const surgicalMasksFalse = surgicalMasks.length - surgicalMasksTrue;

//   const ventilators = mapShortages.map(({ ventilators }) => ventilators);
//   const ventilatorsTrue = ventilators.filter(Boolean).length;
//   const ventilatorsFalse = ventilators.length - ventilatorsTrue;

//   return {
//     icu_beds: {
//       noShortage: icuBedsFalse,
//       withShortage: icuBedsTrue,
//     },
//     face_shields: {
//       noShortage: faceShieldsFalse,
//       withShortage: faceShieldsTrue,
//     },
//     icu_trained_nurses: {
//       noShortage: icuNursesFalse,
//       withShortage: icuNursesTrue,
//     },
//     isolation_gowns: {
//       noShortage: gownsFalse,
//       withShortage: gownsTrue,
//     },
//     n95_masks: {
//       noShortage: n95masksFalse,
//       withShortage: n95masksTrue,
//     },
//     narcotic_analgesics: {
//       noShortage: narcoticsFalse,
//       withShortage: narcoticsTrue,
//     },
//     non_sterile_gloves: {
//       noShortage: glovesFalse,
//       withShortage: glovesTrue,
//     },
//     oxygen: {
//       noShortage: oxygenFalse,
//       withShortage: oxygenTrue,
//     },
//     papr_hoods: {
//       noShortage: paperFalse,
//       withShortage: paperTrue,
//     },
//     paralytics: {
//       noShortage: paralyticsFalse,
//       withShortage: paralyticsTrue,
//     },
//     sedatives: {
//       noShortage: sedativesFalse,
//       withShortage: sedativesTrue,
//     },
//     surgical_masks: {
//       noShortage: surgicalMasksFalse,
//       withShortage: surgicalMasksTrue,
//     },
//     ventilators: {
//       noShortage: ventilatorsFalse,
//       withShortage: ventilatorsTrue,
//     },
//   };
// };
//
// Were used to parse the object returned from method above for shortage totals
//
// export const calculateWithShortagesTotal = (shortagesData) => {
//   const shortages = Object.entries(shortagesData);
//   return shortages
//     .map((item) => item[1].withShortage)
//     .reduce((a, b) => a + b, 0);
// };

// export const calculateNoShortagesTotal = (shortagesData) => {
//   const noShortages = Object.entries(shortagesData);
//   return noShortages
//     .map((item) => item[1].noShortage)
//     .reduce((a, b) => a + b, 0);
// };
