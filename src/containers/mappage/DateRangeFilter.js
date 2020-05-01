import React, { Component } from "react";
import { formatDateData } from "../../assets/utils/dates";
import "./DateFilter.css";

class DateRangeFilter extends Component {
  handleSetRequestedReport(e) {
    this.props.setRequestedReport(e);
  }
  render() {
    const { requestedReport, dateObjects } = this.props;
    return (
      <div className="DateFilter_Container">
        <div className="DateFilter_Label">DATE FILTER</div>
        <div className="DateRange_Container">
          <div className="DateRange_Start">
            <span className="color-light-gray DateRange_Label">Start Date</span>
            <span className="color-dark-blue DateRange_Date">
              {formatDateData(dateObjects[0].reportedDate)}
            </span>
          </div>

          <div className="DateSlider_Container">
            <input
              type="range"
              min={0}
              max={dateObjects.length - 1}
              defaultValue={dateObjects.length - 1}
              onClick={(e) => this.handleSetRequestedReport(e)}
            />
          </div>
          <div className="DateRange_End">
            <span className="color-light-gray DateRange_Label">
              Selected Date
            </span>
            <span className="color-dark-blue DateRange_Date">
              {formatDateData(requestedReport.reportedDate)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default DateRangeFilter;
