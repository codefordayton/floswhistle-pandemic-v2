import React, {useState, useRef} from 'react'
import styled from 'styled-components'

import Dashboard from './Dashboard'

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

  //My idea is to hit the API with useEffect to query the data for populating the map. 
  
  const [reportSelection, setReportSelection] = useState(1); 
  
  const selectRef = useRef(null); 

  let handleSubmit = () =>{ 
    setReportSelection(selectRef.current.value)
  }

  let handleBack = () =>{
    setReportSelection(0);
  }
 
  if(reportSelection === 0){
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
        <Dashboard reportRequest={reportSelection} handleBack={handleBack}/> 
      </DashboardWrapper>
    )
  }
}