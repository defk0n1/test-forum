import { useRef } from 'react' 
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Schedule from './Schedule.jsx';


gsap.registerPlugin(useGSAP);


const isMobile = window.innerWidth < 768

const LandingBody = ({camPosition}) => {
    


    const titleStyling = {
        color:"#F9E4BC",
        margin:"0",
        position:"relative",
        top:"10vh"

    }

    const subStyling = {
        color:"#FFFFFF",
        margin:"0",
        

    }
    

    const landingContent = [
        {sponsor:false,title:"void",venue:false},
        {sponsor:false,content:"SecOps, unites IT security and operations teams to protect and manage an organization's digital assets. Its goal is to reduce cyber risks and minimize the impact of security incidents. SecOps integrates security into all operationalprocesses, such as network monitoring, incident response, threat detection, and vulnerability management. By fostering collaboration between teams, SecOps creates a more secure, efficient, and resilient environment.",title:"SecOps",titleStyle:titleStyling,venue:false} ,  
        {sponsor:false,content:"DevOps combines development (Dev) and operations (Ops), uniting people, processes, and technology to deliver continuous value. It fosters collaboration across traditionally siloed roles like development, IT operations, quality engineering, and security, resulting in faster, more reliable product delivery. This approach helps teams better meet customer needs, build confidence in their applications, and accelerate business outcomes.",title:"DevOps",titleStyle:titleStyling,venue:false},
        {sponsor:false,content:"Combines machine learning principles and operations practices to automate the entire lifecycle of machine learning models, from development to deployment and continuous monitoring and updates. This ensures reliability and quick updates or fixes, helping IT teams work together efficiently and enhancing the overall effectiveness of the machine learning process.",title:"MLOps",titleStyle:titleStyling,venue:false},
        {sponsor:false,title:"void",venue:false, video:true},
        {sponsor:false,title:"void",venue:false},
        {sponsor:true,content:"",title:"Blue Diamond Sponsor",titleStyle:{
            color:"#62EFFE",
            WebkitBackgroundClip: 'text',
            filter: "drop-shadow(-10px 1px 20px #FFFFFF)", 
            textShadow: "1px 1px 7px #62EFFE",
            textAlign:"center",
            position:"relative",
            top:"10vh",
            width: isMobile ? "100vw"   : "70vw",
            fontFamily:"Overpass"

          },venue:false}, 
        {sponsor:true,content:"",title:"Red Diamond Sponsors",titleStyle:{
            color:"#FF0000",
            // WebkitBackgroundClip: 'text',
            filter: "drop-shadow(-10px 1px 20px rgba(255, 0, 0, 0.5))", 
            textShadow: "1px 1px 20px rgba(255, 0, 0, 0.9)",
            textAlign:"center",
            position:"relative",
            top:"10vh",
            width: isMobile ? "100vw"   : "70vw",
            fontFamily:"Overpass"



           

          },venue:false},
        {sponsor:true,content:"",title:"Gold Sponsors",titleStyle:{
            color:"gold",
            WebkitBackgroundClip: 'text',
            filter: "drop-shadow(10px 1px 20px gold)", 
            textShadow: "1px 1px 2px gold",
            position:"relative",
            top:"10vh",
            textAlign:"center",
            width: isMobile ? "100vw"   : "70vw",
            fontFamily:"Overpass"



           

          },venue:false},
        {sponsor:true,content:"",title:"Silver Sponsors",titleStyle:{
            color:"silver",
            WebkitBackgroundClip: 'text',
            filter: "drop-shadow(-10px 1px 20px silver)", 
            textShadow: "1px 1px 2px silver",
            position:"relative",
            top:"10vh",

            textAlign:"center",
            width: isMobile ? "100vw"   : "70vw",
            fontFamily:"Overpass"



          },venue:false},
          {sponsor:true,content:"",title:"Keynote Speakers",titleStyle:{
            color:"#62EFFE",
            WebkitBackgroundClip: 'text',
            filter: "drop-shadow(-10px 1px 20px #FFFFFF)", 
            textShadow: "1px 1px 7px #62EFFE",
            textAlign:"center",
            position:"relative",
            top:"10vh",
            width: isMobile ? "100vw"   : "70vw",
            fontFamily:"Overpass"



          },venue:false}   , 
          {sponsor:true,content:"",title:"Workshop Mentors",titleStyle:{
            color:"#62EFFE",
            WebkitBackgroundClip: 'text',
            filter: "drop-shadow(-10px 1px 20px #FFFFFF)", 
            textShadow: "1px 1px 7px #62EFFE",
            textAlign:"center",
            position:"relative",
            top:"10vh",
            width: isMobile ? "100vw"   : "70vw",
            fontFamily:"Overpass"



          },venue:false} ,
          {sponsor:false,title:"void",venue:false,schedule:true},
          {sponsor:false,venue:true,title:"void"},





    
]

    const currentContent = landingContent[camPosition]
    const bodyStyling = !isMobile ? {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        textAlign:"center",
        color:"white" ,
        height:"100vh",
        width:"40vw",
        // paddingTop:"10vh",
        // paddingBottom:"10vh",
        paddingLeft:"15vw",
        paddingRight:"15vw",
        fontFamily: "Overpass",
        fontSize:"1em"
    
    } :
    {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        textAlign:"center",
        color:"white" ,
        height:"80vh",
        width:"80vw",
        paddingTop:"10vh",
        paddingBottom:"10vh",
        paddingLeft:"10vw",
        paddingRight:"10vw",
        fontFamily: "Overpass",
        fontSize:"1em"
    
    } 


   
    const TitleRef = useRef();
    const SubRef = useRef();


    useGSAP(()=>{
        if(currentContent.schedule || currentContent.video){return;}
        gsap.from([TitleRef.current, SubRef.current], 
        {opacity: 0, stagger: 0.01})
    },[currentContent])


    if(currentContent.video){
        if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
        return(
            <video playsInline width="80%" height="60%" crossOrigin="anonymous" loop muted controls style={{zIndex:"10000"}}>
                <source src="Teaser.mp4" type='video/mp4'/>
                 Your browser does not support the video tag.
            </video>
            
        )
    }
    else return null

    }

    // console.log(currentContent)
   
    if(currentContent.schedule){
        return(
<Schedule/>
)
        }

    if(currentContent.sponsor){
        return(
        <h1 style={currentContent.titleStyle} ref={TitleRef}>
            {currentContent.title}
        </h1>
        )
    }


    else if(currentContent.venue){
    return(
        <section id="venue" className="section container scroll-section">
        <div className="row">
        <h1 ref={TitleRef} >Venue</h1>
        <div ref={SubRef} className="localisation-info col-sm-6 col-md-6 text-center p-3">
                <div className='p-md-3'>
                    <h4>HIGHER SCHOOL OF COMMUNICATION OF TUNIS, Ariana</h4>
                    <p>
                        Sup'Com is a leading college for telecommunications engineers in
                        Tunisia. Affiliated to the University of Carthage, the Higher School
                        of Communications of Tunis (Sup'Com) is among the top-ranked schools
                        in Tunisia in the national admission exam for engineering schools.
                        Over and above its national and international reputation, Sup'Com is
                        known for the excellence of its academic training and the high
                        competence level of its graduates and researchers.
                    </p>
                </div>
            </div>
            <div className="col-md-6 col-sm-6 p-0 d-flex align-items-center">
                <iframe src="https://maps.google.com/maps?q=supcom&t=&z=17&ie=UTF8&iwloc=&output=embed" height="100%"
                    width="100%"></iframe>

            </div>

        </div>

    </section>

    )
  }
  else return (
    <div style={bodyStyling}>
        <div style={{margin:0}}>
            <h1 style={currentContent.titleStyle} ref={TitleRef}>
                {currentContent.title == "void" ? "" : currentContent.title}
            </h1>
        </div>
       <div style={currentContent.title == "void" ? {display:"none"} : {}}>
            <p style={subStyling} ref={SubRef}>
            {currentContent.title == "void" ? "" : currentContent.content}           
            </p>
       </div>
        
    </div>
  )
}

export default LandingBody