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

// ***Same notes in parsingmethods/districtParsing.js***
// There is ALOT happening here that may not be necessary and is tied to the map component not rerendering, thus not
// updating the prop values as the date range is adjusted with how it is set up currently. This is also the reason why
// the heat mapping of the map currently doesn't change via the slider.
// These are methods for dynamically calculating the values that should be displayed if the map rerendered and used updated prop values
// but that also presents the problem of whether it is good or not to rerender the map constantly

class DistrictsMapInfo extends Component {
  render() {
    const {
      requestedReport,
      firstReportDate,
      currentDistrict,
      filteredReportsByDateRange,
    } = this.props;
    return (
      <React.Fragment>
        <div className="MapInfo_Section">
          <div className="color-light-gray">Date Range</div>

          <div className="color-dark-blue small-text">
            {formatDateData(firstReportDate)} -{" "}
            {formatDateData(requestedReport.reportedDate)}
          </div>
        </div>
        <div className="MapInfo_Section">
          <div className="color-light-gray">Geography</div>

          <div className="color-dark-blue medium-text">
            {currentDistrict.district}
          </div>
        </div>
        <div className="MapInfo_Section">
          <div className="color-light-gray">Total Reports</div>

          <div className="color-dark-blue larger-text">
            {districtTotalReports(filteredReportsByDateRange, currentDistrict)}
          </div>
        </div>

        <div className="MapInfo_Section">
          <div className="color-light-gray">Shortages Reported</div>

          <div className="color-dark-blue larger-text">
            {currentDistrictShortagesToDate(
              filteredReportsByDateRange,
              currentDistrict,
              requestedReport
            )}
          </div>

          <div className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </div>

          <div className="color-dark-blue medium-text">
            {currentDateDistrictShortages(
              filteredReportsByDateRange,
              currentDistrict,
              requestedReport
            )}
          </div>
        </div>

        <div className="MapInfo_Section">
          <div className="color-light-gray">Non-Shortages Reported</div>

          <div className="color-dark-blue larger-text">
            {currentDistrictNonShortagesToDate(
              filteredReportsByDateRange,
              currentDistrict,
              requestedReport
            )}
          </div>

          <div className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </div>

          <div className="color-dark-blue medium-text">
            {currentDateDistrictNonShortages(
              filteredReportsByDateRange,
              currentDistrict,
              requestedReport
            )}
          </div>
        </div>

        <div className="MapInfo_Section">
          <div className="color-light-gray">Unavailable Testing Reported</div>

          <div className="color-dark-blue larger-text">
            {currentDistricTestingToDate(
              filteredReportsByDateRange,
              currentDistrict,
              requestedReport
            )}
          </div>

          <div className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </div>

          <div className="color-dark-blue medium-text">
            {currentDateDistrictTesting(
              filteredReportsByDateRange,
              currentDistrict,
              requestedReport
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DistrictsMapInfo;
