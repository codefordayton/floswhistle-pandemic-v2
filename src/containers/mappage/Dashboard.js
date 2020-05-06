import React, { Component } from "react";
// import { StyledButton } from "../../components/button/StyledButton";
// import { Link } from "react-router-dom";
import Mapv2 from "./Mapv2";
import DateRangeFilter from "./DateRangeFilter";
import DistrictsMapInfo from "./DistrictsMapInfo";
import NationalMapInfo from "./NationalMapInfo";
import { getDateObjects } from "./parsingmethods/getDateObjects";
import { filterByDateRange } from "./parsingmethods/filterByDateRange";
import { getMapData } from "./parsingmethods/getMapData";
import { formatReportData } from "./parsingmethods/formatReportData";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDistrict: null,
      dateObjects: null,
      filteredReportsByDateRange: null,
      formattedReportData: null,
      mapData: null,
      requestedReport: null,
      categoryDisplay: 0,
    };
    this.setRequestedReport = this.setRequestedReport.bind(this);
    this.selectDistrict = this.selectDistrict.bind(this);
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
  // switches MapInfo data between districts and national data
  selectDistrict(district) {
    const { currentDistrict } = this.state;
    const newDistrict = district !== currentDistrict ? district : null;
    this.setState((prevSt) => {
      return {
        ...prevSt,
        currentDistrict: newDistrict,
      };
    });
  }
  changeCategoryDisplay(val) {
    this.setState({
      categoryDisplay: val,
    });
  }
  render() {
    const {
      dateObjects,
      requestedReport,
      filteredReportsByDateRange,
      mapData,
      currentDistrict,
      categoryDisplay,
    } = this.state;
    return (
      <React.Fragment>
        {dateObjects && filteredReportsByDateRange ? (
          <div className="Dashboard_Page">
            <div className="Dashboard_Container">
              <div className="Dashboard_Container_Head">
                <div
                  className="color-dark-blue medium-text "
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  Explore the data
                </div>

                <div className="Dashboard_CategoryButtons_Container">
                  <button
                    onClick={() => this.changeCategoryDisplay(0)}
                    className="Dashboard_CategoryButtons"
                  >
                    Shortages
                  </button>
                  <button
                    onClick={() => this.changeCategoryDisplay(1)}
                    className="Dashboard_CategoryButtons"
                  >
                    Testing
                  </button>
                </div>
                <div className="Dashboard_Head_Text">
                  <div
                    className="color-dark-blue medium-text"
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      textTransform: "uppercase",
                    }}
                  >
                    {categoryDisplay === 0
                      ? "do caregivers have the resources they need?"
                      : "are caregivers being tested for covid-19"}
                  </div>
                  <div className="color-dark-blue">
                    {categoryDisplay === 0
                      ? "Flo's Whistle tracks shortages of resources for caregivers. Resources can include different personal protective equipment such as masks, faces shields, or isolation gowns but also hospital equipment like ventilators and ICU beds, or even just adequate staffing for the crisis."
                      : "Flo's Whistle tracks reports of testing for caregivers. Testing can include unobtainable testing, pending results, and testing with results. There is also a report for those who have not sought testing."}
                  </div>
                </div>
              </div>
              <div className="Dashboard_Container_Style">
                <div
                  className="color-dark-blue medium-text"
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  {categoryDisplay === 0 ? "Shortages" : "Testing"}
                </div>
                <div
                  className="color-light-gray medium-text"
                  style={{
                    textAlign: "left",
                    padding: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  Date Filter
                </div>
                <div className="Dashboard_MapFilter_Container">
                  <DateRangeFilter
                    dateObjects={dateObjects}
                    setRequestedReport={this.setRequestedReport}
                    requestedReport={requestedReport}
                    firstReportDate={dateObjects[0].reportedDate}
                  />
                </div>
                <h3
                  className="color-light-gray medium-text"
                  style={{
                    textAlign: "left",
                    marginLeft: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  National Map and Congressional District Data
                </h3>
                <div className="Dashboard_MapComponents_Container">
                  <div className="MapInfo_Container">
                    <NationalMapInfo
                      filteredReportsByDateRange={filteredReportsByDateRange}
                      requestedReport={requestedReport}
                      firstReportDate={dateObjects[0].reportedDate}
                      categoryDisplay={categoryDisplay}
                    />
                  </div>
                  <Mapv2
                    mapData={mapData}
                    selectDistrict={this.selectDistrict}
                    categoryDisplay={categoryDisplay}
                  />

                  <div className="MapInfo_Container">
                    <DistrictsMapInfo
                      filteredReportsByDateRange={filteredReportsByDateRange}
                      requestedReport={requestedReport}
                      currentDistrict={currentDistrict}
                      firstReportDate={dateObjects[0].reportedDate}
                      categoryDisplay={categoryDisplay}
                    />
                  </div>
                </div>
              </div>
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
