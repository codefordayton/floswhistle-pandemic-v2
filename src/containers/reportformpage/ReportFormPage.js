import React, { Component } from "react";
import { Formik, Form, Field, useField } from "formik";
import { withRouter } from "react-router-dom";
import moment from "moment";
import * as Yup from "yup";
import {
  Select,
  Button,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import "./ReportFormPage.css";

// utility
const getDate = (date) => moment(`${date}`, "MM/DD/YYYY").unix();

const formatBody = ({ reported_date, ...rest }) => ({
  ...rest,
  reported_date: getDate(reported_date),
});

// const API_ENDPOINT = 'https://api.floswhistle.com/v1/report'

// custom form components
const MyCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const validationSchema = Yup.object().shape({
  facility_type: Yup.string().required("*Clinical Setting is required*"),
  zip: Yup.string().required("*Zip Code is required*"),
  reported_date: Yup.string().required("*Date is required*"),
  willing_to_report: Yup.string()
    .nullable()
    .required("*Anonymity Preference is required*"),
});

class ReportFormPage extends Component {
  async handleReportData(data) {
    const body = JSON.stringify(formatBody(data));
    // fetch(API_ENDPOINT, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body
    // }).then(response => {
    //   window.location = '/thanks';
    // });
    await console.log(body);
  }
  render() {
    const { history } = this.props;
    const { reporter_type } = this.props.location.state;

    let today = moment().format("MM/DD/YYYY");
    let yesterday = moment().subtract(1, "day").format("MM/DD/YYYY");
    let twodaysago = moment().subtract(2, "day").format("MM/DD/YYYY");

    return (
      <div className="ReportFormPage">
        <h2 className="shared_header">Report</h2>
        <h4 className="shared_header">
          You can only file one report in a 24 hour period.
        </h4>
        <Formik
          initialValues={{
            reporter_type,
            facility_type: "",
            zip: "",
            reported_date: "",
            surgical_masks: false,
            n95_masks: false,
            papr_hoods: false,
            non_sterile_gloves: false,
            isolation_gowns: false,
            face_shields: false,
            oxygen: false,
            sedatives: false,
            narcotic_analgesics: false,
            paralytics: false,
            icu_beds: false,
            icu_trained_nurses: false,
            ventilators: false,
            no_shortages: false,
            test_none: false,
            test_tried: false,
            test_no_result: false,
            test_swab_neg: false,
            test_swab_pos: false,
            test_anti_neg: false,
            test_anti_pos: false,
            willing_to_report: null,
            comment: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            this.handleReportData(data).then(() => {
              resetForm();
              setSubmitting(false);
              history.push("/thanks");
            });
          }}
        >
          {({ values, isSumbitting, touched, errors, handleChange }) => (
            <Form className="form_container">
              <h4 className="shared_header">Clinical Setting</h4>
              <Field as={Select} name="facility_type" type="select">
                <MenuItem value="hospital">Hospital</MenuItem>
                <MenuItem value="long_term_care">
                  Nursing Home/LTAC/LCTH
                </MenuItem>
              </Field>
              {touched.facility_type && errors.facility_type ? (
                <div style={{ color: "#FF6565" }}>{errors.facility_type}</div>
              ) : null}
              <h4 className="shared_header">Facility/Base Station Zip Code</h4>
              <Field as={TextField} name="zip" type="text"></Field>
              {touched.zip && errors.zip ? (
                <div style={{ color: "#FF6565" }}>{errors.zip}</div>
              ) : null}
              <h4 className="shared_header">Date</h4>
              <Field as={Select} name="reported_date" type="select">
                <MenuItem value={today}>{today}</MenuItem>
                <MenuItem value={yesterday}>{yesterday}</MenuItem>
                <MenuItem value={twodaysago}>{twodaysago}</MenuItem>
              </Field>
              {touched.reported_date && errors.reported_date ? (
                <div style={{ color: "#FF6565" }}>{errors.reported_date}</div>
              ) : null}
              <h4 className="shared_header">
                Today I experienced shortages of these resources needed for
                COVID-19 patients
              </h4>
              <h5>PPE</h5>
              {[
                { id: "surgical_masks", name: "Surgical Masks" },
                { id: "n95_masks", name: "N95 Masks" },
                { id: "papr_hoods", name: "PAPR Hoods" },
                { id: "non_sterile_gloves", name: "Non-Sterile Gloves" },
                { id: "isolation_gowns", name: "Isolation Gowns" },
                { id: "face_shields", name: "Face Shields" },
              ].map((item) => {
                return (
                  <MyCheckbox
                    key={item.id}
                    name={item.id}
                    type="checkbox"
                    label={item.name}
                  />
                );
              })}
              <h5>Medications</h5>
              {[
                { id: "oxygen", name: "Oxygen" },
                { id: "sedatives", name: "Sedatives" },
                { id: "narcotic_analgesics", name: "Narcotic Analgesics" },
                { id: "paralytics", name: "Paralytics" },
              ].map((item) => {
                return (
                  <MyCheckbox
                    key={item.id}
                    name={item.id}
                    type="checkbox"
                    label={item.name}
                  />
                );
              })}
              <h5>Other</h5>
              <MyCheckbox name="icu_beds" type="checkbox" label="ICU beds" />
              <MyCheckbox
                name="icu_trained_nurses"
                type="checkbox"
                label="Adequate Staffing"
              />
              <MyCheckbox
                name="ventilators"
                type="checkbox"
                label="Ventilators"
              />
              <MyCheckbox
                name="no_shortages"
                type="checkbox"
                label="NO SHORTAGES"
              />
              <h4 className="shared_header">
                My current status re COVID lab tests
              </h4>
              {[
                { id: "test_none", name: "I've not sought testing" },
                { id: "test_tried", name: "Tried but couldn't get tested" },
                { id: "test_no_result", name: "Tested - no result yet" },
                { id: "test_swab_neg", name: "Swab test - NEG" },
                { id: "test_swab_pos", name: "Swab test - POS" },
                { id: "test_anti_neg", name: "Antibody test - NEG" },
                { id: "test_anti_pos", name: "Antibody test - POS" },
              ].map((item) => {
                return (
                  <MyCheckbox
                    key={item.id}
                    name={item.id}
                    type="checkbox"
                    label={item.name}
                  />
                );
              })}
              {touched.testing && errors.testing ? (
                <div style={{ color: "#FF6565" }}>{errors.testing}</div>
              ) : null}
              <h4 className="shared_header">
                Reports from anonymous sources are less credible than those from
                known sources. Would you ever be willing to verify your identity
                to this project, via your professional credential, in order for
                your anonymous contributions to be attributed to a “verified
                source?”
              </h4>
              <MyRadio
                name="willing_to_report"
                type="radio"
                value="1"
                label="Yes - I’d do it now if given the opportunity"
              />
              <MyRadio
                name="willing_to_report"
                type="radio"
                value="2"
                label="Only if I was confident I could not be traced. I’m concerned about retaliation."
              />
              <MyRadio
                name="willing_to_report"
                type="radio"
                value="3"
                label="No - I’ll never be confident enough that I can’t be traced or feel certain I’m free from possible retaliation."
              />
              {touched.willing_to_report && errors.willing_to_report ? (
                <div style={{ color: "#FF6565" }}>
                  {errors.willing_to_report}
                </div>
              ) : null}
              <h4 className="shared_header">Comments</h4>
              <Field
                as={TextField}
                name="comment"
                type="text"
                className="ReportFormPage_Comments"
              />

              <Button
                disabled={isSumbitting}
                type="submit"
                className="form_button"
              >
                SUBMIT <br /> REPORT
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(ReportFormPage);
