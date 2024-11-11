
import React, { useState , forwardRef} from "react";
import { useEffect } from "react";

import * as THREE from "three";



const VideoScreen  = forwardRef((props,ref) => {


  const [video] = useState(() => {
    if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
      return;
    }
    const vid = document.createElement("video");
    vid.src = "Teaser.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = false;
    vid.setAttribute('playsinline', true)
    // vid.play();
    return vid;
  });

  const [videoPlaying , setVideoPlaying] = useState(false)

  useEffect(()=>{
    if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
      return;
    }    if(videoPlaying){
      video.play();
    }else{
      video.pause();
    }
  },[videoPlaying])

  useEffect(()=>{
    if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
      return;
    }
    if(props.cam == 4){
      setVideoPlaying(true)
    }
    else {
      setVideoPlaying(false)
    }



  },[props.cam])



  const handleVidClick = (e) => {
    if(props.cam !== 4){return;}


    
    e.stopPropagation();
    setVideoPlaying(!videoPlaying)
  }



  if(/iPad|iPhone|iPod/.test(navigator.userAgent))
    {
      return(
      <group >
      <mesh onClick={handleVidClick} rotation={[0, 0, 0]} position={[0, 0, -40]} ref={ref}>
        <planeGeometry args={[0.1,0,1]} />
        <meshStandardMaterial opacity={0} emissive={"none"} side={THREE.FrontSide}>
          {/* <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} /> */}
        </meshStandardMaterial>

      </mesh>
      
    </group>
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
