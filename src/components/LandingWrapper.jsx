import React from 'react'


const isMobile = innerWidth < 768

const LandingWrapper = ({children , camPosition}) => {
  return (
    <div style={{position:"absolute" , height:camPosition >=6 && camPosition<=9 ?"fit-content":"100vh" , width:"70vw", zIndex:"9", top:"0",paddingLeft: !isMobile ? "15vw" : "unset", paddingRight:!isMobile ? "15vw" : "unset",display: camPosition == 0 || camPosition == 4 || camPosition == 5 ? "none":""}}>
        {children}
  </div>

  )
}

export default LandingWrapper