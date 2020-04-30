import React, { Component } from "react";

class MapTestingTable extends Component {
  render() {
    const { allShortages, numberOfReports } = this.props;
    return (
      <div className="MapStats_Container">
        <div className="MapStats_Heading">Reported Testing Statistics</div>
        <div className="MapStats_Heading">Total Reports: {numberOfReports}</div>
        <div className="MapStats_Table">
          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">Resource</div>
            {Object.keys(allShortages).map((key) => (
              <div className="MapStats_Row_Heading" key={key}>
                {key.replace(/_/g, " ")}
              </div>
            ))}
          </div>
          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">No Shortage</div>
            {Object.entries(allShortages).map(([key, val]) => (
              <div key={`${key}-noshortage`}>
                {Math.floor((val.noShortage / numberOfReports) * 100)}%
              </div>
            ))}
          </div>
          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">With Shortage</div>
            {Object.entries(allShortages).map(([key, val]) => (
              <div key={`${key}-withshortage`}>
                {Math.floor((val.withShortage / numberOfReports) * 100)}%
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MapTestingTable;
