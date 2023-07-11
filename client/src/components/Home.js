import React from 'react';
import {auth} from "../firebase/firebase"

const Home = ()=>{
  console.log("auth",auth.user)
  return (
    <div>
      
    </div>
  )
}

export default Home;
