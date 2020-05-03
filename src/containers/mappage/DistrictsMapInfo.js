import React, { Component } from "react";
import "./MapInfov2.css";
import { formatDateData } from "../../assets/utils/dates";
import {
  districtTotalReports,
  currentDistrictShortagesToDate,
  currentDateDistrictShortages,
  currentDateDistrictNonShortages,
  currentDateDistrictTesting,
  currentDistrictNonShortagesToDate,
  currentDistricTestingToDate,
} from "./parsingmethods/districtParsing";

class DistrictsMapInfo extends Component {
  render() {
    const {
      requestedReport,
      firstReportDate,
      currentDistrict,
      filteredReportsByDateRange,
    } = this.props;
    return (
      <div>
        {currentDistrict ? (
          <div>
            <div className="MapInfo_Section">
              <span className="color-light-gray">Date Range</span>
              <br />
              <span className="color-dark-blue small-text">
                {formatDateData(firstReportDate)} -{" "}
                {formatDateData(requestedReport.reportedDate)}
              </span>
            </div>
            <div className="MapInfo_Section">
              <span className="color-light-gray">Geography</span>
              <br />
              <span className="color-dark-blue medium-text">
                {currentDistrict.district}
              </span>
            </div>
            <div className="MapInfo_Section">
              <span className="color-light-gray">Total Reports</span>
              <br />
              <span className="color-dark-blue larger-text">
                {districtTotalReports(
                  filteredReportsByDateRange,
                  currentDistrict
                )}
              </span>
            </div>

            <div className="MapInfo_Section">
              <span className="color-light-gray">Shortages Reported</span>
              <br />
              <span className="color-dark-blue larger-text">
                {currentDistrictShortagesToDate(
                  filteredReportsByDateRange,
                  currentDistrict,
                  requestedReport
                )}
              </span>
              <br />
              <span className="color-light-gray">
                Reported on {formatDateData(requestedReport.reportedDate)}
              </span>
              <br />
              <span className="color-dark-blue medium-text">
                {currentDateDistrictShortages(
                  filteredReportsByDateRange,
                  currentDistrict,
                  requestedReport
                )}
              </span>
            </div>

            <div className="MapInfo_Section">
              <span className="color-light-gray">Non-Shortages Reported</span>
              <br />
              <span className="color-dark-blue larger-text">
                {currentDistrictNonShortagesToDate(
                  filteredReportsByDateRange,
                  currentDistrict,
                  requestedReport
                )}
              </span>
              <br />
              <span className="color-light-gray">
                Reported on {formatDateData(requestedReport.reportedDate)}
              </span>
              <br />
              <span className="color-dark-blue medium-text">
                {currentDateDistrictNonShortages(
                  filteredReportsByDateRange,
                  currentDistrict,
                  requestedReport
                )}
              </span>
            </div>

            <div className="MapInfo_Section">
              <span className="color-light-gray">
                Unavailable Testing Reported
              </span>
              <br />
              <span className="color-dark-blue larger-text">
                {currentDistricTestingToDate(
                  filteredReportsByDateRange,
                  currentDistrict,
                  requestedReport
                )}
              </span>
              <br />
              <span className="color-light-gray">
                Reported on {formatDateData(requestedReport.reportedDate)}
              </span>
              <br />
              <span className="color-dark-blue medium-text">
                {currentDateDistrictTesting(
                  filteredReportsByDateRange,
                  currentDistrict,
                  requestedReport
                )}
              </span>
            </div>
          </div>
        ) : (
          <div className="MapInfo_Section">
            <span className="color-light-gray">
              Click a district on the map...
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default DistrictsMapInfo;
