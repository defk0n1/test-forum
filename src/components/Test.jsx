import React from 'react'
import {OrbitControls, useCursor, MeshReflectorMaterial, Image, Text3D, Environment,CameraControls, Box , Plane, Sky, Center} from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame , useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {SupComLogo} from './SupComLogo'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { color } from 'three/webgpu'
import Navbar from './Navbar'




const Test = () => {

  const isMobile = window.innerWidth < 768
  const cameraFov = isMobile ? 100 : 50
 
  const [upClicked,setUpClick] = useState(false)

  const [downClicked,setDownClick] = useState(false)

  const [currCamPosition , setCurrCamPosition] = useState(0)

  

  const handleUpClick = () => {
    setUpClick(!upClicked)
    if(currCamPosition == 3) {
      setCurrCamPosition(0)

    }else{    
      setCurrCamPosition(currCamPosition+1)
    }
  }
  const handleDownClick = () => {
    setDownClick(!downClicked)
    if(currCamPosition == 0) {
      setCurrCamPosition(3)

    }else{    
      setCurrCamPosition(currCamPosition-1)
    }

  }

  





  return (<>

 


 
  
  <Navbar/>
  <div style={{position:"absolute" , height:"10vh" , width:"100vw" , zIndex:"10"}}>
    <div style={{display:"flex",justifyContent:"space-evenly",position:"absolute" , width:"50vw" , height:"10vh", top:"80vh",paddingLeft:"25vw",paddingRight:"25vw"}}>
      <div onClick={handleUpClick} style={{width:"5vw" , backgroundColor:upClicked ? "green" : "red", textAlign:"center", display:"flex" , justifyContent:"center", flexDirection:"column"}}>
      UP
      </div>
      <div onClick={handleDownClick} style={{width:"5vw" ,backgroundColor:downClicked ? "green" : "red", textAlign:"center", display:"flex" , justifyContent:"center", flexDirection:"column"}}>
      DOWN 
      </div>  

    </div>
  

  </div>  
  <div style={{position:"relative", height:"100vh" , width:"100vw"}}> 
  <Canvas dpr={[1, 1.5]} camera={{ fov: cameraFov, position: [0, 1, 13] }}>
      {/* <OrbitControls enableRotate={false} enablePan={false} enableDamping={false} enableZoom={false}></OrbitControls> */}
      <OrbitControls/>
      <Scene camPosition={currCamPosition}></Scene>
      <Countdown eventDate={new Date("2024-12-31T00:00:00")}></Countdown>
      


  </Canvas>

</div>
</>
)
}




const Scene = ({camPosition}) => {
  const { scene, gl } = useThree();
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });
  const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 100, 0);
  scene.add(cubeCamera);
  




  const [baseColor, normalMap, roughnessMap, metalnessMap, aoMap, opacityMap, displacementMap] = useLoader(TextureLoader, [
    'grid.png',
    'Glass_Window_002_normal.jpg',
    'Glass_Window_002_roughness.jpg',
    'Glass_Window_002_metallic.jpg',
    'Glass_Window_002_ambientOcclusion.jpg',
    'Glass_Window_002_opacity.jpg',
    'Glass_Window_002_height.png',
  ]);
  const box1ref= useRef()
  const box2ref= useRef()
  const box3ref= useRef()

  const boxes = [box1ref , box2ref , box3ref]

  const vec = new THREE.Vector3()
  
  useFrame(state =>{
    if (camPosition!=0){
      const currentBox = boxes[camPosition-1].current;
      boxes[camPosition-1].current.visible = true
      state.camera.lookAt(boxes[camPosition-1].current.position)
      console.log(boxes[camPosition-1].current.position.x)
      state.camera.position.lerp(vec.set(currentBox.position.x,currentBox.position.y,currentBox.position.z+10),.1)
      state.camera.updateProjectionMatrix()
    }
  
    if(camPosition==0){
      state.camera.position.lerp(vec.set(0, 1, 13),.1)
      
      boxes.forEach(box => { box.current.visible = false
      });
    }
    cubeCamera.update(gl, scene)
    return null;
  })



  return (<>
    
  {/* <axesHelper /> */}
  {/* <color attach="background" args={['#000000']} /> */}
  <ambientLight intensity={1} color="0xF9E4BC"/>
  {/* <directionalLight color="blue" position={[0, 0, 5]} /> */}
  <fog attach="fog" args={['#F9E4BC',0, 1000]} />
  {/* <Environment preset="night" background={true}/> */}
  <Environment files={['right.png', 'left.png', 'top.png', 'bot.png', 'front.png', 'back.png']} background/>
  {/* <Sky distance={450000} sunPosition={[0,0.1,0]} inclination={0} azimuth={0.25} /> */}


  <Box ref={box1ref} position={[10, 0, -20]}>
    <meshBasicMaterial color={"#62EFFE"}></meshBasicMaterial>
  </Box>
  <Box ref={box2ref} position={[0, 0, -20]}>
  <meshBasicMaterial color={"#62EFFE"}></meshBasicMaterial>

  </Box>
  <Box ref={box3ref} position={[-10, 0, -20]}>
  <meshBasicMaterial color={"#62EFFE"}></meshBasicMaterial>

  </Box>

  {/* <SupComLogo position={[0, 0, 0]} rotation={[Math.PI/2,0,0]}/> */}
  {/* <mesh rotation={[0, 0, 0]} position={[0,0,-1]} >
        <planeGeometry args={[50, 50]}  />
        <meshBasicMaterial color={0x000000} attach="material" />
              </mesh> */}
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,-1.8,0]} >
        <planeGeometry args={[300,300,300,300]}  />
        <directionalLight intensity={0.5} />
    

 <meshStandardMaterial
        map={baseColor}               // Base color (albedo)
        // normalMap={normalMap}         // Normal map
        roughnessMap={roughnessMap}   // Roughness map
        // metalnessMap={metalnessMap} 
        roughness={0.01}
        metalness={1}  // Metallic map
        // aoMap={aoMap}                 // Ambient Occlusion map
        // displacementMap={displacementMap}  // Height/Displacement map
        // displacementScale={0.2}       // Adjust the scale of displacement if necessary
        // transparent={true}            // Make material transparent if using opacity map
        // opacityMap={opacityMap}  
        envMap={cubeCamera.renderTarget.texture}      // Opacity map
      />
      </mesh>
      </>
  )

}

function Countdown({ eventDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const textRef = useRef()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  

  return (
    <Center>
    <group position={[-0.3, 0, 0]}>
      <Text3D
        ref={textRef}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fontSize={2}
        font={"/fonts/Overpass_Bold.json"}
      >

        {`\n${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M ${timeLeft.seconds}S`}
        <meshBasicMaterial color="#F9E4BC" />

      </Text3D>
    </group>
    </Center>
  )
}




export default Test