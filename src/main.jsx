import React, { Children, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
;
import Test from './components/Test.jsx';
import Loading from './components/Loading.jsx';

const Wrapper = ({children}) => {
  const [screenLoading, setScreenLoading] = useState(false);
useEffect(() => {
  setScreenLoading(true);
  setTimeout(() => {
    setScreenLoading(false);
  }, 3000);
}, []);

  return <>
    <Loading style={{opacity : screenLoading ? "1" : "0" , display: screenLoading ? "flex" : "none"}}> </Loading>
    <div style={{opacity : !screenLoading ? "1" : "0"}}> {children}</div>
   
    </>
}





// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:  <Wrapper><Test/></Wrapper> ,

//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Wrapper><Test/></Wrapper>  
</React.StrictMode>,
)
