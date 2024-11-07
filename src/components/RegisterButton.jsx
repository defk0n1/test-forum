
import RegistrationForm from "./Registration";
import {useState} from "react"
import { Modal } from "@mui/material";



const RegisterButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   

   
  return (
    <>
    <div className="register-button-wrapper">
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