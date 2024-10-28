// import React, { useRef, useEffect, forwardRef } from 'react';
// import { useThree } from '@react-three/fiber';
// import * as THREE from 'three';

// const VideoScreen =forwardRef( ({ videoPath },ref) => {
//   const videoRef = useRef(null);
//   const movieScreenRef = useRef(null);
//   const { scene } = useThree();
//   const video = document.createElement('video');


//   useEffect(()=>{
//   video.setAttribute('crossorigin', 'anonymous');
//   video.setAttribute('src', videoPath);
//   video.controls = true;
//   video.loop = true; // Optional: loops the video
//   // video.play()
//   },[])
  
 
  
//   const videoTexture = new THREE.VideoTexture(video);
//   videoTexture.minFilter = THREE.LinearFilter;
//   videoTexture.magFilter = THREE.LinearFilter;

//   const {...movieMaterialConfig} = {
//     map: videoTexture,
//     side: THREE.FrontSide,
//     toneMapped: false,
//     transparent: true,
//   }


// //   useEffect(() => {
   

// //     return () => {
// //       scene.remove(movieScreen); // Clean up when component unmounts
// //       video.pause();
// //       video.removeAttribute('src'); // Detach the video source
// //       video.load(); // Stop video loading
// //     };
// //   }, [videoPath, scene]);

//   return (
//     <>
//     <mesh onClick={(e)=>{console.log("clicked")}} position={[0,0,0.3]} scale={[10,10,10]}>
//         <planeGeometry args={[1,0.5,1]}>
//         <meshBasicMaterial {...movieMaterialConfig}>
//         </meshBasicMaterial>
//         </planeGeometry>
//     </mesh>   
//     </>
// )
// });

// export default VideoScreen;
import React, { useState , forwardRef} from "react";
import { useEffect } from "react";
import Icon from "../utils/3Dicons/Icon.jsx";



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


  return (
    <group >
      <mesh rotation={[0, 0, 0]} position={[0, 0, -40]} ref={ref}>
        <planeGeometry args={[9.2, 5.9]} />
        <meshStandardMaterial emissive={"white"} side={THREE.FrontSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>

      </mesh>
      <Icon  onClick={(e)=>{setVideoPlaying(!videoPlaying)}} position={!videoPlaying ? [0, -0.1, -39.5]:[-3.7, -2.5, -39.5]} file={videoPlaying? "pause-button-svgrepo-com.svg" : "play-svgrepo-com.svg"} color={"#FFFFFF"} scale={0.04} depth={0.001} ></Icon>
     
    </group>
  );
});


export default VideoScreen;
