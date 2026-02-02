// src/components/Register.js

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Register(){

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [confirm,setConfirm]=useState("");

  const nav = useNavigate();

  const register = async()=>{

    if(pass !== confirm){
      alert("Passwords do not match");
      return;
    }

    await api.post("/register",{
      name,email,password:pass
    });

    alert("Registered Successfully");

    nav("/");
  };

  return(

    <div className="center-page">

      <div className="auth-card">

        <h2>Create Account</h2>

        <input
          placeholder="Full Name"
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e=>setPass(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={e=>setConfirm(e.target.value)}
        />

        <button onClick={register}>
          Register
        </button>

        <div className="google-btn">
          Sign in with Google
        </div>

        <p onClick={()=>nav("/")} className="link">
          Back to Login
        </p>

      </div>

    </div>
  );
}

export default Register;