import React, { Component } from 'react';
import './MapOverlay.scss';

class ZoomButtons extends Component {
  render() {
    const { zoomIn, zoomOut } = this.props;
    return (
      <div className="MapButtons_Container">
        <button
          onClick={zoomIn}
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              zoomIn();
            }
          }}
          className="Map_Button"
        >
          <i className="fas fa-plus"></i>
        </button>
        <button
          onClick={zoomOut}
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              zoomOut();
            }
          }}
          className="Map_Button"
        >
          <i className="fas fa-minus"></i>
        </button>
      </div>
    );
  }
}

export default ZoomButtons;
