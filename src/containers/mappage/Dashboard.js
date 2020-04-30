import React, { Component } from "react";
import { StyledButton } from "../../components/button/StyledButton";
import { Link } from "react-router-dom";
import DistrictsMap from "./DistrictsMap";
import Tally from "./Tally";
import { sortDataByDate } from "../../assets/utils/dates";
import { findNumberOfReportsByDate } from "./parsingmethods/findNumberofReportsByDate";
import { calculateShortages } from "./parsingmethods/calculateShortages";
import { filterByRequested } from "./parsingmethods/filterByRequested";
import { calculateTesting } from "./parsingmethods/calculateTesting";
import MapTableShortages from "./MapTableShortages";
import MapTableTesting from "./MapTableTesting";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: null,
      dateObjects: null,
      requestedReport: null,
      cumulativeReports: null,
      allReportsFilteredByRequested: null,
      allShortages: null,
      allTesting: null,
    };
    this.setRequestedReport = this.setRequestedReport.bind(this);
  }
  componentDidMount() {
    fetch(`https://api.floswhistle.com/v1/reports`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const reportData = sortDataByDate(response);
        const allShortages = calculateShortages(reportData);
        const allTesting = calculateTesting(reportData);
        calculateTesting(reportData);
        const dateObjects = findNumberOfReportsByDate(reportData);
        this.setState({
          // raw data sorted by date - earliest to latest
          reportData: reportData,
          // report data then parsed and reduced to condense all reports with the same date to a date object
          // that has the date and number of reports made on that specific date
          dateObjects,
          // specific date object found within dateObjects array that contains the selected date and
          // number of reports made on that date
          requestedReport: dateObjects[dateObjects.length - 1],
          // object that has all resources from reportData, calculated to number values that show
          // how many specific resources were cited as a shortage or no shortage
          allShortages,
          allTesting,
        });
      })
      .catch((error) => console.log(error));
  }
  // there is a lot going on in here that will need to be handled differently.
  // this single event is calling lots of paring methods and will be very cumbersome with lots of data
  setRequestedReport(e) {
    const { dateObjects, reportData } = this.state;
    // declares indexToFind as the target value of the range slider
    const indexToFind = parseInt(e.target.value);
    // finds the index of the selected date via slider from within the date objects array
    // that provides the min and max range to the slider
    const requestedReport = dateObjects.find(
      (report, idx) => idx === indexToFind
    );
    // filters all report data by dates before or the same as the date of the requestedReport
    const allReportsFilteredByRequested = filterByRequested(
      reportData,
      requestedReport
    );
    // calculates the number of shortages cited for each resource within the filtered report data range
    const allShortages = calculateShortages(allReportsFilteredByRequested);
    const allTesting = calculateTesting(allReportsFilteredByRequested);
    // filters the date object array dates before or the same as the date of the requestedReport
    const filteredReports = dateObjects.filter((el, idx) => {
      return idx <= indexToFind;
    });
    // returns the total number of reports made between the first date object and requestedReport (selected date)
    const cumulativeReports = filteredReports
      .map(({ numberOfReports }) => numberOfReports)
      .reduce((a, b) => a + b, 0);

    this.setState((prevSt) => {
      return {
        ...prevSt,
        requestedReport,
        cumulativeReports,
        allReportsFilteredByRequested,
        allShortages,
        allTesting,
      };
    });
  }
  render() {
    const {
      reportData,
      dateObjects,
      cumulativeReports,
      requestedReport,
      allShortages,
      allTesting,
    } = this.state;
    return (
      <div className="Dashboard_Container">
        {dateObjects ? (
          <div>
            <div className="Dashboard_MapControls">
              <MapTableShortages
                allShortages={allShortages}
                numberOfReports={
                  cumulativeReports === null
                    ? reportData.length
                    : cumulativeReports
                }
              />
              <MapTableTesting
                allTesting={allTesting}
                numberOfReports={
                  cumulativeReports === null
                    ? reportData.length
                    : cumulativeReports
                }
              />

              <Tally
                numberOfReports={reportData.length}
                dateObjects={dateObjects}
                setRequestedReport={this.setRequestedReport}
                requestedReport={requestedReport}
                cumulativeReports={cumulativeReports}
              />
            </div>
            <DistrictsMap />
            <StyledButton component={Link} to="/">
              GO BACK
            </StyledButton>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}

export default Dashboard;
