import React from 'react'
import styled from 'styled-components'

import DistrictsMap from './DistrictsMap'
import MapHeading from './MapHeading'
import Tally from './Tally'

const DashBoardWrapper = styled.div`
display: flex;
flex-direction: column;
`
const HeadingWrapper = styled.div``

const MapWrapper = styled.div``

const BackButtonWrapper = styled.div`
text-align: center;
`
export default function Dashboard(props) {
  
  const {reportRequest, handleBack} = props; //Will also include data from API request @index.js

  const headingText = [{
                        heading: 'Shortages', 
                        sub: 'Percentage of respondents who reported any kind of shortage.'
                      },
                      {
                        heading: 'Testing',
                        sub: 'Percentage of respondents who reported access to testing.'
                      }
                    ]


  return (
    <React.Fragment>
    <DashBoardWrapper>
      <HeadingWrapper>
        <MapHeading headingText={headingText[reportRequest - 1]}/>
      </HeadingWrapper>
      <Tally />
      <MapWrapper>
        <DistrictsMap />{/* Pass map data to DistrictMap component */}
      </MapWrapper>
    </DashBoardWrapper>
    <BackButtonWrapper>
      <button onClick={handleBack}>Back</button>
    </BackButtonWrapper>
    </React.Fragment>
  )
}