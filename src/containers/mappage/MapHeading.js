import React from 'react'
import styled from 'styled-components'

const MapHeadingWrapper = styled.div`
display: flex;
flex-direction: column;
flex: 1;
`
const SubHeading = styled.h4`
margin-bottom: 5px;
`

export default function MapHeading({headingText}) {
  
  const {heading, sub} = headingText;
  
  return (
    <MapHeadingWrapper>
      <h1>{heading}</h1>
      <SubHeading><i>{sub}</i></SubHeading>
    </MapHeadingWrapper>
  )
}
