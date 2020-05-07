import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { color } from "d3-color";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { SvgLoader, SvgProxy } from "react-svgmt";
import DistrictsMap from "./districts_map.svg";
import Mapv2OverLay from "./Mapv2Overlay";
import "./Map.scss";

class Map extends Component {
  constructor() {
    super();
    this.handleSelectDistrict = this.handleSelectDistrict.bind(this);
    this.genColor = this.genColor.bind(this);
  }
  handleSelectDistrict(district) {
    this.props.selectDistrict(district);
  }
  genColor(saturatedColor, rate) {
    const rgbColor = scaleLinear()
      .domain([0, 100])
      .range(["#fff", saturatedColor])(rate || 0);
    const hexColor = color(rgbColor).formatHex();
    return hexColor;
  }
  render() {
    const { dataByDistrict, categoryDisplay } = this.props;

    // TODO: this is navy like the mockups-- is that what we want?
    const saturatedColor = "#303a84";

    // let saturatedColor = '#500b65';
    let rateAccessor = "noTestingRate";

    if (categoryDisplay === 0) {
      // saturatedColor = '#94003a';
      rateAccessor = "shortagesRate";
    }

    return (
      <div className="DistrictMaps_Container">
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              <TransformComponent>
                <SvgLoader path={DistrictsMap}>
                  <SvgProxy selector={"path"} fill="white" />
                  {dataByDistrict.map((data) => (
                    <SvgProxy
                      key={`#${data.district}`}
                      selector={`#${data.district}`}
                      fill={this.genColor(
                        saturatedColor,
                        data[rateAccessor] || 0
                      )}
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
            </>
          )}
        </TransformWrapper>
      </div>
    );
  }
}

export default Map;
