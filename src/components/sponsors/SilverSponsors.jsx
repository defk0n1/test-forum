import * as THREE from 'three'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Sphere, useTexture} from '@react-three/drei'
import FakeGlowMaterial from '../../utils/FakeGlowMaterial.jsx'
import HolographicMaterial from '../../utils/HolographicMaterial.jsx'
import HoloPuck from './Holopuck.jsx'


const images = 
[
  // Front
  { position: [0, -0.5, 7] , url: "logos/Cognira.png",pack:"silver",link:"https://cognira.com/"},
  { position: [1.8, 0, 6], url:"logos/Pearls.png",pack:"silver",link:"https://www.pearls.consulting/" },

]






const Sponsors = forwardRef((props , ref) => {
    return (
    <group ref={ref} position={props.position} >
      {images.map((props) => <Sponsor key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
    
  )
  
}
)


const Sponsor = forwardRef((props,ref) => {
  const logoTexture = useTexture(props.url);
  const h = logoTexture.source.data.naturalHeight 
  const w = logoTexture.source.data.naturalWidth 
  const AspectRatio =  w > h ? w / h : h / w;
  const link = props.link


  const logoScale =(props)=>{
    if (props.pack == "blue"){
      return [2,0.75,AspectRatio]
    }else if (props.pack =="red") {
      return [1.25,0.75,0.75*AspectRatio]
    }
    else return [1,0.5,0.75*AspectRatio]

  }

  const handleSponsorClick = (e,link) => {
    console.log(props.cam)
    if(props.cam == 8){return;}
    e.stopPropagation()    
    window.open(link, '_blank', 'noopener')  } 


  const HoloProps = {
    fresnelAmount: 0.65,
    fresnelOpacity: 0.1 ,
    scanlineSize: 2.0,
    hologramBrightness: 0.9,
    signalSpeed: 0.15,
    hologramColor: props.pack,
    enableBlinking: false,
    enabled: true,
  
  
    }

  return (
    <mesh ref={ref} position={props.position}  >
    <sprite onClick={(e)=>{handleSponsorClick(e,link)}} scale={logoScale(props)}>
      <spriteMaterial
        attach="material"
        map={logoTexture}
      />
    </sprite>

    {/* <mesh position={[0,-1.1,0]}>
    <cylinderGeometry args={[0.8,0.35,1]} />
    <FakeGlowMaterial falloff={1}
    glowInternalRadius={0.47}
    glowColor={props.pack}
    glowSharpness={0.9}
    side={"THREE.BackSide"}
    opacity={0.6}
    depthTest={false}></FakeGlowMaterial>
    </mesh> */}
  
    <mesh position={[0,-0.6,0]}>
    <cylinderGeometry args={[0.75,0.3,0.4]} />
    <FakeGlowMaterial falloff={1}
    glowInternalRadius={0.3}
    glowColor={"red"}
    glowSharpness={0.5}
    side={"THREE.BackSide"}
    opacity={0.9}
    depthTest={false}
    ></FakeGlowMaterial>
    </mesh>
    {/* <mesh position={[0,-3.5,0]}>
    <cylinderGeometry args={[0.7,0.7,6]} />
    <HolographicMaterial {...HoloProps} ></HolographicMaterial>
    </mesh> */}
    <HoloPuck rotation={[Math.PI/4, 0, 0]} position={[0,-0.9,0]}></HoloPuck>
    <Sparkles noise={2} count={20} speed={0.1} scale={1.4} size={1.2} color={props.pack}></Sparkles>
   
    
   
    


  </mesh>

  )
}
)






export default Sponsors