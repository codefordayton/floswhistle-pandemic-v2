import React, { Component } from "react";
import "./MapInfov2.css";
import { formatDateData } from "../../assets/utils/dates";
import {
  shortagesTotal,
  shortagesOnDate,
  nonShortagesTotal,
  nonShortagesOnDate,
} from "./parsingmethods/shortageParsing";
import {
  calculateUnavailableTestingTotal,
  calculateUnavailableTestingOnDate,
} from "./parsingmethods/testingParsing";
import {
  filterDistrictsTotalReports,
  findCurrentDateDistrictShortages,
  findCurrentDateDistrictNonShortages,
  findCurrentDateDistrictTesting,
  findCurrentDistrictShortagesToDate,
  findCurrentDistrictNonShortagesToDate,
  findCurrentDistricTestingToDate,
} from "./parsingmethods/districtParsing";

// ***Same notes in parsingmethods/districtParsing.js***
// There is ALOT happening here. Some of it may not be necessary and is tied to the map component not rerendering, thus not
// updating the prop values as the date range is adjusted with how it is set up currently. This is also the reason why
// the heat mapping of the map currently doesn't change via the slider.
// These are methods for dynamically calculating the values that should be displayed if the map rerendered and used updated prop values
// but that also presents the problem of whether it is good or not to rerender the map constantly

// **MapInfo specific notes***
// Currently the content of MapInfo_Container is based on whether or not the user is hovering over a district
// It renders back and forth between Total/National data and district data currently

class MapInfov2 extends Component {
  render() {
    const {
      cumulativeReports,
      requestedReport,
      dateObjects,
      districtObjectArr,
      allReportsFilteredByRequested,
      currentDistrict,
    } = this.props;
    return (
      <div className="MapInfo_Container">
        {currentDistrict ? (
          <div>
            <div className="MapInfo_Section">
              <span className="color-light-gray">Date Range</span>
              <br />
              <span className="color-dark-blue small-text">
                {formatDateData(dateObjects[0].reportedDate)} -{" "}
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
                {filterDistrictsTotalReports(
                  districtObjectArr,
                  currentDistrict
                )}
              </span>
            </div>

            <div className="MapInfo_Section">
              <span className="color-light-gray">Shortages Reported</span>
              <br />
              <span className="color-dark-blue larger-text">
                {findCurrentDistrictShortagesToDate(
                  districtObjectArr,
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
                {findCurrentDateDistrictShortages(
                  districtObjectArr,
                  currentDistrict,
                  requestedReport
                )}
              </span>
            </div>

            <div className="MapInfo_Section">
              <span className="color-light-gray">Non-Shortages Reported</span>
              <br />
              <span className="color-dark-blue larger-text">
                {findCurrentDistrictNonShortagesToDate(
                  districtObjectArr,
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
                {findCurrentDateDistrictNonShortages(
                  districtObjectArr,
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
                {findCurrentDistricTestingToDate(
                  districtObjectArr,
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
                {findCurrentDateDistrictTesting(
                  districtObjectArr,
                  currentDistrict,
                  requestedReport
                )}
              </span>
            </div>
            <div className="MapInfo_Section">
              <span className="color-light-gray">Geography Data</span>
              <br />
              <span className="color-dark-blue">Population</span>
              <br />
              <span className="color-dark-blue medium-text">*757,872</span>
              <br />
              <span className="color-light-gray">Representative</span>
              <br />
              <span className="color-dark-blue medium-text">*Joyce Beatty</span>
              <br />
              <span className="color-light-gray">Zip Codes</span>
              <br />
              <span className="color-dark-blue medium-text">
                *43004, 43028, 43054, 43068, 43081, 43085
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="MapInfo_Section">
              <span className="color-light-gray">Date Range</span>
              <br />
              <span className="color-dark-blue small-text">
                {formatDateData(dateObjects[0].reportedDate)} -{" "}
                {formatDateData(requestedReport.reportedDate)}
              </span>
            </div>
            <div className="MapInfo_Section">
              <span className="color-light-gray">Geography</span>
              <br />
              <span className="color-dark-blue medium-text">All Distrcts</span>
            </div>
            <div className="MapInfo_Section">
              <span className="color-light-gray">Total Reports</span>
              <br />
              <span className="color-dark-blue larger-text">
                {cumulativeReports}
              </span>
            </div>

            <div className="MapInfo_Section">
              <span className="color-light-gray">Shortages Reported</span>
              <br />
              <span className="color-dark-blue larger-text">
                {shortagesTotal(allReportsFilteredByRequested)}
              </span>
              <br />
              <span className="color-light-gray">
                Reported on {formatDateData(requestedReport.reportedDate)}
              </span>
              <br />
              <span className="color-dark-blue medium-text">
                {shortagesOnDate(
                  allReportsFilteredByRequested,
                  requestedReport
                )}
              </span>
            </div>

            <div className="MapInfo_Section">
              <span className="color-light-gray">Non-Shortages Reported</span>
              <br />
              <span className="color-dark-blue larger-text">
                {nonShortagesTotal(allReportsFilteredByRequested)}
              </span>
              <br />
              <span className="color-light-gray">
                Reported on {formatDateData(requestedReport.reportedDate)}
              </span>
              <br />
              <span className="color-dark-blue medium-text">
                {nonShortagesOnDate(
                  allReportsFilteredByRequested,
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
                {calculateUnavailableTestingTotal(
                  allReportsFilteredByRequested
                )}
              </span>
              <br />
              <span className="color-light-gray">
                Reported on {formatDateData(requestedReport.reportedDate)}
              </span>
              <br />
              <span className="color-dark-blue medium-text">
                {calculateUnavailableTestingOnDate(
                  allReportsFilteredByRequested,
                  requestedReport
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MapInfov2;
