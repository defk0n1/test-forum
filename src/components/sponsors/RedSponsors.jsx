import * as THREE from 'three'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Sphere, useTexture} from '@react-three/drei'
import FakeGlowMaterial from '../../utils/FakeGlowMaterial.jsx'
import HolographicMaterial from '../../utils/HolographicMaterial.jsx'
import HoloPuck from './Holopuck.jsx'

const isMobile = window.innerWidth < 768

const images = !isMobile ?
[
  // Front
  { position: [1, 0, 6], url:"logos/red/Sagemcom.png",pack:"red",link:"https://sagemcom.com/" },
  { position: [-1, 0, 6], url: "logos/red/Orange.png",pack:"red",link:"https://www.orange.tn/"},
]

:

[
  // Front
  { position: [0.8, 0, 6], url:"logos/red/Sagemcom.png",pack:"red",link:"https://sagemcom.com/" },
  { position: [-0.8, 0, 6], url: "logos/red/Orange.png",pack:"red",link:"https://www.orange.tn/"},
]



const RedSponsors = forwardRef((props , ref) => {
    return (
    <group ref={ref} position={props.position} >
      {images.map((options) => <Sponsor cam={props.cam} key={options.url} {...options} /> /* prettier-ignore */)}
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

  const [hovered, setHovered] = useState(false)

useEffect(() => {
  document.body.style.cursor = hovered ? 'pointer' : 'auto'
}, [hovered])


  const logoScale =(props)=>{
   

    if (props.pack == "blue"){
      return [2,0.75,AspectRatio]
    }else if (props.pack =="red") {
      return [0.5,0.5,0.75*AspectRatio]
    }
    else return [1,0.5,0.75*AspectRatio]

  }


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

    
    const handleSponsorClick = (e,link) => {
      console.log(props.cam)
      if(props.cam !== 7){return;}
      e.stopPropagation()    
      window.open(link, '_blank', 'noopener')  } 

  return (
    <mesh ref={ref} position={props.position}>
    <sprite onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}  onClick={(e)=>{handleSponsorClick(e,link)}} scale={logoScale(props)}>
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
  
    {/* <mesh position={[0,-0.6,0]}>
    <cylinderGeometry args={[0.75,0.3,0.4]} />
    <FakeGlowMaterial falloff={1}
    glowInternalRadius={0.3}
    glowColor={"red"}
    glowSharpness={0.5}
    side={"THREE.BackSide"}
    opacity={0.9}
    depthTest={false}
    ></FakeGlowMaterial>
    </mesh> */}
    <mesh position={[0,-0.5,0]}>
    <cylinderGeometry args={[0.3,0.3,0.1]} />
    <FakeGlowMaterial falloff={1}
    glowInternalRadius={0.2}
    glowColor={"red"}
    glowSharpness={0.8}
    side={"THREE.BackSide"}
    opacity={0.9}
    depthTest={false}
    ></FakeGlowMaterial>


    <HolographicMaterial {...HoloProps}></HolographicMaterial>
    </mesh>
    {/* <mesh position={[0,-3.5,0]}>
    <cylinderGeometry args={[0.7,0.7,6]} />
    <HolographicMaterial {...HoloProps} ></HolographicMaterial>
    </mesh> */}
    <HoloPuck rotation={[Math.PI/4, 0, 0]} position={[0,-0.6,0]}></HoloPuck>
    <Sparkles noise={2} count={20} speed={0.1} scale={1.4} size={1.2} color={props.pack}></Sparkles>
   
    
   
    


  </mesh>

  )
}
)






export default RedSponsors