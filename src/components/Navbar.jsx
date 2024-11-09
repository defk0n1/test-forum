import React from 'react'
import { useRef , useState} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation } from 'react-router-dom';


// gsap.registerPlugin(useGSAP);


const isMobile = window.innerWidth < 768

const Navbar = ({camchanger}) => {
   
    const navRef = useRef();
    // useGSAP(() => {
    //     if(location.pathname=="/schedule"){
    //       return
    //     }
    //      gsap.from(navRef.current, {
    //        opacity: 0
    //      },"+3");
       
    //    });


       const [menuOpen,setMenuOpen] = useState(false);

       const handleHamburgerClick = () => {
        if(!isMobile){
          return;

        }
        setMenuOpen(!menuOpen);
      }

    
    
   
   

      
  return (
    <div ref={navRef} style={{position:"fixed" , height:"10vh" , width:"100vw" , zIndex:"1000", top:"0"
    }}>
      <div className='nav-wrapper'>
      <div className={menuOpen ? "nav-els-wrapper-mobile":"nav-els-wrapper"}>      
        <Link to={"/"} style={{textDecoration:"none" , color:"white",fontWeight:"800",fontSize: "0.99em"}}><div onClick={()=>{camchanger(0); handleHamburgerClick();}} className={menuOpen ? "nav-element-mobile":"nav-element"} >HOME</div></Link>
        <div onClick={()=>{camchanger(10); handleHamburgerClick();}} className={menuOpen ? "nav-element-mobile":"nav-element"} >SPEAKERS</div>
        <Link to={"/"} style={{textDecoration:"none" , color:"white",fontWeight:"800",fontSize: "0.99em"}}><div onClick={()=>{camchanger(12); handleHamburgerClick();}} className={menuOpen ? "nav-element-mobile":"nav-element"}>SCHEDULE</div></Link>
        <img className={menuOpen ? "nav-logo-mobile":"nav-logo"} src="brand.png"></img>
        <Link to={"/"} style={{textDecoration:"none" , color:"white",fontWeight:"800",fontSize: "0.99em"}}><div onClick={()=>{camchanger(13); handleHamburgerClick();}} className={menuOpen ? "nav-element-mobile":"nav-element"}>VENUE</div></Link>
        <div onClick={()=>{camchanger(6); handleHamburgerClick();}} className={menuOpen ? "nav-element-mobile":"nav-element"} >SPONSORS</div>
        <div onClick={()=>{camchanger(5); handleHamburgerClick();}} className={menuOpen ? "nav-element-mobile":"nav-element"} >GALLERY</div>
      </div>
      <div href="#" onClick={()=>{handleHamburgerClick()}} className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
      </div>


      </div>
   </div>



  )
}

export default Navbar