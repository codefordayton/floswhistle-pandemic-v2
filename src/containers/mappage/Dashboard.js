import React, { Component } from "react";
import { StyledButton } from "../../components/button/StyledButton";
import { Link } from "react-router-dom";
import DistrictsMap from "./DistrictsMap";
import Tally from "./Tally";
import { sortDataByDate } from "../../assets/utils/dates";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: null,
      dateObjects: null,
      requestedReport: null,
      cumulativeReports: null,
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
        const dateObjects = this.getReportsByDate(reportData);
        this.setState({
          reportData: reportData,
          dateObjects,
          requestedReport: dateObjects[dateObjects.length - 1],
        });
      })
      .catch((error) => console.log(error));
  }
  setRequestedReport(e) {
    const { dateObjects } = this.state;
    const indexToFind = parseInt(e.target.value);
    const requestedReport = dateObjects.find(
      (report, idx) => idx === indexToFind
    );
    const filteredReports = dateObjects.filter((el, idx) => {
      return idx <= indexToFind;
    });

    const cumulativeReports = filteredReports
      .map(({ numberOfReports }) => numberOfReports)
      .reduce((a, b) => a + b, 0);

    this.setState((prevSt) => {
      return {
        ...prevSt,
        requestedReport,
        cumulativeReports,
      };
    });
  }
  getReportsByDate(reportData) {
    // const { reportData } = this.state;
    const frequency = reportData
      .map(({ reported_date }) => reported_date)
      .reduce((newObj, reported_date) => {
        const count = newObj[reported_date] || 0;
        newObj[reported_date] = count + 1;
        return newObj;
      }, {});
    const result = Object.entries(frequency).map(([key, val]) => {
      return { reportedDate: key, numberOfReports: val };
    });
    return result;
  }
  render() {
    const {
      reportData,
      dateObjects,
      cumulativeReports,
      requestedReport,
    } = this.state;
    return (
      <div className="Dashboard_Container">
        {dateObjects ? (
          <div>
            <div className="Dashboard_MapControls">
              {/* <div className="MapControls_Container">
                <StyledButton>Shortages</StyledButton>
                <StyledButton>Testing</StyledButton>
              </div> */}
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
