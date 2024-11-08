import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import loadergif from '/loading-icon.gif'


const Loading = ({style}) => {
  // return (
  //   <Box sx={{position:"fixed" , zIndex:"999999", display: 'flex' , height : "100vh" , width:"100vw",...style,backgroundColor:"blue",justifyContent:"center" , alignItems:"center"}}>
  //   <CircularProgress />
  //   </Box>  )
  return <div style={{height:"100vh" , width:"100vw"  , justifyContent:"center" , alignItems:"center" ,background:"radial-gradient(#6398ad,#060b3b )"
    ,zIndex:"1999",display:"flex", position: "fixed",top:"0", ...style}}><img height="150" width="150" src={loadergif}/></div>
}

export default Loading