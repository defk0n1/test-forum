import { forwardRef } from 'react'


const Program = forwardRef((props , ref) => {


    return (
        <mesh ref={ref} position={props.position}  >
      </mesh>
    
  )
  
}
)





export default Program