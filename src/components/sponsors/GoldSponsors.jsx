import { forwardRef, useEffect, useRef, useState } from 'react'
import { Sparkles, Sphere, useTexture} from '@react-three/drei'
import FakeGlowMaterial from '../../utils/FakeGlowMaterial.jsx'
import HoloPuck from './Holopuck.jsx'



const isMobile = window.innerWidth < 768

const images = !isMobile ?
[
  // Front
  { position: [2, 0.6, 6] , url: "logos/gold/Telnet.png",pack:"gold",link:"https://groupe-telnet.com/"},
  { position: [0, 0.6, 6], url:"logos/gold/Pearls.png",pack:"gold",link:"https://www.pearls.consulting/"},
  { position: [2, -0.6, 6], url:"logos/gold/SIEMENS.png",pack:"gold",link:"https://www.siemens.com/"},
  { position: [0, -0.6, 6], url:"logos/gold/Pwc.png",pack:"gold",link:"https://tunisie.pwc.fr/fr/"},
  { position: [-2, -0.6, 6], url:"logos/gold/FORVIA.png",pack:"gold",link:"https://www.forvia.com/en"},
  { position: [-2, 0.6, 6], url:"logos/gold/Primatec.png",pack:"gold",link:"https://tn.linkedin.com/company/primatec-engineering"},


]
:
[
  // Front
  { position: [1.1, 0.6, 6] , url: "logos/gold/Telnet.png",pack:"gold",link:"https://groupe-telnet.com/"},
  { position: [0, 0.6, 6], url:"logos/gold/Pearls.png",pack:"gold",link:"https://www.pearls.consulting/"},
  { position: [1.1, -0.6, 6], url:"logos/gold/SIEMENS.png",pack:"gold",link:"https://www.siemens.com/"},
  { position: [0, -0.6, 6], url:"logos/gold/Pwc.png",pack:"gold",link:"https://tunisie.pwc.fr/fr/"},
  { position: [-1.1, -0.6, 6], url:"logos/gold/FORVIA.png",pack:"gold",link:"https://www.forvia.com/en"},
  { position: [-1.1, 0.6, 6], url:"logos/gold/Primatec.png",pack:"gold",link:"https://tn.linkedin.com/company/primatec-engineering"},


]






const Sponsors = forwardRef((props , ref) => {
    return (
    <group ref={ref} position={props.position} >
      {images.map((options) => <Sponsor cam={props.cam} key={props.url} {...options} /> /* prettier-ignore */)}
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
    if(props.url == "logos/gold/SIEMENS.png" ){
      return [1,0.3,0.15*AspectRatio]

    }

    if(props.url == "logos/gold/Pwc.png" ){
      return [0.7,0.7,0.15*AspectRatio]

    }
    else
     return [0.8,0.4,0.75*AspectRatio]

  }


  const HoloProps = {
    fresnelAmount: 0.65,
    fresnelOpacity: 0.1 ,
    scanlineSize: 20,
    hologramBrightness: 0.9,
    signalSpeed: 0.15,
    hologramColor: props.pack,
    enableBlinking: false,
    enabled: true,
  
  
    }

    
    const handleSponsorClick = (e,link) => {
      console.log(props.cam)
      if(props.cam !== 8){return;}
      e.stopPropagation()    
      window.open(link, '_blank', 'noopener')  } 
  return (
    <mesh onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)} ref={ref} position={props.position}  >
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
    {/* <mesh position={[0,-3.5,0]}>
    <cylinderGeometry args={[0.7,0.7,6]} />
    <HolographicMaterial {...HoloProps} ></HolographicMaterial>
    </mesh> */}


    <mesh position={[0,-0.51,0]}>
    <cylinderGeometry args={[0.3,0.3,0.01]} />
      {/* <FakeGlowMaterial falloff={1}
      glowInternalRadius={0.1}
      glowColor={"yellow"}
      glowSharpness={1}
      side={"THREE.BackSide"}
      opacity={0.7}
      depthTest={false}
      ></FakeGlowMaterial> */}

<meshBasicMaterial color={"yellow"}></meshBasicMaterial>

    </mesh>
    {/* <mesh position={[0,-3.5,0]}>
    <cylinderGeometry args={[0.7,0.7,6]} />
    <HolographicMaterial {...HoloProps} ></HolographicMaterial>
    </mesh> */}
    <HoloPuck rotation={[Math.PI/4, 0, 0]} position={[0,-0.65,0]}></HoloPuck>
    <Sparkles noise={2} count={20} speed={0.1} scale={1.4} size={1.2} color={props.pack}></Sparkles>
   
    
   
    


  </mesh>

  )
}
)






export default Sponsors