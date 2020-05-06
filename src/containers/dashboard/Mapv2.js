import React, { Component } from "react";
import DistrictsMap from "./districts_map.svg";
import Mapv2OverLay from "./Mapv2Overlay";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./Mapv2.css";

class Mapv2 extends Component {
  handleSelectDistrict(district) {
    this.props.selectDistrict(district);
  }
  genShortagesColor(rate) {
    //Calculates the color of each district based on the rate of respondents; could be less verbose by using an array method; consider refactoring
    if (rate >= 0 && rate <= 25) {
      return "#f8e9bf";
    } else if (rate > 25 && rate <= 50) {
      return "#dba487";
    } else if (rate > 50 && rate <= 75) {
      return "#ba605d";
    } else if (rate > 75 && rate <= 100) {
      return "#94003a";
    }
  }
  genTestingColor(rate) {
    //Calculates the color of each district based on the rate of respondents; could be less verbose by using an array method; consider refactoring
    if (rate >= 0 && rate <= 25) {
      return "#f2e1f5";
    } else if (rate > 25 && rate <= 50) {
      return "#c990d6";
    } else if (rate > 50 && rate <= 75) {
      return "#9445ab";
    } else if (rate > 75 && rate <= 100) {
      return "#500b65";
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

              <Mapv2OverLay
                categoryDisplay={categoryDisplay}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
              />
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    );
  }
}

export default Mapv2;
