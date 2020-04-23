import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Select, Button, MenuItem } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "./ReportPledgePage.css";

class ReportPledgePage extends Component {
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
    return (
      <div className="ReportPledgePage">
        <h2 className="shared_header">Attestation: I'm reporting as</h2>
        <h5 className="shared_header">(Select option)</h5>
        <Formik
          initialValues={{
            reporter_type: "rn",
          }}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            this.handlePledgeData(data);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ values, isSumbitting }) => (
            <Form>
              <Field as={Select} name="reporter_type" type="select">
                <MenuItem value="rn">RN</MenuItem>
                <MenuItem value="lpn">LPN</MenuItem>
                <MenuItem value="cna">CPCT/CNA</MenuItem>
              </Field>
              <ul>
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
                className="form_button"
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
