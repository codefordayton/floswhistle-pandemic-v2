import React from 'react';
import { Link } from 'react-router-dom';
import AboutCodeForDayton from '../../assets/utils/AboutCodeForDayton';
import './ThankYouPage.css';

const ThankYouPage = (props) => {
  return (
    <div className="ThankYouPage">
      <div className="ThankYouPage_Content">
        <h1>Thank You!</h1>
        <p>
          Bless you for all you're doing to care for your patients and each other during this
          pandemic.
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
          <a href="mailto:flo@codefordayton.org?subject=Flo's Whistle: Pandemic">
            <i className="far fa-envelope"></i>
          </a>
          <p>flo@codefordayton.org</p>
        </div>

        <div className="buttons">
          <Link to="/results" className="UtilLink">
            see results dashboard
          </Link>
        </div>
      </div>
      <AboutCodeForDayton />
    </div>
  );
};

export default ThankYouPage;
