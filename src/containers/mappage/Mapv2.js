import React, { Component } from "react";
import DistrictsMap from "./districts_map.svg";
import { SvgLoader, SvgProxy } from "react-svgmt";
import "./Mapv2.css";

class Mapv2 extends Component {
  handleUpdateMapInfoDisplay(district) {
    this.props.updateMapInfoDisplay(district);
  }
  getRate(a, b) {
    return Math.floor((a * 100) / b);
  }
  genColor(percentage) {
    //Calculates the color of each district based on the percentage of respondents; could be less verbose by using an array method; consider refactoring
    if (percentage <= 0) {
      return "#cccccc";
    } else if (percentage > 0 && percentage <= 10) {
      return "#FFE6E6";
    } else if (percentage > 10 && percentage <= 20) {
      return "#FCCDCD";
    } else if (percentage > 20 && percentage <= 30) {
      return "#FDBBBB";
    } else if (percentage > 30 && percentage <= 40) {
      return "#FFAAAA";
    } else if (percentage > 40 && percentage <= 50) {
      return "#FD9797";
    } else if (percentage > 50 && percentage <= 60) {
      return "#FA7878";
    } else if (percentage > 60 && percentage <= 80) {
      //Remember to refactor with additonal color for values 60 - 70
      return "#FC5959";
    } else if (percentage > 80 && percentage <= 90) {
      return "#F72f2f";
    } else if (percentage > 90 && percentage <= 100) {
      return "#E61212";
    } else {
      return "#cccccc";
    }
  }
  render() {
    // Need to figure out how to get dynamic array SvgProxy to update props.
    // See https://github.com/hugozap/react-svgmt/issues/3 and https://github.com/hugozap/react-svgmt/issues/14
    const { mapData } = this.props;
    return (
      <div className="DistrictMaps_Container">
        <SvgLoader path={DistrictsMap}>
          {mapData.map((data) => (
            <React.Fragment key={`districtWrapper${data.district}`}>
              <SvgProxy
                key={`#${data.district}`}
                selector={`#${data.district}`}
                fill={this.genColor(
                  this.getRate(data.shortagesReported, data.resourceReports)
                )}
                onClick={() => this.handleUpdateMapInfoDisplay(data)}
              />
            </React.Fragment>
          ))}
        </SvgLoader>
      </div>
    );
  }
}

export default Mapv2;
