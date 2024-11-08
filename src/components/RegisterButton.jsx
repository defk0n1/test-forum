
import RegistrationForm from "./Registration";
import {useState , useRef} from "react"
import { Modal } from "@mui/material";

import gsap from "gsap";








const RegisterButton = () => {
  const [open, setOpen] = useState(false);
  const [buttonRendered, setButtonRendered] = useState(true)
  const handleOpen = () => {setOpen(true);setButtonRendered(false)} 
  const handleClose = () => {setOpen(false); setButtonRendered(true)}
  const regbuttonRef = useRef();

  return (
    <>
    <div style={{display: buttonRendered ? "flex" : "none" }} ref={regbuttonRef} className="register-button-wrapper">
       <div onClick={handleOpen} className="register-button"><p style={{margin:0}}>REGISTER NOW</p></div>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:"flex" , flexDirection:"column" , justifyContent:"center"}}

      >
      <RegistrationForm close={handleClose}></RegistrationForm>
       
      </Modal>
      </>  )
}

export default RegisterButton