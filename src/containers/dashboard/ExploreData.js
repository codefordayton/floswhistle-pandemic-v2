import React, { Component } from "react";
import "./ExploreData.css";

class ExploreData extends Component {
  handleChangeCategoryDisplay(val) {
    this.props.changeCategoryDisplay(val);
  }
  render() {
    const { categoryDisplay } = this.props;
    return (
      <div className="ExploreData_Container">
        <div className="ExploreData_Text color-dark-blue medium-text ">
          Explore the data
        </div>

        <div className="ExploreData_Buttons_Container">
          <button
            onClick={() => this.handleChangeCategoryDisplay(0)}
            className="ExploreData_Buttons"
          >
            Shortages
          </button>
          <button
            onClick={() => this.handleChangeCategoryDisplay(1)}
            className="ExploreData_Buttons"
          >
            Testing
          </button>
        </div>
        <div className="ExploreData_Blurb">
          <div className="ExploreData_Text color-dark-blue medium-text">
            {categoryDisplay === 0
              ? "do caregivers have the resources they need?"
              : "are caregivers being tested for covid-19"}
          </div>
          <div className="color-dark-blue">
            {categoryDisplay === 0
              ? "Flo's Whistle tracks shortages of resources for caregivers. Resources can include different personal protective equipment such as masks, faces shields, or isolation gowns but also hospital equipment like ventilators and ICU beds, or even just adequate staffing for the crisis."
              : "Flo's Whistle tracks reports of testing for caregivers. Testing can include unobtainable testing, pending results, and testing with results. There is also a report for those who have not sought testing."}
          </div>
        </div>
      </div>
    );
  }
}

export default ExploreData;
