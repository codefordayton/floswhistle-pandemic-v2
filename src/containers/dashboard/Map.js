import React, { Component } from "react";
import { scaleLinear, scaleQuantize } from "d3-scale";
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
    this.genColorOrdinal = this.genColorOrdinal.bind(this);
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
  genColorOrdinal(range, rate) {
    const color =
      rate <= 0 ? "#fff" : scaleQuantize().domain([0, 100]).range(range)(rate);
    return color;
  }
  render() {
    const { dataByDistrict, categoryDisplay } = this.props;

    // TODO: this is navy like the mockups-- is that what we want?
    // const saturatedColor = "#303a84";
    let range = ["#c990d6", "#a75dbb", "#802d99", "#500b65"];

    // let saturatedColor = "#500b65";
    let rateAccessor = "noTestingRate";

    if (categoryDisplay === 0) {
      // saturatedColor = "#94003a";
      rateAccessor = "shortagesRate";
      range = ["#dba487", "#c5776a", "#ae8451", "#94003a"];
    }

    this.genColorOrdinal(range, 26);

    return (
      <div className="DistrictMaps_Container">
        <svg style={{ position: "absolute", zIndex: "-1" }}>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
          >
            <path
              d="M-2,2 l4,-4
           M0,8 l8,-8
           M6,10 l4,-4"
              style={{ stroke: "rgb(220, 220, 220)", strokeWidth: 2 }}
            />
          </pattern>
        </svg>
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              <TransformComponent>
                <SvgLoader path={DistrictsMap}>
                  <SvgProxy selector={"path"} fill="url(#diagonalHatch)" />
                  {dataByDistrict.map((data) => (
                    <SvgProxy
                      key={`#${data.district}`}
                      selector={`#${data.district}`}
                      fill={this.genColorOrdinal(range, data[rateAccessor])}
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
