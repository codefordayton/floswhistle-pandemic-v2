import React, { Component } from 'react';
import Map from './Map';
import MapInfoDistrict from './MapInfoDistrict';
import MapInfoNational from './MapInfoNational';
import ExploreData from './ExploreData';
import { getDateObjects } from './parsingmethods/getDateObjects';
import { filterByDateRange } from './parsingmethods/filterByDateRange';
import { getMapData } from './parsingmethods/getMapData';
import { formatReportData } from './parsingmethods/formatReportData';

import './Dashboard.scss';
import MapHead from './MapHead';

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
    this.changeCategoryDisplay = this.changeCategoryDisplay.bind(this);
  }
  componentDidMount() {
    fetch(`https://api.floswhistle.com/v1/reports`, {
      method: 'GET',
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
    const requestedReport = dateObjects.find((report, idx) => idx === indexToFind);
    const filteredReportsByDateRange = filterByDateRange(formattedReportData, requestedReport);
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
      <div className="Dashboard_Page">
        {dateObjects && filteredReportsByDateRange ? (
          <div className="Dashboard_Container">
            <ExploreData
              categoryDisplay={categoryDisplay}
              changeCategoryDisplay={this.changeCategoryDisplay}
            />
            <div className="Dashboard_Container_Style">
              <MapHead
                dateObjects={dateObjects}
                setRequestedReport={this.setRequestedReport}
                requestedReport={requestedReport}
                firstReportDate={dateObjects[0].reportedDate}
                categoryDisplay={categoryDisplay}
              />
              <div className="Dashboard_MapComponents_Container">
                <MapInfoNational
                  filteredReportsByDateRange={filteredReportsByDateRange}
                  requestedReport={requestedReport}
                  firstReportDate={dateObjects[0].reportedDate}
                  categoryDisplay={categoryDisplay}
                />

                <Map
                  dataByDistrict={mapData}
                  selectDistrict={this.selectDistrict}
                  categoryDisplay={categoryDisplay}
                />

                <MapInfoDistrict
                  filteredReportsByDateRange={filteredReportsByDateRange}
                  requestedReport={requestedReport}
                  currentDistrict={currentDistrict}
                  firstReportDate={dateObjects[0].reportedDate}
                  categoryDisplay={categoryDisplay}
                />
              </div>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}

export default Dashboard;
