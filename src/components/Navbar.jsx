import React, { useEffect } from 'react'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);


const Navbar = () => {
    const navRef = useRef();
    useGSAP(() => {
        
         gsap.from(navRef.current, {
           opacity: 0
         },"+3");
       
       });

    const navWrapper = {
        marginLeft:"5vw",
        marginRight:"5vw",
        width:"90vw",
        display: "flex",
        flexWrap: "inherit",
        alignItems: "center",
        justifyContent: "space-between",
        height:"10vh",
        zIndex:"1000"
        }
    
        const buttonStyle = {
          background: 'linear-gradient(to bottom, #33bdef 5%, #019ad2 100%)',
          backgroundColor: '#62EFFE',
          borderRadius: '16px',
          cursor: 'pointer',
          color: '#ffffff',
          fontWeight: 'bold',
          padding: '10px 20px',
          textDecoration: 'none',
          textShadow: '0px -1px 0px #5b6178',
        };

      
  return (
    <div ref={navRef} style={{position:"fixed" , height:"10vh" , width:"100vw" , zIndex:"10", top:"0"
    }}>
      <div style={navWrapper}>
      <div style={{display:"flex", flexDirection:"row" , width:"100vw" , justifyContent:"space-evenly",color:"#FFFFFF", fontFamily:"Overpass" , fontSize:"0.99em", fontWeight:"800"
}}>
        <div style={{padding:"10px",textShadow: "2px 2px 7px #62EFFE",filter: "drop-shadow(-10px 10px 20px #FFFFFF)"}}>SPEAKERS</div>
        <div style={{padding:"10px",textShadow: "2px 2px 7px #62EFFE",filter: "drop-shadow(-10px 10px 20px #FFFFFF)"}}>SCHEDULE</div>
        <div style={{padding:"10px",textShadow: "2px 2px 7px #62EFFE",filter: "drop-shadow(-10px 10px 20px #FFFFFF)"}}>VENUE</div>
        <img src="brand.png" width="150"></img>

        <div style={{padding:"10px",textShadow: "2px 2px 7px #62EFFE",filter: "drop-shadow(-10px 10px 20px #FFFFFF)"}}>SPONSORS</div>
        <div style={{padding:"10px",textShadow: "2px 2px 7px #62EFFE",filter: "drop-shadow(-10px 10px 20px #FFFFFF)"}}>GALLERY</div>
        <div style={{padding:"10px",textShadow: "2px 2px 7px #62EFFE",filter: "drop-shadow(-10px 10px 20px #FFFFFF)"}}>CONTACT</div>
        {/* <div style={buttonStyle}>REGISTER NOW</div> */}

      </div>


      </div>
   </div>
  )
}

export default Navbar