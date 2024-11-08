import { forwardRef } from 'react'


const Venue = forwardRef((props , ref) => {


    return (
        <mesh ref={ref} position={props.position}  >
      </mesh>
    
  )
  
}
)





export default Venue