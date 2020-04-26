import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'

import Dashboard from './Dashboard'

//STYLING 
const DashboardWrapper = styled.div`
margin: 0 auto;
`
const SelectionWrapper = styled.div`
display: flex;
flex: 1;
flex-direction: column;
`
const SelectionHeader = styled.div`
padding: 5px;
text-align: center;
`

const ReportSelect = styled.select`
width: 75%;
margin: 0 auto;
border: solid thin black;
margin-top: 10px;
margin-bottom: 10px;
`

const ReportSelectOption = styled.option`
padding: 2px;
`

const SubmitButton=styled.button`
padding: 5px;
max-width: 25%;
margin: 0 auto;
`

export default function MapSelect() {

  //HOOKS
  const [reportData, setReportData] = useState(null);
  const [reportSelection, setReportSelection] = useState(0); 
  const selectRef = useRef(null);

  //Returns all available report data to be parsed as needed
  useEffect(() => {
    fetch(`https://api.floswhistle.com/v1/reports`,
    {
      method: "GET"
    }
  ).then(res => res.json())
    .then(response =>{
      setReportData(response);
    })
    .catch(error => console.log(error));
  },[]);
  
  //DATA PARSING METHODS - All functions related to parsing the data needed by the different components
 
  const getReportDates = (reportData) =>{

    let reportDates = reportData.map( (report) =>{
        return report.reported_date;
      })
    
      return [...new Set(reportDates)];
  }

  const getReportsByDate = (reportData) =>{

    let reportDates = getReportDates(reportData);

    let datesArr = reportDates.map( (report, index) =>{
      return(
          {reportDate: report, numberOfReports : 0}
        )
      })

    reportData.map((report) =>{
        return(datesArr.map(( dateObject ) => {
          if(report.reported_date === dateObject.reportDate){
            dateObject.numberOfReports = dateObject.numberOfReports + 1;
          }
        })
      )}
    )
    return(datesArr);
  }
    
    

    
  

  //BUTTON METHODS
    let handleSubmit = () =>{ 
    setReportSelection(selectRef.current.value)
  }

  let handleBack = () =>{
    setReportSelection(0);
  }

  if(reportData === null){
    return(
      <p>Loading</p>
    )
  }
  else if(reportSelection === 0 && reportData != null){
    return(
      <SelectionWrapper>
        <SelectionHeader>
        <i>Please select a report type.</i>
        </SelectionHeader>
        <ReportSelect id='ReportSelect' ref={selectRef}>
          <ReportSelectOption value='1'>Shortages</ReportSelectOption>
          <ReportSelectOption value='2'>Testing</ReportSelectOption>
        </ReportSelect>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </SelectionWrapper>
    )
  }else{
    return ( //Will pass the data to the Dashboard component  
      <DashboardWrapper>
        <Dashboard reportRequest={reportSelection} handleBack={handleBack} data={[{numberOfReports: reportData.length}, {reportsByDate : getReportsByDate(reportData)}]} /> 
      </DashboardWrapper>
    )
  }
}