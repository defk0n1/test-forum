import * as THREE from 'three'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Sphere, useTexture} from '@react-three/drei'

const isMobile = window.innerWidth < 768

const images = 
[
  // Front
  { position: [2, 0, 6] , url: "speakers/workshop1.png",pack:"blue", link : "https://cognira.com/" ,id:0},
  { position: [0, 0, 0] , url: "speakers/workshop2.png",pack:"blue", link : "https://cognira.com/" ,id:1},
  { position: [-2, 0, 6] , url: "speakers/workshop3.png",pack:"blue", link : "https://cognira.com/" ,id:2},


]






const Speakers = forwardRef((props , ref) => {

    const speaker1Ref = useRef()
    const speaker2Ref = useRef()
    const speaker3Ref = useRef()

    const speakersRef = [speaker1Ref,speaker2Ref,speaker3Ref]


    useFrame(state =>{
           // Define the plane's rotation around the X-axis
  const planeRotation = new THREE.Euler(Math.PI / 2 , 0, 0);
  
  // Calculate the normal vector from the plane rotation
  const normal = new THREE.Vector3(0, 0, 1).applyEuler(planeRotation).normalize();

  // Create two orthogonal vectors in the plane using the normal
  const u = new THREE.Vector3().crossVectors(normal, new THREE.Vector3(1, 0, 0)).normalize();
  const v = new THREE.Vector3().crossVectors(normal, u).normalize();


        let date = Date.now() * 1 * 0.0004;

        speaker1Ref.current.position.set(
            1.6 * Math.cos(date+2*Math.PI/3)  * u.x + 1.6 * Math.sin(date+2*Math.PI/3) * 2 * v.x,
            1.6 * Math.cos(date+2*Math.PI/3)  * u.y + 1.6 * Math.sin(date+2*Math.PI/3) * 2 * v.y,
            1.6 * Math.cos(date+2*Math.PI/3)  * u.z + 1.6 * Math.sin(date+2*Math.PI/3) * 2 * v.z
      
          );
        speaker2Ref.current.position.set(
            1.6 * Math.cos(date+4*Math.PI/3)  * u.x + 1.6 * Math.sin(date+4*Math.PI/3) * 2 * v.x,
            1.6 * Math.cos(date+4*Math.PI/3)  * u.y + 1.6 * Math.sin(date+4*Math.PI/3) * 2 * v.y,
            1.6 * Math.cos(date+4*Math.PI/3)  * u.z + 1.6 * Math.sin(date+4*Math.PI/3) * 2 * v.z
      
          );
        speaker3Ref.current.position.set(
            1.6 * Math.cos(date)  * u.x + 1.6 * Math.sin(date) * 2 * v.x,
            1.6 * Math.cos(date)  * u.y + 1.6 * Math.sin(date) * 2 * v.y,
            1.6 * Math.cos(date)  * u.z + 1.6 * Math.sin(date) * 2 * v.z
          );
          if(isMobile){
            if(props.cam == 10 || props.cam == 11 ){
            state.camera.fov = 60;
  
          }
          if(props.cam !== 10 && props.cam !== 11){
            state.camera.fov = 100;
  
          }
  }
        


    })

    return (
    <group ref={ref} position={props.position} >
      {images.map((options) => <Speaker ref={speakersRef[options.id]} cam={props.cam} key={options.id} {...options} /> /* prettier-ignore */)}
    </group>
    
  )
  
}
)


const Speaker = forwardRef((props,ref) => {
  const logoTexture = useTexture(props.url);
  const h = logoTexture.source.data.naturalHeight 
  const w = logoTexture.source.data.naturalWidth 
  const AspectRatio =  w > h ? w / h : h / w;
  const link = props.link
  

  const logoScale =(props)=>{
    if (props.pack == "blue"){
      return [5,5,AspectRatio]
    }
    

  }

  const handleSpeakerClick = (e,link) => {
    // console.log(props.cam)
    if(props.cam !== 5){return;}
    e.stopPropagation()    
    window.open(link, '_blank', 'noopener')  } 


  
  return (
    <mesh ref={ref} position={props.position}  >
    <sprite onClick={(e)=>{handleSpeakerClick(e,link)}} scale={logoScale(props)}>
      <spriteMaterial
        attach="material"
        map={logoTexture}
      />
    </sprite>



    <Sparkles noise={2} count={20} speed={0.1} scale={1.6} size={1.2} color={"lightblue"}></Sparkles>
  </mesh>

  )
}
)






export default Speakers