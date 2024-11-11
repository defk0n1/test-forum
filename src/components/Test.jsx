import React from 'react'
import {Preload,Environment,Center,Torus, useTexture, Sparkles,Stars,PerspectiveCamera} from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame , useThree } from '@react-three/fiber'
import Navbar from './Navbar'
import ForumLogo from './ForumLogo'
import LandingBody from './LandingBody'
import LandingWrapper from './LandingWrapper'
import VideoScreen from './Video.jsx'
import Carousel from './Carousel.jsx'
import Countdown from './Countdown.jsx'
import BlueSponsors from './sponsors/BlueSponsors.jsx'
import RedSponsors from './sponsors/RedSponsors.jsx'
import GoldSponsors from './sponsors/GoldSponsors.jsx'
import SilverSponsors from './sponsors/SilverSponsors.jsx'
import Speakers from './Speakers.jsx'
import Venue from './Venue.jsx'
import Program from './Program.jsx'
import upIcon from "/up.svg";
import RegisterButton from './RegisterButton.jsx'




import { MathUtils } from 'three';
import Keynotes from './Keynotes.jsx'
import { useLocation } from 'react-router-dom'


const isMobile = window.innerWidth < 768


const fov = 50;
const planeAspectRatio = 16 / 9;

function ResizableCamera() {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    const handleResize = () => {
      // Update camera aspect and size
      camera.aspect = window.innerWidth / window.innerHeight;
      if (camera.aspect > planeAspectRatio) {
        // window too large
        camera.fov = fov;
      } else {
        // window too narrow
        const cameraHeight = Math.tan(MathUtils.degToRad(fov / 2));
        const ratio = camera.aspect / planeAspectRatio;
        const newCameraHeight = cameraHeight / ratio;
        camera.fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
      }
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Initial setup
    handleResize();
    
    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, gl]);

  return null;
}





const Test = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    // Set the currentPath state whenever the location changes
    setCurrentPath(location.pathname);
    // console.log(currentPath)
  }, [location]);


  const cameraFov = isMobile ? 90 : 50
  const cameraAspect = window.innerWidth / window.innerHeight
  
  const initcameraPos = isMobile ? [0, 1, 1] : [0, 100, 13]
 
  const [upClicked,setUpClick] = useState(false)

  const [downClicked,setDownClick] = useState(false)

  const [currCamPosition , setCurrCamPosition] = useState(0)
  const upbuttonRef = useRef(null);
  const downbuttonRef = useRef(null);



  

  const handleUpClick = () => {
    if (upbuttonRef.current && !upbuttonRef.current.disabled && downbuttonRef.current && !downbuttonRef.current.disabled) {
      upbuttonRef.current.disabled = true;
      downbuttonRef.current.disabled = true;

      // Perform the action
      // After the action is complete, reset buttonRef.current.disabled to false
    
    setUpClick(!upClicked)
    if(currCamPosition == 13) {
      setCurrCamPosition(0)
     

    }else{    
      setCurrCamPosition(currCamPosition+1)
    }
    setTimeout(()=>{downbuttonRef.current.disabled = false;
      upbuttonRef.current.disabled = false
    },1300)
  }
  }
  const handleDownClick = () => {
    if (downbuttonRef.current && !downbuttonRef.current.disabled && upbuttonRef.current && !upbuttonRef.current.disabled) {
      downbuttonRef.current.disabled = true;
      upbuttonRef.current.disabled = true;

      // Perform the action
      // After the action is complete, reset buttonRef.current.disabled to false
   
    
    setDownClick(!downClicked)
    if(currCamPosition == 0) {
      return
    }else{    
      setCurrCamPosition(currCamPosition-1)
    }
    setTimeout(()=>{   downbuttonRef.current.disabled = false;
      upbuttonRef.current.disabled = false


    },1300)
  }

  }





  return (<>

 


 
  
  <Navbar camchanger={setCurrCamPosition}/>





    {!isMobile ?
  <div style={{position:"fixed" , height:"100vh" , width:"fit-content" ,right:"5vw",display:"flex",justifyItems:"center",zIndex:"10000"}}>
    <div style={{display:"flex", flexDirection:"column",justifyContent:"center" , gap:"5vh"}}>
      
      <div ref={downbuttonRef} onClick={handleDownClick} style={{height:"fit-content" ,display: currCamPosition == 0 ? "none":""}}>
      <img src={upIcon} alt="" />
      </div>  
      <div ref={upbuttonRef} onClick={handleUpClick} >
      <img  src={upIcon} style={{transform: "rotate(180deg)"}} alt="" />
      </div>
    </div> 
  </div>  


      : <div style={{ position: "fixed", height: "10vh", width: "100vw", bottom: "10vw", display: "flex", justifyContent: "center" ,zIndex:"10000"}}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "5vh" }}>

          <div  ref={downbuttonRef} onClick={handleDownClick} style={{height:"fit-content" ,display: currCamPosition == 0 ? "none":""}}>
            <img src={upIcon} alt="" />
          </div>
          <div ref={upbuttonRef} onClick={handleUpClick}>
            <img src={upIcon} style={{ transform: "rotate(180deg)" }} alt="" />
          </div>
        </div>
      </div>  
  }
  <div style={{position:"relative", height:"100vh" , width:"100vw", background:"radial-gradient(#6398ad,#060b3b )" ,top:"0"}}> 
  <Canvas style={{position:"fixed"}} dpr={[1, 2]}  alpha={'true'} >
      <ResizableCamera></ResizableCamera>
      <PerspectiveCamera makeDefault />
      <Preload all />


      {/* <OrbitControls enabled={currCamPosition == 3} enablePan={false} enableRotate={false} enableZoom={false}  minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2}/> */}
      <Scene camPosition={currCamPosition}></Scene>
      {/* <PostProcessingEffects/> */}
  </Canvas> 
  <LandingWrapper camPosition={currCamPosition}>
    <LandingBody camPosition={currCamPosition}></LandingBody>
  </LandingWrapper>
  <RegisterButton></RegisterButton>
  

</div>

</>
)
}




const Scene = ({camPosition}) => {

  
 
    // Define the plane's rotation around the X-axis
  const planeRotation = new THREE.Euler(Math.PI / 2 + 0.1, 0, 0);
  
  // Calculate the normal vector from the plane rotation
  const normal = new THREE.Vector3(0, 0, 1).applyEuler(planeRotation).normalize();

  // Create two orthogonal vectors in the plane using the normal
  const u = new THREE.Vector3().crossVectors(normal, new THREE.Vector3(1, 0, 0)).normalize();
  const v = new THREE.Vector3().crossVectors(normal, u).normalize();



  
  const box1ref= useRef()
  const box2ref= useRef()
  const box3ref= useRef()
  const videoref = useRef()
  const carouselRef = useRef()
  const forumLogoRef = useRef()
  const countdownRef = useRef()
  const sparklesRef = useRef()
  const sponsorsRef = useRef()
  const redSponsorsRef  = useRef()
  const goldSponsorsRef = useRef()
  const silverSponsorsRef = useRef()
  const speakersRef = useRef()
  const keynotesRef = useRef()
  const venueRef = useRef()
  const programRef = useRef()



  const elementRefs = [box2ref , box1ref , box3ref, videoref,carouselRef,sponsorsRef,redSponsorsRef,
    goldSponsorsRef,
    silverSponsorsRef,
    speakersRef,
    keynotesRef,
    programRef,
    venueRef ]  
    
  const hideElts = ()=>{
    elementRefs.forEach(element => {
      element.current.visible = false; 

    });
    if(camPosition==0){
      box1ref.current.visible = true;
      box2ref.current.visible = true;
      box3ref.current.visible = true;
    }

  }
  useEffect(()=>{


   hideElts();
  },[])
  const secOpsTexture = useTexture("sec icon@2x.png");
  const devOpsTexture = useTexture("dev icon@2x.png");
  const mlOpsTexture = useTexture("AI icon@2x.png");




  const vec = new THREE.Vector3()
  var carouselLerped = false
  
  useFrame(state =>{
    let date = Date.now() * 1 * 0.0013;
   

    //CAMERA NAVIGATION
    if (camPosition!=0 && camPosition){
      forumLogoRef.current.visible = false
      countdownRef.current.visible = false

      const currentBox = elementRefs[camPosition-1].current;
      hideElts();
      currentBox.visible = true
      if(camPosition<6){
        sparklesRef.current.position.set(currentBox.position.x,currentBox.position.y,currentBox.position.z)

      }
      
      
      state.camera.lookAt(currentBox.position)
      if(camPosition!=5){
        carouselLerped = false
      }
      if(camPosition == 5 && !carouselLerped){
        state.camera.position.lerp(vec.set(currentBox.position.x,currentBox.position.y,isMobile ? currentBox.position.z+4 : currentBox.position.z+10),.03)
        state.camera.updateProjectionMatrix()
        setTimeout(() => {
          carouselLerped = true
          return;
        }, 1000);
      }
      if(camPosition == 5 && carouselLerped){
        return
      }
      state.camera.position.lerp(vec.set(currentBox.position.x,currentBox.position.y, isMobile ? currentBox.position.z+9 : currentBox.position.z+10 ),.03)
      state.camera.updateProjectionMatrix()

    }
  
    if(camPosition==0){
      forumLogoRef.current.visible = true
      countdownRef.current.visible = true
      sparklesRef.current.position.set(0,0,0)



      state.camera.position.lerp(vec.set(0, 1, 16),.1)
      box1ref.current.position.set(
        7 * Math.cos(date)  * u.x + 3.5 * Math.sin(date) * 2 * v.x,
        7 * Math.cos(date)  * u.y + 3.5 * Math.sin(date) * 2 * v.y,
        7 * Math.cos(date)  * u.z + 3.5 * Math.sin(date) * 2 * v.z
  
      );
      box2ref.current.position.set(
        4 * Math.cos(2 * date)  * u.x + 2 * Math.sin(2 * date) * 2 * v.x,
        4 * Math.cos(2 * date)  * u.y + 2 * Math.sin(2 * date) * 2 * v.y,
        4 * Math.cos(2 * date)  * u.z + 2 * Math.sin(2 * date) * 2 * v.z
  
      );
      box3ref.current.position.set(
        10 * Math.cos(date)  * u.x + 5 * Math.sin(date) * 2 * v.x,
        10 * Math.cos(date)  * u.y + 5 * Math.sin(date) * 2 * v.y,
        10 * Math.cos(date)  * u.z + 5 * Math.sin(date) * 2 * v.z
  
      );
      hideElts();
    }
//END CAMERA NAVIGATION 

    





   






    return null;
  })



  return (<>
    
  
  {!isMobile && <Environment files={['right.png', 'left.png', 'top.png', 'bot.png', 'front.png', 'back.png']} background backgroundBlurriness={0.4} />}



<group>
  <mesh>
      <Torus
        args={[7, 0.03, 2, 500]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2 + 0.1, 0, 0]}
      >
        <meshBasicMaterial color="#FFFFFF" opacity={0.2} transparent/>
      </Torus>

</mesh>

<mesh>
      <Torus
        args={[4, 0.03, 2, 500]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2 + 0.1 , 0, 0]}
      >
        <meshBasicMaterial color="#FFFFFF" opacity={0.2} transparent/>
      </Torus>

</mesh>

<mesh>
      <Torus
        args={[10, 0.03, 2, 500]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2 + 0.1, 0, 0]}
      >
        <meshBasicMaterial color="#FFFFFF" opacity={0.2}  transparent/>
      </Torus>

</mesh>
</group>


    <mesh ref={box1ref} position={[7, 0, 0]}  >
      <sprite scale={[1, 1, 1]}
      >
        <spriteMaterial
          attach="material"
          map={devOpsTexture}
        />
      </sprite>
    </mesh>

    <mesh ref={box2ref} position={[4, 0, 0]}  >
      <sprite scale={[1, 1, 1]}
      >
        <spriteMaterial
          attach="material"
          map={secOpsTexture}
        />
      </sprite>
    </mesh>


    <mesh ref={box3ref} position={[10, 0, 0]}  >
      <sprite scale={[1, 1, 1]}
      >
        <spriteMaterial
          attach="material"
          map={mlOpsTexture}
        />
      </sprite>
    </mesh>







 

  <VideoScreen cam={camPosition} ref={videoref}/>

  <Carousel cam={camPosition}  ref={carouselRef} />
  <ForumLogo ref={forumLogoRef} rotation={[Math.PI/2,0,0]}/>
  <Countdown ref={countdownRef} eventDate={new Date("2024-11-13T00:00:00")}></Countdown>
   <>
  <BlueSponsors cam={camPosition}   ref={sponsorsRef} position={[0,0.3,-60]}/>
  <RedSponsors cam={camPosition}  ref={redSponsorsRef} position={[0,0.3,-80]}/>
  <GoldSponsors cam={camPosition}  ref={goldSponsorsRef} position={[0,0.3,-90]}/>
  <SilverSponsors cam={camPosition}  ref={silverSponsorsRef} position={[0,0.3,-100]}/>
  <Speakers cam={camPosition}  ref={keynotesRef} position={[0,0.3,-120]}/>
  <Keynotes cam={camPosition}  ref={speakersRef } position={[0,0.3,-130]}/>
  <Program cam={camPosition}  ref={programRef} position={[0,0.3,-140]}/>
  <Venue cam={camPosition}  ref={venueRef} position={[0,0.3,-160]}/>



  </>



  <group>
        <Center>
          <Sparkles ref={sparklesRef} position={[0, 0, 0]} speed={2} scale={7.4} size={4} color={"#ADD8E6"} />
          <Stars radius={1000} depth={3} count={4000} factor={3} saturation={0} fade speed={3} />
        </Center>
    </group>
 
      </>
  )

}













export default Test