import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login(){

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const nav = useNavigate();

  const login = async()=>{

    const res = await api.post("/login",{email,password});

    localStorage.setItem("token",res.data.token);

    nav("/chat");
  };

  return(

    <div className="center-page">

      <div className="auth-card">

        <h2>AI Health Assistant</h2>
        <p>Login to Continue</p>

        <input
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button onClick={login}>
          Login
        </button>

        <hr/>

        <p onClick={()=>nav("/register")} className="link">
          Create New Account
        </p>

      </div>

    </div>
  );
}

export default Login;
