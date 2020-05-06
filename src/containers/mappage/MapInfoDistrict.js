import React, { Component } from "react";
import "./MapInfo.css";
import { formatDateData } from "../../assets/utils/dates";
import { districtTotals } from "./parsingmethods/districtParsing";

class DistrictsMapInfo extends Component {
  render() {
    const {
      requestedReport,
      firstReportDate,
      currentDistrict,
      filteredReportsByDateRange,
      categoryDisplay,
    } = this.props;
    const allTotals = currentDistrict
      ? districtTotals(filteredReportsByDateRange, currentDistrict)
      : null;
    return (
      <div>
        {categoryDisplay === 0 && currentDistrict ? (
          <React.Fragment>
            <div className="MapInfo_Section">
              <div className="color-dark-blue larger-text">District</div>
              <div className="color-dark-blue medium-text">
                {currentDistrict.district}
              </div>
              <div className="color-light-gray">Date Range</div>
              <div className="color-dark-blue small-text">
                {formatDateData(firstReportDate)} -{" "}
                {formatDateData(requestedReport.reportedDate)}
              </div>
            </div>

            <div className="MapInfo_Section">
              <div className="color-light-gray">Total Reports</div>

              <div className="color-dark-blue larger-text">
                {allTotals.reports}
              </div>
            </div>

            <div className="MapInfo_Section">
              <div className="color-light-gray">Shortages Reported</div>

              <div className="color-dark-blue larger-text">
                {allTotals.citedShortage}
              </div>
            </div>

            <div className="MapInfo_Section">
              <div className="color-dark-blue medium-text">Shortage Types</div>
              <div>
                <div>
                  Face Shields: {allTotals.shortagesTableData.face_shields}
                </div>
                <div>ICU Beds: {allTotals.shortagesTableData.icu_beds}</div>
                <div>
                  Adequate Staffing:{" "}
                  {allTotals.shortagesTableData.icu_trained_nurses}
                </div>
                <div>
                  Isolation Gowns:{" "}
                  {allTotals.shortagesTableData.isolation_gowns}
                </div>
                <div>n95 Masks: {allTotals.shortagesTableData.n95_masks}</div>
                <div>
                  Narcotic Analgesics:{" "}
                  {allTotals.shortagesTableData.narcotic_analgesics}
                </div>
                <div>
                  Non Sterile Gloves:{" "}
                  {allTotals.shortagesTableData.non_sterile_gloves}
                </div>
                <div>Oxygen: {allTotals.shortagesTableData.oxygen}</div>
                <div>Papr Hoods: {allTotals.shortagesTableData.papr_hoods}</div>
                <div>Paralytics: {allTotals.shortagesTableData.paralytics}</div>
                <div>Sedatives: {allTotals.shortagesTableData.sedatives}</div>
                <div>
                  Surgical Masks: {allTotals.shortagesTableData.surgical_masks}
                </div>
                <div>
                  Ventilators: {allTotals.shortagesTableData.ventilators}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : categoryDisplay === 1 && currentDistrict ? (
          <React.Fragment>
            <div className="MapInfo_Section">
              <div className="color-dark-blue larger-text">District</div>
              <div className="color-dark-blue medium-text">
                {currentDistrict.district}
              </div>
              <div className="color-light-gray">Date Range</div>
              <div className="color-dark-blue small-text">
                {formatDateData(firstReportDate)} -{" "}
                {formatDateData(requestedReport.reportedDate)}
              </div>
            </div>
            <div className="MapInfo_Section">
              <div className="color-light-gray">Total Reports</div>

              <div className="color-dark-blue larger-text">
                {allTotals.reports}
              </div>
            </div>

            <div className="MapInfo_Section">
              <div className="color-light-gray">Reports citing not tested</div>

              <div className="color-dark-blue larger-text">
                {allTotals.citedNoTesting}
              </div>
            </div>

            <div className="MapInfo_Section">
              <div className="color-dark-blue medium-text">Testing Status</div>
              <div>
                <div>Haven't sought: {allTotals.testingTableData.testNone}</div>
                <div>
                  Testing unavailable: {allTotals.testingTableData.testTried}
                </div>
                <div>
                  Tested - result pending:{" "}
                  {allTotals.testingTableData.testNoResult}
                </div>
                <div>
                  Tested - has result: {allTotals.testingTableData.testResults}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="MapInfo_Section">
            <div className="color-dark-blue larger-text">District</div>
            <div className="color-light-gray">Select a district</div>
          </div>
        )}
      </div>
    );
  }
}

export default DistrictsMapInfo;
