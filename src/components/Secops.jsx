import React, { forwardRef,useRef } from 'react'
import { useGLTF , Text3D, Center } from '@react-three/drei'
import HolographicMaterial from '../utils/HolographicMaterial'
const SecopsModel = forwardRef((props , ref)=>{
  const { nodes, materials } = useGLTF('secops.glb')
  const {...HoloProps} = {
    fresnelAmount: 0.65,
    fresnelOpacity: 0.2,
    scanlineSize: 9.0,
    hologramBrightness: 3.2,
    signalSpeed: 3.15,
    hologramColor: "#51a4de",
    enableBlinking: false,
    enabled: true,
  
    }
  return (
    <group ref={ref} {...props} position={[10, 0, -20]} dispose={null} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_id35.geometry}
        // material={materials['74']}
        rotation={[0, 0.131, 0]}
        scale={[4, 4, 4]}
      >
        <HolographicMaterial {...HoloProps} ></HolographicMaterial>
      </mesh>
      
    </group>
  )
})

export default SecopsModel; 

useGLTF.preload('secops.glb')