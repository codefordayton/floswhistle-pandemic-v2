import React, { Component } from "react";
// import { StyledButton } from "../../components/button/StyledButton";
// import { Link } from "react-router-dom";
import Mapv2 from "./Mapv2";
import MapInfov2 from "./MapInfov2";
import DateRangeFilter from "./DateRangeFilter";

import { getDateObjects } from "./parsingmethods/getDateObjects";
import { filterByDateRange } from "./parsingmethods/filterByDateRange";
import { getMapData } from "./parsingmethods/getMapData";
import { formatReportData } from "./parsingmethods/formatReportData";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObjects: null,
      requestedReport: null,
      cumulativeReports: null,
      filteredReportsByDateRange: null,
      currentDistrict: null,
    };
    this.setRequestedReport = this.setRequestedReport.bind(this);
    this.updateMapInfoDisplay = this.updateMapInfoDisplay.bind(this);
  }
  componentDidMount() {
    fetch(`https://api.floswhistle.com/v1/reports`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const formattedReportData = formatReportData(response);
        const dateObjects = getDateObjects(formattedReportData);
        const mapData = getMapData(formattedReportData);
        this.setState({
          formattedReportData,
          dateObjects,
          requestedReport: dateObjects[dateObjects.length - 1],
          filteredReportsByDateRange: formattedReportData,
          mapData,
        });
      })
      .catch((error) => console.log(error));
  }
  // slider event that sets requestedReport and filtered reportData by date range
  setRequestedReport(e) {
    const { dateObjects, formattedReportData } = this.state;
    const indexToFind = parseInt(e.target.value);
    const requestedReport = dateObjects.find(
      (report, idx) => idx === indexToFind
    );
    const filteredReportsByDateRange = filterByDateRange(
      formattedReportData,
      requestedReport
    );
    const mapData = getMapData(filteredReportsByDateRange);

    this.setState((prevSt) => {
      return {
        ...prevSt,
        requestedReport,
        filteredReportsByDateRange,
        formattedReportData,
        mapData,
      };
    });
  }
  updateMapInfoDisplay(district) {
    const currentDistrict = district;
    this.setState((prevSt) => {
      return {
        ...prevSt,
        currentDistrict,
      };
    });
  }
  render() {
    const {
      dateObjects,
      requestedReport,
      filteredReportsByDateRange,
      mapData,
      currentDistrict,
    } = this.state;
    return (
      <React.Fragment>
        {dateObjects && filteredReportsByDateRange ? (
          <div className="Dashboard_Page">
            <DateRangeFilter
              dateObjects={dateObjects}
              setRequestedReport={this.setRequestedReport}
              requestedReport={requestedReport}
            />
            <h3 className="color-dark-blue">Overview</h3>
            <div className="Dashboard_Container">
              <MapInfov2
                filteredReportsByDateRange={filteredReportsByDateRange}
                requestedReport={requestedReport}
                dateObjects={dateObjects}
                currentDistrict={currentDistrict}
              />
              <Mapv2
                mapData={mapData}
                updateMapInfoDisplay={this.updateMapInfoDisplay}
              />
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
