
import {Text3D} from '@react-three/drei'

import { useEffect, useRef, useState ,forwardRef } from 'react'


export default forwardRef(( props,ref ) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const textRef = useRef()
  
    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date()
        const difference = props.eventDate.getTime() - now.getTime()
  
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
    }, [props.eventDate])
  
    
  
    return (
      <group ref={ref} position={[-5.7, -2.4, -1]}>
        <Text3D
          ref={textRef}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontSize={2}
          font={"/fonts/Overpass_Bold.json"}
          onClick={e =>stopPropagation(e)}
        >
  
          {`\n${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M ${timeLeft.seconds}S`}
          <meshBasicMaterial color="#F9E4BC" depthTest={false}/>
  
        </Text3D>
      </group>
    )
  }
)
  
  