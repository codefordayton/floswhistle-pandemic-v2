import React, { Component } from "react";
import DistrictsMap from "./districts_map.svg";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./Mapv2.css";

class Mapv2 extends Component {
  handleSelectDistrict(district) {
    this.props.selectDistrict(district);
  }
  genShortagesColor(rate) {
    //Calculates the color of each district based on the rate of respondents; could be less verbose by using an array method; consider refactoring
    if (rate <= 0) {
      return "#feeae2";
    } else if (rate > 0 && rate <= 25) {
      return "#fcbfb2";
    } else if (rate > 25 && rate <= 50) {
      return "#f987ac";
    } else if (rate > 50 && rate <= 75) {
      return "#d22e90";
    } else if (rate > 75 && rate <= 100) {
      return "#7a0177";
    }
  }
  genTestingColor(rate) {
    //Calculates the color of each district based on the rate of respondents; could be less verbose by using an array method; consider refactoring
    if (rate <= 0) {
      return "#f0f9e8";
    } else if (rate > 0 && rate <= 25) {
      return "#c8e9c3";
    } else if (rate > 25 && rate <= 50) {
      return "#94d5bc";
    } else if (rate > 50 && rate <= 75) {
      return "#51adc9";
    } else if (rate > 75 && rate <= 100) {
      return "#0968ac";
    }
  }
  render() {
    const { mapData, categoryDisplay } = this.props;
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
                      fill={
                        categoryDisplay === 0
                          ? this.genShortagesColor(data.shortagesRate)
                          : this.genTestingColor(data.noTestingRate)
                      }
                      onClick={() => this.handleSelectDistrict(data)}
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
                </div>
                <div className="Map_Legend_Container">
                  <div className="Map_Legend_Row">
                    <div
                      className={`Map_Legend_Color ${
                        categoryDisplay === 0 ? "color-s0" : "color-t0"
                      }`}
                    />{" "}
                    <div className="Map_Legend_Label">No data</div>
                  </div>
                  <div className="Map_Legend_Row">
                    <div
                      className={`Map_Legend_Color ${
                        categoryDisplay === 0 ? "color-s1" : "color-t1"
                      }`}
                    />{" "}
                    <div className="Map_Legend_Label">1-25%</div>
                  </div>
                  <div className="Map_Legend_Row">
                    <div
                      className={`Map_Legend_Color ${
                        categoryDisplay === 0 ? "color-s2" : "color-t2"
                      }`}
                    />{" "}
                    <div className="Map_Legend_Label">25-50%</div>
                  </div>
                  <div className="Map_Legend_Row">
                    <div
                      className={`Map_Legend_Color ${
                        categoryDisplay === 0 ? "color-s3" : "color-t3"
                      }`}
                    />{" "}
                    <div className="Map_Legend_Label">50-75%</div>
                  </div>
                  <div className="Map_Legend_Row">
                    <div
                      className={`Map_Legend_Color ${
                        categoryDisplay === 0 ? "color-s4" : "color-t4"
                      }`}
                    />{" "}
                    <div className="Map_Legend_Label">75-100%</div>
                  </div>
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
