import React, { Component } from "react";
import "./MapInfov2.css";
import { formatDateData } from "../../assets/utils/dates";
import {
  totalsOfAllTime,
  totalsOnSelectedDate,
} from "./parsingmethods/nationalMapInfoParsing";

class NationMapInfo extends Component {
  render() {
    const {
      requestedReport,
      firstReportDate,
      filteredReportsByDateRange,
    } = this.props;
    const allTotals = totalsOfAllTime(filteredReportsByDateRange);
    const onDateTotals = totalsOnSelectedDate(
      filteredReportsByDateRange,
      requestedReport
    );
    const cumulativeReports = filteredReportsByDateRange.length;
    return (
      <React.Fragment>
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
            {allTotals.shortages}
          </span>
          <br />
          <span className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </span>
          <br />
          <span className="color-dark-blue medium-text">
            {onDateTotals.shortages}
          </span>
        </div>

        <div className="MapInfo_Section">
          <span className="color-light-gray">Non-Shortages Reported</span>
          <br />
          <span className="color-dark-blue larger-text">
            {allTotals.nonShortages}
          </span>
          <br />
          <span className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </span>
          <br />
          <span className="color-dark-blue medium-text">
            {onDateTotals.nonShortages}
          </span>
        </div>

        <div className="MapInfo_Section">
          <span className="color-light-gray">Unavailable Testing Reported</span>
          <br />
          <span className="color-dark-blue larger-text">
            {allTotals.unavailableTesting}
          </span>
          <br />
          <span className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </span>
          <br />
          <span className="color-dark-blue medium-text">
            {onDateTotals.unavailableTesting}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default NationMapInfo;
