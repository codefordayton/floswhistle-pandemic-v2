import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
    };
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }
  toggleMobileMenu() {
    const { mobile } = this.state;
    this.setState({
      mobile: !mobile,
    });
  }
  render() {
    const { mobile } = this.state;
    return (
      <div className="Header">
        <a href="/" id="Logo">
          <img src="/images/floswhistle.png" alt="Flos Whistle" />
        </a>
        <button
          onClick={this.toggleMobileMenu}
          className="Header_Mobile_MenuButton"
        >
          {mobile ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
        <div className="Header_NavLink_Menu">
          <div
            className={`Header_NavLink_Container${mobile ? " _Active" : ""}`}
          >
            <NavLink
              exact
              to="/"
              className={`Header_NavLink${mobile ? " _Show" : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/results"
              className={`Header_NavLink${mobile ? " _Show" : ""}`}
            >
              Results
            </NavLink>
            <NavLink
              to="/download"
              className={`Header_NavLink${mobile ? " _Show" : ""}`}
            >
              Download
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
