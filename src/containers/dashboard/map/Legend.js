import React, { Component } from 'react';
import './MapOverlay.scss';
// I def got a little lazy to get the no data map legend key done
import nodataimg from '../../../assets/nodata.png';

class Legend extends Component {
  render() {
    const { categoryDisplay } = this.props;
    return (
      <div className="Map_Legend_Container">
        <div className="Map_Legend_Row">
          <div className={`Map_Legend_Color color-nodata`}>
            <img src={nodataimg} alt="" />
          </div>
          <div className="Map_Legend_Label">No data</div>
        </div>
        <div className="Map_Legend_Row">
          <div className={`Map_Legend_Color color-0`} />
          <div className="Map_Legend_Label">0%</div>
        </div>
        <div className="Map_Legend_Row">
          <div className={`Map_Legend_Color ${categoryDisplay === 0 ? 'color-s1' : 'color-t1'}`} />{' '}
          <div className="Map_Legend_Label">1-25%</div>
        </div>
        <div className="Map_Legend_Row">
          <div className={`Map_Legend_Color ${categoryDisplay === 0 ? 'color-s2' : 'color-t2'}`} />{' '}
          <div className="Map_Legend_Label">25-50%</div>
        </div>
        <div className="Map_Legend_Row">
          <div className={`Map_Legend_Color ${categoryDisplay === 0 ? 'color-s3' : 'color-t3'}`} />{' '}
          <div className="Map_Legend_Label">50-75%</div>
        </div>
        <div className="Map_Legend_Row">
          <div className={`Map_Legend_Color ${categoryDisplay === 0 ? 'color-s4' : 'color-t4'}`} />{' '}
          <div className="Map_Legend_Label">75-100%</div>
        </div>
      </div>
    );
  }
}

export default Legend;
