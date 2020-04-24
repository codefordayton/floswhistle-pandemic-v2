import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Select, Button, MenuItem } from "@material-ui/core";

class ReportPledgeForm extends Component {
  handlePledgeData(data) {
    console.log(data);
    this.props.handlePledgeData(data);
  }
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            reporter_type: "rn",
          }}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log(data);
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
              <Button disabled={isSumbitting} type="submit">
                AGREE proceed to reporting
              </Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default ReportPledgeForm;
