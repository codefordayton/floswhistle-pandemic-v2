import React, { Component } from "react";
import { formatDateData } from "../../assets/utils/dates";
import "./Tally.css";

class Tally extends Component {
  handleSetRequestedReport(e) {
    this.props.setRequestedReport(e);
  }
  displayTally() {
    const {
      requestedReport,
      cumulativeReports,
      numberOfReports,
      dateObjects,
    } = this.props;
    if (dateObjects) {
      return (
        <div>
          <div className="Tally_DateRange">
            <div className="DateRange_Start">
              {formatDateData(dateObjects[0].reportedDate)}
            </div>
            <div className="DateRange_End">
              {formatDateData(requestedReport.reportedDate)}
            </div>
          </div>
          <input
            className="Tally_DateSlider"
            type="range"
            min={0}
            max={dateObjects.length - 1}
            defaultValue={dateObjects.length - 1}
            onClick={(e) => this.handleSetRequestedReport(e)}
          />
          <div>Reports on Selected Date: {requestedReport.numberOfReports}</div>
          <div>
            Total Reports to Selected Date:{" "}
            {cumulativeReports === null ? numberOfReports : cumulativeReports}
          </div>
          <div>Total Reports: {numberOfReports}</div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
  render() {
    return <div className="Tally_Container">{this.displayTally()}</div>;
  }
}

export default Tally;
