import React, { Component } from "react";
import { formatDateData } from "../../assets/utils/dates";
import "./Tally.css";

class Tally extends Component {
  handleSetRequestedReport(e) {
    this.props.setRequestedReport(e);
  }
  render() {
    const { requestedReport, dateObjects } = this.props;
    return (
      <div className="Tally_Container">
        <div className="DateFilter_Label">DATE FILTER</div>
        <div className="DateRange_Container">
          <div className="Tally_DateRange_Start">
            <span className="color-light-gray DateRange_Label">Start Date</span>
            <span className="color-dark-blue DateRange_Date">
              {formatDateData(dateObjects[0].reportedDate)}
            </span>
          </div>

          <div className="Tally_DateSlider_Container">
            <input
              className="Tally_DateSlider"
              type="range"
              min={0}
              max={dateObjects.length - 1}
              defaultValue={dateObjects.length - 1}
              onClick={(e) => this.handleSetRequestedReport(e)}
            />
          </div>
          <div className="Tally_DateRange_End">
            <span className="color-light-gray DateRange_Label">
              Selected Date
            </span>
            <span className="color-dark-blue DateRange_Date">
              {formatDateData(requestedReport.reportedDate)}
            </span>
          </div>
          {/* <div>Reports on Selected Date: {requestedReport.numberOfReports}</div>
          <div>
            Total Reports to Selected Date:{" "}
            {cumulativeReports === null ? numberOfReports : cumulativeReports}
          </div>
          <div>Total Reports: {numberOfReports}</div> */}
        </div>
      </div>
    );
  }
}

export default Tally;
