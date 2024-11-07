import React from 'react'
import { useRef , useState} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP);


const Navbar = ({camchanger}) => {
    const navRef = useRef();
    useGSAP(() => {
        
         gsap.from(navRef.current, {
           opacity: 0
         },"+3");
       
       });


       const [menuOpen,setMenuOpen] = useState(false);

       const handleHamburgerClick = () => {
        setMenuOpen(!menuOpen);
      }
    
   
   

      
  return (
    <div ref={navRef} style={{position:"fixed" , height:"10vh" , width:"100vw" , zIndex:"10", top:"0"
    }}>
      <div className='nav-wrapper'>
      <div className={menuOpen ? "nav-els-wrapper-mobile":"nav-els-wrapper"}>      
        <div onClick={()=>camchanger(0)} className={menuOpen ? "nav-element-mobile":"nav-element"} >HOME</div>
        <div onClick={()=>camchanger(10)} className={menuOpen ? "nav-element-mobile":"nav-element"} >SPEAKERS</div>
        <div className={menuOpen ? "nav-element-mobile":"nav-element"}>SCHEDULE</div>
        <img className={menuOpen ? "nav-logo-mobile":"nav-logo"} src="brand.png"></img>
        <div className={menuOpen ? "nav-element-mobile":"nav-element"}>VENUE</div>
        <div onClick={()=>camchanger(6)} className={menuOpen ? "nav-element-mobile":"nav-element"} >SPONSORS</div>
        <div onClick={()=>camchanger(5)} className={menuOpen ? "nav-element-mobile":"nav-element"} >GALLERY</div>
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