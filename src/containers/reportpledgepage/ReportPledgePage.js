import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { MenuItem } from "@material-ui/core";
import { StyledSelect } from "../../components/select/StyledSelect";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import "./ReportPledgePage.css";

const validationSchema = Yup.object().shape({
  reporter_type: Yup.string().required("*Attestation is required*"),
});

class ReportPledgePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reporterField: "none",
    };
  }
  handleFieldChange(e) {
    this.setState({
      reporterField: e.target.value,
    });
  }
  handlePledgeData(data) {
    const { history } = this.props;
    const { reporter_type } = data;
    history.push({
      pathname: "/report",
      state: {
        reporter_type,
      },
    });
  }
  render() {
    const { reporterField } = this.state;
    return (
      <div className="ReportPledgePage">
        <h2 className="shared_header">
          Attestation: I'm reporting as
          <br />
          (Select option)
        </h2>
        <Formik
          initialValues={{
            reporter_type: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            this.handlePledgeData(data);
          }}
        >
          {({ isSumbitting, touched, errors, handleChange }) => (
            <Form>
              <Field
                as={StyledSelect}
                disableUnderline={true}
                name="reporter_type"
                type="select"
                value={reporterField}
                onChange={(e) => {
                  this.handleFieldChange(e);
                  handleChange(e);
                }}
                style={{ marginTop: "1em" }}
              >
                <MenuItem value="none" disabled>
                  Select option...
                </MenuItem>
                <MenuItem value="apn">Advanced Practice Nurse</MenuItem>
                <MenuItem value="cna">Certified Pt Care Tech/CNA</MenuItem>
                <MenuItem value="emt">Emergency Medical Technician</MenuItem>
                <MenuItem value="lpn">Licensed Practice Nurse</MenuItem>
                <MenuItem value="paramedic">Paramedic</MenuItem>
                <MenuItem value="physician">Physician</MenuItem>
                <MenuItem value="pa">Physician Assistant</MenuItem>
                <MenuItem value="rn">Registered Nurse</MenuItem>
                <MenuItem value="rt">Respiratory Therapist</MenuItem>
              </Field>
              {touched.reporter_type && errors.reporter_type ? (
                <div className="form_error_message">{errors.reporter_type}</div>
              ) : (
                <div className="form_error_message"></div>
              )}
              <ul>
                <p>
                  By agreeing to this statement and submitting information to
                  Flo's Whistle: Pandemic, I swear that I ...
                </p>
                <li>
                  am a state licensed/certified patient care provider as
                  indicated above
                </li>
                <li>
                  am currently working in my professional capacity in the
                  setting I'm reporting about
                </li>
                <li>
                  was present in that setting on the date for which I am
                  reporting
                </li>
                <li>
                  have first hand knowledge about all the conditions I describe
                </li>
              </ul>
              <button
                type="submit"
                disabled={isSumbitting}
                className="UtilButton"
              >
                AGREE proceed to reporting
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(ReportPledgePage);
