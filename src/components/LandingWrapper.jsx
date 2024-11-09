import React from 'react'


const isMobile = innerWidth < 768



const venueStyle = {display: "flex",
  flexDirection: "column",
  justifyContent: "center"}

const LandingWrapper = ({children , camPosition}) => {
  return (
    <div style={{position:"absolute" ,boxSizing:camPosition==13? "border-box":"", height:camPosition >=6 && camPosition<=9 ?"fit-content":"100vh" , width:camPosition == 13 ? "100vw":"70vw", zIndex:"9", top:"0",paddingLeft: !isMobile ? "15vw" : "unset", paddingRight:!isMobile ? "15vw" : "unset",display: camPosition == 0 || camPosition == 4 || camPosition == 5 ? "none":camPosition==13?"flex":"", flexDirection:camPosition==13? "column":"",
  justifyContent:camPosition==13 ? "center":""}}>
        {children}
  </div>

  )
}

export default LandingWrapper