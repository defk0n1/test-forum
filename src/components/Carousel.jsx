
import * as THREE from 'three'
import { forwardRef, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Environment, ScrollControls, useScroll, useTexture , OrbitControls, DragControls, Sphere} from '@react-three/drei'
import { easing } from 'maath'


import '../utils/CarouselUtils'

const isMobile = window.innerWidth < 768 ;






export default forwardRef((props,ref)=>{

  
  
  return(
    <>
    <OrbitControls target={new THREE.Vector3(0,0,-54)} enablePan={false} enableRotate={true} enableZoom={false}  minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2}/>
        <mesh position={[0,0,-54]} ref={ref}>
        <Main />
        </mesh>
    </>
)
  }
);


function Main({ radius = 4.2, count = 12 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card 
      key={i}
      url={`/img${i+1}_.jpg`}
      position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ))
}

function Card({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation() , hover(true))
  const pointerOut = () => hover(false)
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.5 : 1, 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
  })
  return (
    <Image onClick={e =>stopPropagation(e)}  ref={ref} url={url} transparent side={THREE.BackSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
      <bentPlaneGeometry args={[0.1, 2, 1.5, 20, 20]} />
    </Image>
  )
}
