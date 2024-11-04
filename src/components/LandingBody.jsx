import { useEffect, useRef } from 'react' 
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const LandingBody = ({camPosition}) => {


    const titleStyling = {
        color:"#F9E4BC",
        margin:"0",
        position:"relative",
        top:"8vh"

    }

    const subStyling = {
        color:"#FFFFFF",
        margin:"0",
        

    }
    

    const landingContent = [
        {title:"void"},
        {content:"Security is everyone’s responsibility. SecOps blends security into every layer of operations, enabling teams to tackle threats proactively without sacrificing speed. Discover how a SecOps approach can safeguard your business in an ever-evolving digital landscape.",title:"SecOps",titleStyle:titleStyling} ,  
        {content:"Unlock speed and agility in software delivery! DevOps breaks down the walls between development and operations, bringing teams together to streamline processes, automate tasks, and release high-quality software faster. Join us to explore how DevOps can transform your workflow.",title:"DevOps",titleStyle:titleStyling},
        {content:"Bring your machine learning models from the lab to the real world! MLOps ensures smooth deployment and management of AI solutions at scale, with continuous monitoring and updates to keep them sharp. Learn how MLOps can accelerate your AI journey.",title:"MLops",titleStyle:titleStyling},
        {title:"void"},
        {title:"void"},
        {content:"",title:"Blue Sponsors",titleStyle:{color:"blue"}}, 
        {content:"",title:"Red Sponsors",titleStyle:{color:"red"}},
        {content:"",title:"Silver Sponsors",titleStyle:{color:"silver"}},
        {content:"",title:"Gold Sponsors",titleStyle:{color:"gold"}}
    
]

    const currentContent = landingContent[camPosition]
    const bodyStyling = {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        textAlign:"center",
        color:"white" ,
        height:"80vh",
        width:"40vw",
        paddingTop:"10vh",
        paddingBottom:"10vh",
        paddingLeft:"15vw",
        paddingRight:"15vw",
        fontFamily: "Overpass",
        fontSize:"1em"
    
    }

   
    const TitleRef = useRef();
    const SubRef = useRef();


    useGSAP(()=>{
        gsap.from([TitleRef.current, SubRef.current], 
        {opacity: 0, stagger: 0.1})
    },[currentContent])


    console.log(currentContent)
    





  return (
    <div style={bodyStyling}>
        <div style={{margin:0}}>
            <h1 style={currentContent.titleStyle} ref={TitleRef}>
                {currentContent.title == "void" ? "" : currentContent.title}
            </h1>
        </div>
       <div>
            <p style={subStyling} ref={SubRef}>
            {currentContent.title == "void" ? "" : currentContent.content}           
            </p>
       </div>
        
    </div>
  )
}

export default LandingBody