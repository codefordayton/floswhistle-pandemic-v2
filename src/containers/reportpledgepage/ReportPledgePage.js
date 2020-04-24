import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Select, Button, MenuItem } from "@material-ui/core";
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
                as={Select}
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
                <MenuItem value="cna">Licensed Practice Nurse</MenuItem>
                <MenuItem value="paramedic">Paramedic</MenuItem>
                <MenuItem value="physician">Physician</MenuItem>
                <MenuItem value="pa">Physician's Assistant</MenuItem>
                <MenuItem value="rn">Registered Nurse</MenuItem>
                <MenuItem value="rt">Respiratory Therapist</MenuItem>
              </Field>
              {touched.reporter_type && errors.reporter_type ? (
                <div className="form_error_message">{errors.reporter_type}</div>
              ) : null}
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
              <Button
                disabled={isSumbitting}
                type="submit"
                className="shared_button"
              >
                AGREE <br /> proceed to <br /> reporting
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(ReportPledgePage);
