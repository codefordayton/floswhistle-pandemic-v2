import React, { Component } from "react";
import { formatDateData } from "../../assets/utils/dates";
import "./MapHead.css";

class MapHead extends Component {
  handleSetRequestedReport(e) {
    this.props.setRequestedReport(e);
  }
  render() {
    const {
      requestedReport,
      dateObjects,
      firstReportDate,
      categoryDisplay,
    } = this.props;
    return (
      <div className="MapHead_Container">
        <h2 className="MapHead_Header color-dark-blue larger-text">
          {categoryDisplay === 0 ? "Shortages" : "Testing"}
        </h2>
        <p className="color-light-gray small-text MapHead_Header_Description1">
          {categoryDisplay === 0
            ? "Percentage of reports citing shortage of any kind"
            : 'Percentage of reports indicating "not tested"'}
        </p>

        <h3 className=" MapHead_Header color-light-gray medium-text">
          Date Filter
        </h3>

        <div className="DateRange_Container">
          <div className="DateRange_Start">
            <span className="DateRange_Label color-light-gray">Start Date</span>
            <span className="DateRange_Date color-dark-blue">
              {formatDateData(firstReportDate)}
            </span>
          </div>

          <div className="DateSlider_Container">
            <input
              type="range"
              min={0}
              max={dateObjects.length - 1}
              defaultValue={dateObjects.length - 1}
              onChange={(e) => this.handleSetRequestedReport(e)}
            />
          </div>

          <div className="DateRange_End">
            <span className="DateRange_Label color-light-gray">
              Selected Date
            </span>
            <span className="DateRange_Date color-dark-blue">
              {formatDateData(requestedReport.reportedDate)}
            </span>
          </div>
        </div>

        {/* <div className="MapHead_Header_Row"> */}
        <h3 className="MapHead_Header color-light-gray medium-text">
          National Map and Congressional District Data
        </h3>
        {/* <p className="color-light-gray small-text MapHead_Header_Description2">
            {categoryDisplay === 0
              ? "Percentage of reports citing shortage of any kind"
              : 'Percentage of reports indicating "not tested"'}
          </p>
        </div> */}
      </div>
    );
  }
}

export default MapHead;
