import React, { Component } from 'react';
import { scaleQuantize } from 'd3-scale';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import DistrictsMap from './districts_map.svg';
import ZoomButtons from './ZoomButtons';
import Legend from './Legend';
import './Map.scss';

class Map extends Component {
  constructor() {
    super();
    this.handleSelectDistrict = this.handleSelectDistrict.bind(this);
    this.genColorOrdinal = this.genColorOrdinal.bind(this);
  }
  handleSelectDistrict(district) {
    this.props.selectDistrict(district);
  }
  genColorOrdinal(range, rate) {
    const color = rate <= 0 ? '#fff' : scaleQuantize().domain([0, 100]).range(range)(rate);
    return color;
  }
  render() {
    const { dataByDistrict, categoryDisplay, currentDistrict } = this.props;
    let range = ['#c990d6', '#a75dbb', '#802d99', '#500b65'];
    let rateAccessor = 'noTestingRate';

    if (categoryDisplay === 0) {
      rateAccessor = 'shortagesRate';
      range = ['#dba487', '#c5776a', '#ae8451', '#94003a'];
    }

    this.genColorOrdinal(range, 26);

    return (
      <div className="DistrictMaps_Container">
        <svg style={{ position: 'absolute', zIndex: '-1' }}>
          <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="8" height="8">
            <path
              d="M-2,2 l4,-4
           M0,8 l8,-8
           M6,10 l4,-4"
              style={{ stroke: '#dcdcdc', strokeWidth: 2 }}
            />
          </pattern>
          <pattern id="diagonalHatchDark" patternUnits="userSpaceOnUse" width="8" height="8">
            <path
              d="M-2,2 l4,-4
           M0,8 l8,-8
           M6,10 l4,-4"
              style={{ stroke: '#cecaca', strokeWidth: 2 }}
            />
          </pattern>
        </svg>
        <TransformWrapper defaultScale={1} defaultPositionX={200} defaultPositionY={100}>
          {({ zoomIn, zoomOut }) => (
            <>
              <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
              <Legend categoryDisplay={categoryDisplay} />
              <TransformComponent>
                <SvgLoader path={DistrictsMap}>
                  <SvgProxy
                    selector={'path'}
                    fill="url(#diagonalHatch)"
                    class="district no-reports"
                    role="button"
                    onClick={(e) =>
                      this.handleSelectDistrict({ district: e.target.id, noData: true })
                    }
                    onKeyUp={(e) => {
                      if (e.code === 'Enter') {
                        this.handleSelectDistrict({ district: e.target.id, noData: true });
                      }
                    }}
                    // Class not className because props are just passed through evidently
                  />
                  {dataByDistrict.map((data) => (
                    <SvgProxy
                      tabindex="0"
                      role="button"
                      key={`#${data.district}`}
                      selector={`#${data.district}`}
                      fill={this.genColorOrdinal(range, data[rateAccessor])}
                      onClick={() => this.handleSelectDistrict(data)}
                      onKeyUp={(e) => {
                        if (e.code === 'Enter') {
                          this.handleSelectDistrict(data);
                        }
                      }}
                      class={`district has-reports ${
                        currentDistrict && data.district === currentDistrict.district
                          ? 'selected'
                          : null
                      }`}
                    />
                  ))}
                </SvgLoader>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    );
  }
}

export default Map;
