import * as THREE from 'three'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Sphere, useTexture} from '@react-three/drei'
import FakeGlowMaterial from '../../utils/FakeGlowMaterial.jsx'
import HolographicMaterial from '../../utils/HolographicMaterial.jsx'
import HoloPuck from './Holopuck.jsx'


const isMobile  = window.innerWidth < 768

const images = 
[
  // Front
  { position: [0, 0, 7] , url: "logos/blue/Cognira.png",pack:"blue", link : "https://cognira.com/"},

]






const Sponsors = forwardRef((props , ref) => {
    return (
    <group ref={ref} position={props.position} >
      {images.map((options) => <Sponsor cam={props.cam} key={options.url} {...options} /> /* prettier-ignore */)}
    </group>
    
  )
  
}
)


const Sponsor = forwardRef((props,ref) => {
  console.log(props)
  const logoTexture = useTexture(props.url);
  const h = logoTexture.source.data.naturalHeight 
  const w = logoTexture.source.data.naturalWidth 
  const AspectRatio =  w > h ? w / h : h / w;
  const link = props.link

  const [hovered, setHovered] = useState(false)

useEffect(() => {
  document.body.style.cursor = hovered ? 'pointer' : 'auto'
}, [hovered])


  const logoScale =(props)=>{
    if (props.pack == "blue"){
      return [1.2*1,1.2*0.3,AspectRatio]
    }else if (props.pack =="red") {
      return [1.25,0.75,0.75*AspectRatio]
    }
    else return [1,0.5,0.75*AspectRatio]

  }

  const handleSponsorClick = (e,link) => {
    console.log(props.cam)
    if(props.cam !== 6){return;}
    e.stopPropagation()    
    window.open(link, '_blank', 'noopener')  } 


  const HoloProps = {
    fresnelAmount: 0.65,
    fresnelOpacity: 0.1 ,
    scanlineSize: 2.0,
    hologramBrightness: 0.9,
    signalSpeed: 0.15,
    hologramColor: "props.pack",
    enableBlinking: false,
    enabled: true,
  
  
    }

  console.log(logoTexture)
  return (
    <mesh ref={ref} position={props.position}  >
    <sprite onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)} onClick={(e)=>{handleSponsorClick(e,link)}} scale={logoScale(props)}>
      <spriteMaterial
        attach="material"
        map={logoTexture}
      />
    </sprite>

    <mesh position={[0,-0.38,0]}>
    <cylinderGeometry args={[0.3,0.3,0.01]} />

    <FakeGlowMaterial falloff={1}
    glowInternalRadius={0.2}
    glowColor={"#62EFFE"}
    glowSharpness={0.8}
    side={"THREE.BackSide"}
    opacity={0.9}
    depthTest={false}
    ></FakeGlowMaterial>
      
    </mesh>
    {/* <mesh position={[0,0.6,0]}>
    <cylinderGeometry args={[0.95,0.95,2]} />
    <FakeGlowMaterial falloff={1}
    glowInternalRadius={0.3}
    glowColor={"white"}
    glowSharpness={0.5}
    side={"THREE.BackSide"}
    opacity={0.1}
    depthTest={false}
    ></FakeGlowMaterial>    </mesh> */}
    <HoloPuck rotation={[Math.PI/4, 0, 0]} position={[0,-0.5,0]}></HoloPuck>
    <Sparkles noise={2} count={20} speed={0.1} scale={0.6} size={1.2} color={"lightblue"}></Sparkles>
   
    
   
    


  </mesh>

  )
}
)






export default Sponsors