import React from "react";
import "../assets/App.css";
// ask about how to set up centralized exports again
import { Switch, Route } from "react-router-dom";

import Header from "../components/header/Header";
import HomePage from "./homepage/HomePage";
import ReportPledgePage from "./reportpledgepage/ReportPledgePage";
import ReportFormPage from "./reportformpage/ReportFormPage";
import Dashboard from "./mappage/MapSelect";
import ThankYouPage from "./thankyoupage/ThankYouPage";
import MapSelect from "./mappage/MapSelect";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pledge" component={ReportPledgePage} />
        <Route exact path="/report" component={ReportFormPage} />
        <Route exact path="/map" component={MapSelect} />
        <Route exact path="/thanks" component={ThankYouPage} />
      </Switch>
    </div>
  );
}

export default App;
