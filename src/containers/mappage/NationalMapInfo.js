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

class NationMapInfo extends Component {
  render() {
    const {
      cumulativeReports,
      requestedReport,
      dateObjects,
      allReportsFilteredByRequested,
    } = this.props;
    return (
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
      </div>
    );
  }
}

export default NationMapInfo;
