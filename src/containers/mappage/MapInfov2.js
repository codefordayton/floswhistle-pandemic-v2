import React, { Component } from "react";
import "./MapInfov2.css";
import DistrictsMapInfo from "./DistrictsMapInfo";
import NationalMapInfo from "./NationalMapInfo";

class MapInfov2 extends Component {
  render() {
    const {
      requestedReport,
      dateObjects,
      filteredReportsByDateRange,
      currentDistrict,
    } = this.props;
    const firstReportDate = dateObjects[0].reportedDate;
    return (
      <div className="MapInfo_Container">
        {currentDistrict ? (
          <DistrictsMapInfo
            requestedReport={requestedReport}
            firstReportDate={firstReportDate}
            currentDistrict={currentDistrict}
            filteredReportsByDateRange={filteredReportsByDateRange}
          />
        ) : (
          <NationalMapInfo
            requestedReport={requestedReport}
            firstReportDate={firstReportDate}
            filteredReportsByDateRange={filteredReportsByDateRange}
          />
        )}
      </div>
    );
  }
}

export default MapInfov2;
