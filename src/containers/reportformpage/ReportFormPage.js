import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import { MenuItem } from "@material-ui/core";
import { StyledButton } from "../../components/button/StyledButton";
import { StyledSelect } from "../../components/select/StyledSelect";
import { StyledTextField } from "../../components/textinput/StyledTextField";
import { MyRadioGroup } from "../../components/radiogroup/RadioGroup";
import { MyCheckboxGroup } from "../../components/checkboxgroup/MyCheckboxGroup";
import { today, yesterday, twodaysago } from "../../assets/utils/dates";
import { formatBody, formatData } from "../../assets/utils/formatFormData";
import "./ReportFormPage.css";

// const API_ENDPOINT = 'https://api.floswhistle.com/v1/report'

// need to redo conditional validation.
// TestResults required
// if testResults === test_result
// one of swab or one of anti must be selected

const validationSchema = Yup.object().shape({
  facility_type: Yup.string().required("*Clinical Setting is required*"),
  zip: Yup.string()
    .matches(/^[0-9]{5}$/, "*Must be exactly 5 digits*")
    .required("*Zip Code is required*"),
  reported_date: Yup.string().required("*Date is required*"),
  willing_to_report: Yup.string()
    .nullable()
    .required("*Anonymity Preference is required*"),
  testStatus: Yup.string().required("*Current testing status required*"),
  resultsSwab: Yup.string()
    .nullable()
    .test("test-result-swab", "*Test 1 result is required*", function (value) {
      if (this.parent.testStatus === "test_result") {
        return this.parent.resultsSwab || this.parent.resultsAnti;
      }
    }),
  resultsAnti: Yup.string()
    .nullable()
    .test("test-result-anti", "*Test 2 result is required*", function (value) {
      if (this.parent.testStatus === "test_result") {
        return this.parent.resultsSwab || this.parent.resultsAnti;
      }
    }),
});

class ReportFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reporter_type: null,
      facilityField: "none",
      dateField: "none",
    };
  }
  componentDidMount() {
    const { history } = this.props;
    if (this.props.location.state === undefined) {
      history.push("/pledge");
    } else {
      const { reporter_type } = this.props.location.state;
      this.setState({
        reporter_type,
      });
    }
  }
  componentWillUnmount() {
    this.setState({
      reporter_type: null,
    });
  }
  handleFacilityChange(e) {
    this.setState({
      facilityField: e.target.value,
    });
  }
  handleDateChange(e) {
    this.setState({
      dateField: e.target.value,
    });
  }
  async handleReportData(data) {
    const newData = formatData(data);
    const body = JSON.stringify(formatBody(newData));

    // await fetch(API_ENDPOINT, {
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
    let { reporter_type, facilityField, dateField } = this.state;

    return (
      <div className="ReportFormPage">
        <div>
          <h2 className="shared_header">Report</h2>
          <h3 className="shared_header">
            You can only file one report in a 24 hour period.
          </h3>
        </div>
        <Formik
          initialValues={{
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
            testStatus: "",
            resultsSwab: null,
            resultsAnti: null,
            willing_to_report: null,
            comment: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            this.handleReportData({ reporter_type, ...data }).then(() => {
              resetForm();
              setSubmitting(false);
              history.push("/thanks");
            });
          }}
        >
          {({ values, isSumbitting, touched, errors, handleChange }) => (
            <Form className="form_container">
              <h3 className="shared_header">Clinical Setting</h3>
              <Field
                as={StyledSelect}
                disableUnderline={true}
                name="facility_type"
                type="select"
                value={facilityField}
                onChange={(e) => {
                  this.handleFacilityChange(e);
                  handleChange(e);
                }}
              >
                <MenuItem value="none" disabled>
                  Select option...
                </MenuItem>
                <MenuItem value="hospital">Hospital</MenuItem>
                <MenuItem value="pre_hospital">Pre-Hospital</MenuItem>
                <MenuItem value="nursing_home">Nursing Home/LTAC/LCTH</MenuItem>
                <MenuItem value="er">Free-standing ER</MenuItem>
                <MenuItem value="urgent_care">Urgent Care Clinic</MenuItem>
              </Field>
              {touched.facility_type && errors.facility_type ? (
                <div className="form_error_message">{errors.facility_type}</div>
              ) : (
                <div className="form_error_message"></div>
              )}
              <h3 className="shared_header">Facility/Base Station Zip Code</h3>
              <Field
                as={StyledTextField}
                value={values.zip}
                name="zip"
                type="text"
                InputProps={{ disableUnderline: true }}
              ></Field>
              {touched.zip && errors.zip ? (
                <div className="form_error_message">{errors.zip}</div>
              ) : (
                <div className="form_error_message"></div>
              )}
              <h3 className="shared_header">Date</h3>
              <Field
                as={StyledSelect}
                disableUnderline={true}
                name="reported_date"
                type="select"
                value={dateField}
                onChange={(e) => {
                  this.handleDateChange(e);
                  handleChange(e);
                }}
              >
                <MenuItem value="none" disabled>
                  Select date...
                </MenuItem>
                <MenuItem value={today}>{today}</MenuItem>
                <MenuItem value={yesterday}>{yesterday}</MenuItem>
                <MenuItem value={twodaysago}>{twodaysago}</MenuItem>
              </Field>
              {touched.reported_date && errors.reported_date ? (
                <div className="form_error_message">{errors.reported_date}</div>
              ) : (
                <div className="form_error_message"></div>
              )}
              <h3 className="shared_header ReportFormPage_sectionheader">
                Today I experienced shortages of these resources needed for
                COVID-19 patients
              </h3>
              <MyCheckboxGroup
                legend="PPE"
                options={[
                  { name: "surgical_masks", label: "Surgical Masks" },
                  { name: "n95_masks", label: "N95 Masks" },
                  { name: "papr_hoods", label: "PAPR Hoods" },
                  { name: "non_sterile_gloves", label: "Non-Sterile Gloves" },
                  { name: "isolation_gowns", label: "Isolation Gowns" },
                  { name: "face_shields", label: "Face Shields" },
                ]}
              />
              <MyCheckboxGroup
                legend="Medications"
                options={[
                  { name: "oxygen", label: "Oxygen" },
                  { name: "sedatives", label: "Sedatives" },
                  { name: "narcotic_analgesics", label: "Narcotic Analgesics" },
                  { name: "paralytics", label: "Paralytics" },
                ]}
              />
              <MyCheckboxGroup
                legend="Other"
                options={[
                  { name: "icu_beds", label: "ICU beds" },
                  { name: "icu_trained_nurses", label: "Adequate Staffing" },
                  { name: "ventilators", label: "Ventilators" },
                ]}
              />
              <h3 className="shared_header ReportFormPage_sectionheader">
                My current status re COVID lab tests
              </h3>
              <Field
                as={MyRadioGroup}
                name="testStatus"
                legend="Test Status"
                options={[
                  { label: "I've not sought testing", value: "test_none" },
                  {
                    label: "Tried but couldn't get tested",
                    value: "test_tried",
                  },
                  { label: "Tested - no result yet", value: "test_no_result" },
                  { label: "Tested - received results", value: "test_result" },
                ]}
              />
              {values.testStatus === "test_result" ? (
                <div>
                  <Field
                    as={MyRadioGroup}
                    name="resultsSwab"
                    legend="Swab Results"
                    options={[
                      { label: "Swab test - NEG", value: "test_swab_neg" },
                      { label: "Swab test - POS", value: "test_swab_pos" },
                    ]}
                  />
                  <Field
                    as={MyRadioGroup}
                    name="resultsAnti"
                    legend="Antibody Results"
                    options={[
                      { label: "Antibody test - NEG", value: "test_anti_neg" },
                      { label: "Antibody test - POS", value: "test_anti_pos" },
                    ]}
                  />
                </div>
              ) : null}
              {touched.testStatus && errors.testStatus ? (
                <div className="form_error_message">{errors.testStatus}</div>
              ) : (
                <div className="form_error_message"></div>
              )}
              {touched.resultsSwab && errors.resultsSwab ? (
                <div className="form_error_message">{errors.resultsSwab}</div>
              ) : null}
              {touched.resultsAnti && errors.resultsAnti ? (
                <div className="form_error_message">{errors.resultsAnti}</div>
              ) : null}
              <h3 className="shared_header">
                Reports from anonymous sources are less credible than those from
                known sources. Would you ever be willing to verify your identity
                to this project, via your professional credential, in order for
                your anonymous contributions to be attributed to a “verified
                source?”
              </h3>
              <Field
                as={MyRadioGroup}
                name="willing_to_report"
                options={[
                  {
                    label: "Yes - I’d do it now if given the opportunity",
                    value: "1",
                  },
                  {
                    label:
                      "Only if I was confident I could not be traced. I’m concerned about retaliation.",
                    value: "2",
                  },
                  {
                    label:
                      "No - I’ll never be confident enough that I can’t be traced or feel certain I’m free from possible retaliation.",
                    value: "3",
                  },
                ]}
              />
              {touched.willing_to_report && errors.willing_to_report ? (
                <div className="form_error_message">
                  {errors.willing_to_report}
                </div>
              ) : (
                <div className="form_error_message"></div>
              )}
              <h3 className="shared_header">Comments</h3>
              <Field
                as={StyledTextField}
                name="comment"
                type="text"
                InputProps={{
                  multiline: true,
                  disableUnderline: true,
                }}
              />

              <StyledButton disabled={isSumbitting} type="submit">
                SUBMIT <br /> REPORT
              </StyledButton>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(ReportFormPage);
