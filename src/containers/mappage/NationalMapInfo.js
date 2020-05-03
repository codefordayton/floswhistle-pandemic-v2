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
          <div className="color-light-gray">Date Range</div>

          <div className="color-dark-blue small-text">
            {formatDateData(firstReportDate)} -{" "}
            {formatDateData(requestedReport.reportedDate)}
          </div>
        </div>
        <div className="MapInfo_Section">
          <div className="color-light-gray">Geography</div>

          <div className="color-dark-blue medium-text">All Distrcts</div>
        </div>
        <div className="MapInfo_Section">
          <div className="color-light-gray">Total Reports</div>

          <div className="color-dark-blue larger-text">{cumulativeReports}</div>
        </div>

        <div className="MapInfo_Section">
          <div className="color-light-gray">Shortages Reported</div>

          <div className="color-dark-blue larger-text">
            {allTotals.shortages}
          </div>

          <div className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </div>

          <div className="color-dark-blue medium-text">
            {onDateTotals.shortages}
          </div>
        </div>

        <div className="MapInfo_Section">
          <div className="color-light-gray">Non-Shortages Reported</div>

          <div className="color-dark-blue larger-text">
            {allTotals.nonShortages}
          </div>

          <div className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </div>

          <div className="color-dark-blue medium-text">
            {onDateTotals.nonShortages}
          </div>
        </div>

        <div className="MapInfo_Section">
          <div className="color-light-gray">Unavailable Testing Reported</div>

          <div className="color-dark-blue larger-text">
            {allTotals.unavailableTesting}
          </div>

          <div className="color-light-gray">
            Reported on {formatDateData(requestedReport.reportedDate)}
          </div>

          <div className="color-dark-blue medium-text">
            {onDateTotals.unavailableTesting}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NationMapInfo;
