import React, {useState, useRef} from 'react'
import styled from 'styled-components'

// const reportData = [{reportDate: '01/01/2020', reports: 150}, {reportDate: '01/02/2020', reports: 100}, {reportDate: '01/03/2020', reports: 200}];

// const reportsArray = reportData.map(reportObject =>{
//   return reportObject.reports
// })

// const addReports = (total, currentVal) =>{
//   return total + currentVal;
// }
// const reportsTotal = reportsArray.reduce(addReports);

//STYLING 
const TallyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  border-radius: 5px;
  border: solid thin black;
  max-width: 25%;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
const ReportDateWrapper = styled.div`
  padding: 5px;
`
const HeadingWrapper = styled.div`
  padding: 5px;
  display: inline-flex;
  flex-direction: column;
`
const ReportText = styled.p`
  border: solid thin black;
  display: inline;
  padding: 5px;
`
export default function Tally(props) {
  
  const {numberOfReports, reportsByDate} = props;

  function compare(a,b){
    const dateA = new Date(a.reportDate);
    const dateB = new Date(b.reportDate);

    let comparison = 0;

    if(dateA > dateB){
      comparison = 1;
    }else if (dateA < dateB){
      comparison = -1;
    }
    return comparison;
  }

  const sortedReports = reportsByDate.sort(compare);
  
  console.log(sortedReports);
  const sliderRef = useRef(0);
  const [requestedReport, setRequestedReport] = useState(0);

  
  return (
    <TallyWrapper>
      <h3><u>Map Info</u></h3>
      <ReportDateWrapper>
        <HeadingWrapper> 
          <u>Date</u> <ReportText>{reportsByDate[requestedReport].reportDate}</ReportText>
        </HeadingWrapper>
        <HeadingWrapper> 
          <u>Reports by Date</u> <ReportText>{reportsByDate[requestedReport].numberOfReports}</ReportText>
        </HeadingWrapper>
        <HeadingWrapper> 
          <u>Reports Total</u> <ReportText>{numberOfReports}</ReportText>
        </HeadingWrapper>
      </ReportDateWrapper>
      <input type="range" min="0" max={reportsByDate.length - 1} defaultValue="0" ref={sliderRef} onClick={() => setRequestedReport(sliderRef.current.value)} />
    </TallyWrapper>
  )
}
