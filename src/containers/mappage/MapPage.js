import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./MapPage.css";

const MapPage = (props) => {
  return (
    <div className="MapPage">
      <div className="content">
        <p>We are currently collecting data.</p>
        <p>
          Once we receive more reports, this page will be replaced with a
          mechanism to explore the data.
        </p>
        <p>
          If you'd like access to the raw, anonymized data, send your request to{" "}
          <a href="mailto:flo@codefordayton.org">flo@codefordayton.org</a>.
        </p>
        <div className="buttons">
          <Button component={Link} to="/" className="form_button">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
