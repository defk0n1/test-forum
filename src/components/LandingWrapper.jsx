import React from 'react'

const LandingWrapper = ({children , camPosition}) => {
  return (
    <div style={{position:"absolute" , height:"100vh" , width:"70vw" , zIndex:"9", top:"0",paddingLeft:"15vw", paddingRight:"15vw",display:camPosition >= 4 && camPosition < 9 ? "none" :""}}>
        {children}
  </div>

  )
}

export default LandingWrapper