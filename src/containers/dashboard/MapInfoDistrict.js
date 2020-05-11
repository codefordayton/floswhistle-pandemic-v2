import React, { Component } from "react";
import { HashLink } from "react-router-hash-link";
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
      <div className="MapInfo_Container">
        {categoryDisplay === 0 && currentDistrict ? (
          <React.Fragment>
            <div className="MapInfo_Section">
              <h3 className="MapInfo_Header color-dark-blue larger-text">
                District {currentDistrict.district}
              </h3>

              <h4 className="MapInfo_Header color-light-gray">
                Representative
              </h4>
              {currentDistrict.rep !== undefined ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="MapInfo_RepUrl"
                  href={currentDistrict.rep.form_url}
                >
                  {currentDistrict.rep.name}
                </a>
              ) : (
                "Vacant"
              )}

              <h4 className="MapInfo_Header color-light-gray">Date Range</h4>
              <div className="color-dark-blue small-text">
                {formatDateData(firstReportDate)} -{" "}
                {formatDateData(requestedReport.reportedDate)}
              </div>
            </div>

            <div className="MapInfo_Section">
              <h4 className="MapInfo_Header color-light-gray">Total Reports</h4>

              <div className="color-dark-blue larger-text">
                {allTotals.reports ? allTotals.reports : "0"}
              </div>
            </div>

            <div className="MapInfo_Section">
              <h4 className="MapInfo_Header color-light-gray">
                Shortages Reported
              </h4>

              <div className="color-dark-blue larger-text">
                {allTotals.citedShortage}
              </div>
            </div>

            <div className="MapInfo_Section">
              <table>
                <thead>
                  <tr>
                    <th className="color-dark-blue medium-text">
                      Shortage Types
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(allTotals.shortagesTableData).map(
                    ([key, val]) => (
                      <tr key={key}>
                        <td>
                          {key === "icu_trained_nurses"
                            ? "Adequate Staffing"
                            : key
                                .replace(
                                  /\w\S*/g,
                                  (txt) =>
                                    txt.charAt(0).toUpperCase() +
                                    txt.substr(1).toLowerCase()
                                )
                                .replace(/_/g, " ")}
                        </td>
                        <td>{val}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ) : categoryDisplay === 1 && currentDistrict ? (
          <React.Fragment>
            <div className="MapInfo_Section">
              <h3 className="MapInfo_Header color-dark-blue larger-text">
                District {currentDistrict.district}
              </h3>

              <h4 className="MapInfo_Header color-light-gray">
                Representative
              </h4>
              {currentDistrict.rep !== undefined ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="MapInfo_RepUrl"
                  href={currentDistrict.rep.form_url}
                >
                  {currentDistrict.rep.name}
                </a>
              ) : (
                "Vacant"
              )}

              <h4 className="MapInfo_Header color-light-gray">Date Range</h4>
              <div className="color-dark-blue small-text">
                {formatDateData(firstReportDate)} -{" "}
                {formatDateData(requestedReport.reportedDate)}
              </div>
            </div>
            <div className="MapInfo_Section">
              <h4 className="MapInfo_Header color-light-gray">Total Reports</h4>

              <div className="color-dark-blue larger-text">
                {allTotals.reports ? allTotals.reports : "0"}
              </div>
            </div>

            <div className="MapInfo_Section">
              <h4 className="MapInfo_Header color-light-gray">
                Reports citing not tested
              </h4>

              <div className="color-dark-blue larger-text">
                {allTotals.citedNoTesting}
              </div>
            </div>

            <div className="MapInfo_Section">
              <table>
                <thead>
                  <tr>
                    <th className="color-dark-blue medium-text">
                      Testing Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Haven't sought</td>
                    <td>{allTotals.testingTableData.testNone}</td>
                  </tr>
                  <tr>
                    <td>Testing unavailable</td>
                    <td>{allTotals.testingTableData.testTried}</td>
                  </tr>
                  <tr>
                    <td>Tested - result pending</td>
                    <td>{allTotals.testingTableData.testNoResult}</td>
                  </tr>
                  <tr>
                    <td>Tested - has result</td>
                    <td>{allTotals.testingTableData.testResults}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ) : (
          <div className="MapInfo_Section">
            <h3 className="MapInfo_Header color-dark-blue larger-text">
              District
            </h3>
            <div className="color-light-gray">
              <HashLink to="#Select_District_Hash">
                Select a Congressional District on the map
              </HashLink>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DistrictsMapInfo;
