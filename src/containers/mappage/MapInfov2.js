import React, { Component } from "react";
import "./MapInfov2.css";
import DistrictsMapInfo from "./DistrictsMapInfo";
import NationalMapInfo from "./NationalMapInfo";

// ***Same notes in parsingmethods/districtParsing.js***
// There is ALOT happening here that may not be necessary and is tied to the map component not rerendering, thus not
// updating the prop values as the date range is adjusted with how it is set up currently. This is also the reason why
// the heat mapping of the map currently doesn't change via the slider.
// These are methods for dynamically calculating the values that should be displayed if the map rerendered and used updated prop values
// but that also presents the problem of whether it is good or not to rerender the map constantly

// **MapInfo specific notes***
// Currently the content of MapInfo_Container is based on whether or not the user is hovering over a district
// It renders back and forth between Total/National data and district data currently

class MapInfov2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapInfoComponent: 0,
    };
  }
  changeMapInfoComponent(val) {
    this.setState({
      mapInfoComponent: val,
    });
  }
  render() {
    const {
      requestedReport,
      dateObjects,
      filteredReportsByDateRange,
      currentDistrict,
    } = this.props;
    const { mapInfoComponent } = this.state;
    const firstReportDate = dateObjects[0].reportedDate;
    return (
      <div className="MapInfo_Container">
        <div>
          <button
            onClick={() => this.changeMapInfoComponent(0)}
            className="MapInfo_ViewButton"
          >
            National
          </button>
          <button
            onClick={() => this.changeMapInfoComponent(1)}
            className="MapInfo_ViewButton"
          >
            District
          </button>
        </div>
        {mapInfoComponent === 0 ? (
          <NationalMapInfo
            requestedReport={requestedReport}
            firstReportDate={firstReportDate}
            filteredReportsByDateRange={filteredReportsByDateRange}
          />
        ) : (
          <DistrictsMapInfo
            requestedReport={requestedReport}
            firstReportDate={firstReportDate}
            currentDistrict={currentDistrict}
            filteredReportsByDateRange={filteredReportsByDateRange}
          />
        )}
      </div>
    );
  }
}

export default MapInfov2;
