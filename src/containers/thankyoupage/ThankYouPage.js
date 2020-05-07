import React from "react";
import { Link } from "react-router-dom";
import "./ThankYouPage.css";

const ThankYouPage = (props) => {
  return (
    <div className="ThankYouPage">
      <div className="ThankYouPage_Content">
        <h1>Thank You!</h1>
        <p>
          Bless you for all you're doing to care for your patients and each
          other during this pandemic.
          <br /> <br />
          Please share this project with your colleagues, and stay in touch!
        </p>

        <div className="socials">
          <a href="https://www.facebook.com/flo.nightingale.3344">
            <i className="fa fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/F_NightingaleRN">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/FloNightingaleRN/">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="mailto:floswhistle@gmail.com?subject=Flo's Whistle: Pandemic">
            <i className="far fa-envelope"></i>
          </a>
        </div>

        <div className="buttons">
          <Link to="/map" className="UtilLink">
            see results dashboard
          </Link>
        </div>
      </div>
      <p className="CodeForDayton">
        <strong>Flo's Whistle: Pandemic</strong> <br />
        is a Code for Dayton project. We're an independent collaboration of
        volunteer nurses, physicians, attorneys, writers, designers, journalists
        and developers from the Code for America Brigade community. ©2020
      </p>
    </div>
  );
};

export default ThankYouPage;
