
import React, { useState , forwardRef} from "react";
import { useEffect } from "react";

import * as THREE from "three";



const VideoScreen  = forwardRef((props,ref) => {

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "sample-5s.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = false;
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



  const handleVidClick = (e) => {
    if(props.cam !== 4){return;}


    
    e.stopPropagation();
    setVideoPlaying(!videoPlaying)
  }

  return (
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
