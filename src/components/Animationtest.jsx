import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  Points,
  shaderMaterial,
  useGLTF,
  ScrollControls,
} from "@react-three/drei";
import PropTypes from "prop-types";
const u_progress = 0;



const ParticlesMaterial = shaderMaterial(
  {
    u_color_1: new THREE.Color("#fe80b6"),
    u_color_2: new THREE.Color("#fe80b6"),
    u_progress: u_progress,
  },
  `uniform mat4 modelMatrix;
   uniform mat4 viewMatrix;
   uniform mat4 projectionMatrix;
   uniform float u_progress;
   attribute vec3 position;
   varying vec3 v_positon;
   attribute vec3 initposition;
   void main() {
     vec3 copy_position=position;
     copy_position=initposition+((position-initposition)*u_progress);
     vec4 modelPosition = modelMatrix * vec4(copy_position,1.0);
     vec4 viewPosition = viewMatrix * modelPosition;
     vec4 projectionPosition = projectionMatrix * viewPosition;
     gl_Position = projectionPosition;
     gl_PointSize=1.75;
     v_positon=position;
  }`,
  `precision mediump float;
   uniform vec3 u_color_1;
   uniform vec3 u_color_2;
   varying vec3 v_positon;
   void main() {
      vec3 mix_colors=mix(u_color_1,u_color_2,v_positon.z);
      gl_FragColor = vec4(mix_colors,1.0);
  }`
);
 
extend({ ParticlesMaterial });
 
const Particles = ({ model }) => {
  const mesh = useRef();
  const [particlesGeo] = useState(new THREE.BufferGeometry());
 
  useEffect(() => {
    const sampler = new MeshSurfaceSampler(model).build();
    const particlesNumber = 10000;
    const positions = new Float32Array(particlesNumber * 3);
    const initPositions = new Float32Array(particlesNumber * 3);
    for (let i = 0; i < particlesNumber; i++) {
      const tempPosition = new THREE.Vector3();
      sampler.sample(tempPosition);
      positions.set([tempPosition.x, tempPosition.y, tempPosition.z], i * 3);
      initPositions.set(
        [
          15000 - Math.random() * 100000,
          15000 - Math.random() * 100000,
          15000 - Math.random() * 100000,
        ],
        i * 3
      );
    }
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeo.setAttribute(
      "initposition",
      new THREE.BufferAttribute(initPositions, 3)
    );
  }, [model, particlesGeo]);
 
  //  S useEffect(() => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     gsap.fromTo(
  //       mesh.current.material.uniforms.u_progress,
  //       { value: 0 },
  //       {
  //         value: 1,
  //         duration: 3.5,
  //         ease: "power4.out",
  //         scrollTrigger: {
  //           trigger: ".draw3",
  //           start: "top top",
  //           end: "bottom top",
  //           scrub: true,
  //           markers: true,
  //         },
  //       }
  //     );
  //   }, []);
 
  //   useEffect(() => {
  //     const bounce = () => {
  //       gsap.to(mesh.current.position, {
  //         y: "+=0.02",
  //         duration: 2.5,
  //         ease: "power1.inOut",
  //         yoyo: true,
  //         repeat: -1,
  //       });
  //     };
  //     bounce();
  //   }, []);
 
  return (
    <Points
      ref={mesh}
      geometry={particlesGeo}
      material={new ParticlesMaterial}
    >
    </Points>
  );
};
 
const Model = () => {
  const gltf = useGLTF("secops.glb", true);
  const model = gltf.scene.children[0].children[0];
  console.log(model);
  return <Particles model={model} />;
};
 
// const CameraPos = () => {
//   const { camera } = useThree();
//   useEffect(() => {
//     camera.position.z = 3;
//   }, [camera]);
 
//   return null;
// };
 
const Scene = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
     
      <ambientLight />
      <Model />
      
    </Suspense>
  );
};
 
const Footer = () => {
  //   useEffect(() => {
  //     const footerContainer = document.querySelector(".footer-full_container");
  //     gsap.from(footerContainer, {
  //       opacity: 0,
  //       ease: "back.out",
  //       duration: 9,
  //       scrollTrigger: {
  //         trigger: ".footer-full_container",
  //         start: "top top",
  //         end: "200% top",
  //         markers: true,
  //         scrub: true,
  //         pin: true,
  //         pinSpacing: true,
  //         anticipatePin: 1,
  //       },
  //     });
  //   }, []);
 
  return (
    <div className="footer-full_container">
      <Scene />
    </div>
  );
};
 
// Particles.propTypes = {
//   model: PropTypes.object,
// };
 
export default Footer;