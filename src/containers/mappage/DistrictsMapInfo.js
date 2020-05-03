import React, { Component } from "react";
import "./MapInfov2.css";
import { formatDateData } from "../../assets/utils/dates";
import {
  filterDistrictsTotalReports,
  findCurrentDateDistrictShortages,
  findCurrentDateDistrictNonShortages,
  findCurrentDateDistrictTesting,
  findCurrentDistrictShortagesToDate,
  findCurrentDistrictNonShortagesToDate,
  findCurrentDistricTestingToDate,
} from "./parsingmethods/districtParsing";

class DistrictsMapInfo extends Component {
  render() {
    const {
      requestedReport,
      dateObjects,
      districtObjectArr,
      currentDistrict,
    } = this.props;
    return (
      <div>
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
