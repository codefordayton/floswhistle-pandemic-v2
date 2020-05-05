import React, { Component } from "react";
import DistrictsMap from "./districts_map.svg";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./Mapv2.css";

class Mapv2 extends Component {
  handleUpdateMapInfoDisplay(district) {
    this.props.updateMapInfoDisplay(district);
  }
  genColor(rate) {
    //Calculates the color of each district based on the rate of respondents; could be less verbose by using an array method; consider refactoring
    if (rate <= 0) {
      return "#cccccc";
    } else if (rate > 0 && rate <= 10) {
      return "#FFE6E6";
    } else if (rate > 10 && rate <= 20) {
      return "#FCCDCD";
    } else if (rate > 20 && rate <= 30) {
      return "#FDBBBB";
    } else if (rate > 30 && rate <= 40) {
      return "#FFAAAA";
    } else if (rate > 40 && rate <= 50) {
      return "#FD9797";
    } else if (rate > 50 && rate <= 60) {
      return "#FA7878";
    } else if (rate > 60 && rate <= 80) {
      //Remember to refactor with additonal color for values 60 - 70
      return "#FC5959";
    } else if (rate > 80 && rate <= 90) {
      return "#F72f2f";
    } else if (rate > 90 && rate <= 100) {
      return "#E61212";
    } else {
      return "#cccccc";
    }
  }
  render() {
    const { mapData } = this.props;
    return (
      <div className="DistrictMaps_Container">
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <TransformComponent>
                <SvgLoader path={DistrictsMap}>
                  <SvgProxy selector={"path"} fill="black" />
                  {mapData.map((data) => (
                    <SvgProxy
                      key={`#${data.district}`}
                      selector={`#${data.district}`}
                      fill={this.genColor(data.rate)}
                      onClick={() => this.handleUpdateMapInfoDisplay(data)}
                    />
                  ))}
                </SvgLoader>
              </TransformComponent>

              <div className="Map_Tools_Overlay">
                <div className="Map_Tools_Container">
                  <button onClick={zoomIn} className="Map_Button">
                    <i className="fas fa-plus"></i>
                  </button>
                  <button onClick={zoomOut} className="Map_Button">
                    <i className="fas fa-minus"></i>
                  </button>
                  {/* <button onClick={resetTransform} className="Map_Button">
                    x
                  </button> */}
                </div>
              </div>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    );
  }
}

export default Mapv2;
