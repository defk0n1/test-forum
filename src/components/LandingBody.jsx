import { useEffect, useRef } from 'react' 
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LandingBody = ({camPosition}) => {

    const landingContent = [
        {void:"void"},
        {DevOps : "Unlock speed and agility in software delivery! DevOps breaks down the walls between development and operations, bringing teams together to streamline processes, automate tasks, and release high-quality software faster. Join us to explore how DevOps can transform your workflow."},
        {SecOps : "Security is everyone’s responsibility. SecOps blends security into every layer of operations, enabling teams to tackle threats proactively without sacrificing speed. Discover how a SecOps approach can safeguard your business in an ever-evolving digital landscape."} , 
        {MLops : "Bring your machine learning models from the lab to the real world! MLOps ensures smooth deployment and management of AI solutions at scale, with continuous monitoring and updates to keep them sharp. Learn how MLOps can accelerate your AI journey."},
        {void:"void"},
        {void:"void"}

    ]
    const currentContent = landingContent[camPosition]
    const bodyStyling = {
        display:camPosition == 0? "none" : "flex",
        flexDirection:"column",
        justifyContent:"space-around",
        textAlign:"center",
        color:"white" ,
        height:"60vh",
        width:"40vw",
        paddingTop:"25vh",
        paddingLeft:"15vw",
        paddingRight:"15vw",
        fontFamily: "Overpass"
    
    }

    const titleStyling = {
        color:"#F9E4BC",
        margin:"0"
    }

    const subStyling = {
        color:"#FFFFFF",
        margin:"0"

    }
    
    const TitleRef = useRef();
    const SubRef = useRef();


    useGSAP(()=>{
        gsap.from([TitleRef.current, SubRef.current], 
        {opacity: 0, stagger: 0.1})
    },[currentContent])



    





  return (
    <div style={bodyStyling}>
        <div style={{margin:0}}>
            <h1 style={titleStyling} ref={TitleRef}>
                {Object.keys(currentContent) == "void" ? "" : Object.keys(currentContent)}
            </h1>
        </div>
       <div>
            <p style={subStyling} ref={SubRef}>
                {Object.keys(currentContent) == "void" ? "" : Object.values(currentContent)[0]}
            </p>
       </div>
        
    </div>
  )
}

export default LandingBody