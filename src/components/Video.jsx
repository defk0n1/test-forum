
import React, { useState , forwardRef , useEffect} from "react";

import * as THREE from "three";



const VideoScreen  = forwardRef((props,ref) => {

  const [isIos,setIsIos] = useState(null)


 

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "Teaser.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = false;
    // vid.setAttribute('playsinline', true)
    // vid.play();
    return vid;
  });

  const [videoPlaying , setVideoPlaying] = useState(false)

  useEffect(()=>{
    if(videoPlaying){
      video.play();
    }else{
      video.pause();
    }
  },[videoPlaying])

  useEffect(()=>{
    if(props.cam == 4){
      setVideoPlaying(true)
    }
    else {
      setVideoPlaying(false)
    }



  },[props.cam])


  useEffect(()=>{
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
setIsIos(true)}
else {
return;}
  },[]
)



  const handleVidClick = (e) => {
    if(props.cam !== 4){return;}


    
    e.stopPropagation();
    setVideoPlaying(!videoPlaying)
  }



  if(isIos){
    return(
      <video src="Teaser.mp4" crossOrigin="Anonymous" loop="true" muted="false" controls="true"></video>
    )

  }

 else return (
    
    <group >
      <mesh onClick={handleVidClick} rotation={[0, 0, 0]} position={[0, 0, -40]} ref={ref}>
        <planeGeometry args={[9.2, 5.9]} />
        <meshStandardMaterial emissive={"white"} side={THREE.FrontSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>

      </mesh>
      
    </group>
  );
});


export default VideoScreen;
