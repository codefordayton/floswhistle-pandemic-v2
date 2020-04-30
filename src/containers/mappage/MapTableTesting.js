import React, { Component } from "react";
import "./MapStats.css";

class MapTableShortages extends Component {
  render() {
    const { allTesting, numberOfReports } = this.props;
    return (
      <div className="MapStats_Container">
        <div className="MapStats_Heading">Reported Testing Statistics</div>
        <div className="MapStats_Heading">Total Reports: {numberOfReports}</div>
        <div className="MapStats_Table">
          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">Testing</div>
            <div className="MapStats_Row_Heading">Sought Testing</div>
            <div className="MapStats_Row_Heading">Could get testing</div>
            <div className="MapStats_Row_Heading">Recieved test results</div>
          </div>

          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">Yes</div>
            <div>
              {Math.floor(
                (allTesting.soughtTesting.yes / numberOfReports) * 100
              )}
              %
            </div>
            <div>
              {Math.floor(
                (allTesting.triedToGetTested.gotTested / numberOfReports) * 100
              )}
              %
            </div>
            <div>
              {Math.floor(
                (allTesting.testedResultsStatus.receivedResults /
                  numberOfReports) *
                  100
              )}
              %
            </div>
          </div>
          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">No</div>
            <div>
              {Math.floor(
                (allTesting.soughtTesting.no / numberOfReports) * 100
              )}
              %
            </div>
            <div>
              {Math.floor(
                (allTesting.triedToGetTested.couldntGetTested /
                  numberOfReports) *
                  100
              )}
              %
            </div>
            <div>
              {Math.floor(
                (allTesting.testedResultsStatus.waitingForResults /
                  numberOfReports) *
                  100
              )}
              %
            </div>
          </div>
        </div>
        <div className="MapStats_Heading">Test Result Statistics</div>
        <div className="MapStats_Heading">
          Total Test Reports: {allTesting.testedResultsStatus.receivedResults}
        </div>
        <div className="MapStats_Table">
          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">Test Results</div>
            <div className="MapStats_Row_Heading">Swab Tests</div>
            <div className="MapStats_Row_Heading">Antibody Tests</div>
          </div>
          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">Positive</div>
            <div>
              {Math.floor(
                (allTesting.testResults.swabTest.posResults /
                  allTesting.testedResultsStatus.receivedResults) *
                  100
              )}
              %
            </div>
            <div>
              {Math.floor(
                (allTesting.testResults.antibodyTest.posResults /
                  allTesting.testedResultsStatus.receivedResults) *
                  100
              )}
              %
            </div>
          </div>
          <div className="MapStats_Col">
            <div className="MapState_Col_Heading">Negative</div>
            <div>
              {Math.floor(
                (allTesting.testResults.swabTest.negResults /
                  allTesting.testedResultsStatus.receivedResults) *
                  100
              )}
              %
            </div>
            <div>
              {Math.floor(
                (allTesting.testResults.antibodyTest.negResults /
                  allTesting.testedResultsStatus.receivedResults) *
                  100
              )}
              %
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapTableShortages;
