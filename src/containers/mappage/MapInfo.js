import React, { Component } from "react";
import "./MapInfo.css";
import { formatDateData } from "../../assets/utils/dates";
import { calculateWithShortagesTotal } from "./parsingmethods/shortageParsing";

class MapInfo extends Component {
  render() {
    const {
      cumulativeReports,
      requestedReport,
      dateObjects,
      // allShortages,
      // allTesting,
      filteredShortages,
      filteredTesting,
    } = this.props;
    return (
      <div className="MapInfo_Container">
        <div className="MapInfo_Section">
          <p>Date Range</p>
          <p>
            {formatDateData(dateObjects[0].reportedDate)} -{" "}
            {formatDateData(requestedReport.reportedDate)}
          </p>
        </div>
        <div className="MapInfo_Section">
          <p>Geography</p>
        </div>
        <div className="MapInfo_Section">
          <p>Total Reports</p>
          <p>{cumulativeReports}</p>
        </div>

        <div className="MapInfo_Section">
          <p>Shortages Reported</p>
          <p>{calculateWithShortagesTotal(filteredShortages)}</p>
          <p>Reported on {formatDateData(requestedReport.reportedDate)}</p>
          <p>some number</p>
        </div>

        {/* <div className="MapInfo_Section">
          <p>Non-Shortages Reported</p>
          <p>{calculateNoShortagesTotal(filteredShortages)}</p>
          <p>Reported on {formatDateData(requestedReport.reportedDate)}</p>
          <p>some number</p>
        </div> */}

        <div className="MapInfo_Section">
          <p>Unavailable Testing Reported</p>
          <p>{filteredTesting.triedToGetTested.couldntGetTested}</p>
          <p>Reported on {formatDateData(requestedReport.reportedDate)}</p>
          <p>some number</p>
        </div>
        <div className="MapInfo_Section">
          <p>Geography Data</p>
          <p>Population</p>
          <p>some number</p>
          <p>Representative</p>
          <p>Joyce Beatty</p>
          <p>Zip Codes</p>
          <p>21222</p>
        </div>
      </div>
    );
  }
}

export default MapInfo;
