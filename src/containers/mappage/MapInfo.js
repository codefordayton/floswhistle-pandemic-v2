import React, { Component } from "react";
import "./MapInfo.css";
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
import { filteredByDistrict } from "./parsingmethods/filteredByDistrict";

class MapInfo extends Component {
  render() {
    const {
      cumulativeReports,
      requestedReport,
      dateObjects,
      allReportsFilteredByRequested,
    } = this.props;
    filteredByDistrict(allReportsFilteredByRequested);
    return (
      <div className="MapInfo_Container">
        <div className="MapInfo_Section">
          <span className="color-light-gray">Date Range</span>
          <br />
          <span>
            {formatDateData(dateObjects[0].reportedDate)} -{" "}
            {formatDateData(requestedReport.reportedDate)}
          </span>
        </div>
        <div className="MapInfo_Section">
          <span className="color-light-gray">Geography</span>
          <br />
          <span className="color-dark-blue medium-text">*OH-3</span>
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
            {shortagesOnDate(allReportsFilteredByRequested, requestedReport)}
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
            {nonShortagesOnDate(allReportsFilteredByRequested, requestedReport)}
          </span>
        </div>

        <div className="MapInfo_Section">
          <span className="color-light-gray">Unavailable Testing Reported</span>
          <br />
          <span className="color-dark-blue larger-text">
            {calculateUnavailableTestingTotal(allReportsFilteredByRequested)}
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
        <div className="MapInfo_Section">
          <span className="color-light-gray">Geography Data</span>
          <br />
          <span className="color-dark-blue">Population</span>
          <br />
          <span className="color-dark-blue medium-text">*757,872</span>
          <br />
          <span className="color-light-gray">Representative</span>
          <br />
          <span className="color-dark-blue medium-text">Joyce Beatty</span>
          <br />
          <span className="color-light-gray">Zip Codes</span>
          <br />
          <span className="color-dark-blue medium-text">
            *43004, 43028, 43054, 43068, 43081, 43085
          </span>
        </div>
      </div>
    );
  }
}

export default MapInfo;
