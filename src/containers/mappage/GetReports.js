import React, {useState, useEffect } from 'react'

export default function GetReports() {
  
  const [reportData, setReportData] = useState(null);

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
  
  console.log(reportData); 

  if(reportData === null){
    return(
      <p>loading</p>
    )
  }else{
    return(
     <p>{reportData[0].district}</p>
    )
  }
}
