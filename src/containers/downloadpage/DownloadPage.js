import React from "react";
// import { Link } from "react-router-dom";
import "./DownloadPage.css";

const DownloadPage = (props) => {
  return (
    <div className="DownloadPage">
      <div className="DownloadPage_Content">
        <p>
          Flo's Whistle: Pandemic is a secure, anonymous platform where direct
          patient care providers in the U.S. can report, once a day, on
          workplace deficits that are endangering them and their patients.
          <br /> <br />
          The COVID-19 pandemic is exposing many lethal faults in our healthcare
          system. Direct care providers can see, from within the system, where
          dangers lie. As witnesses on the front lines, if we can report our
          first hand knowledge, we can contribute to a fuller understanding of
          the pandemic situation as it unfolds.
          <br /> <br />
          This independent data collection experiment builds on the 2018 nurse
          staffing project, Flo's Whistle. Reports are aggregated and displayed
          on a dashboard, which includes a map of the U.S. We do not ask for any
          personally identifiable data.
          <br /> <br />
          With the Flo's Whistle projects, we're following the example of
          pioneering statistician, public health advocate and nurse, Florence
          Nightingale. Her research and visual display of data revealed patterns
          in causes of death among soldiers in the Crimean war, lighting the way
          for rational policy reforms and dramatically reducing suffering and
          loss of life.
          <br />
          We hope to do the same.
        </p>

        <div className="buttons">
          <button className="UtilButton" id="Download_Button">
            Download
          </button>
          <p id="Download_Button_Text">
            Download csv file. Data is current at the time of download.
          </p>
        </div>
      </div>
      <div className="DownloadPage_Content_Bottom">
        <div>
          <p>
            NOTE: Eligibility for reporting: only professionally licensed /
            state certified direct care providers are invited to participate.
            Respondents attest to their credential as the first step in the
            reporting process. They further attest that they are currently
            working in that credentialed capacity, in EMS/pre-hospital care,
            urgent care, hospital, nursing home, or LTCH. Ineligible visitors
            are directed to the dashboard.
          </p>
        </div>
        <div>
          <a href="mailto:floswhistle@gmail.com?subject=Flo's Whistle: Pandemic">
            <i className="far fa-envelope"></i>
          </a>
          <p>flo@codefordayton.org</p>
          <p>
            <strong>Flo's Whistle: Pandemic</strong> is a Code for Dayton
            project. We're an independent collaboration of voltuneer developers,
            nurses, physicians, attorneys, writters, designers, and journalists
            from the Code for America Brigade community. ©2020
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
