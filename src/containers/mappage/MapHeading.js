import React from 'react'
import styled from 'styled-components'

const MapHeadingWrapper = styled.div`
/* background-color: lightgreen; */
display: flex;
flex-direction: column;
flex: 1;
`

export default function MapHeading({headingText}) {
  
  const {heading, sub} = headingText;
  
  return (
    <MapHeadingWrapper>
      <h1>{heading}</h1>
      {sub}
    </MapHeadingWrapper>
  )
}
