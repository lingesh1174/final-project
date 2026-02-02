// src/components/AdminLogin.js

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AdminLogin(){

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const nav = useNavigate();

  const login = async()=>{

    const res = await api.post("/admin/login",{email,password});

    localStorage.setItem("adminToken",res.data.token);

    nav("/admin/dashboard");
  };

  return(

    <div className="center-page">

      <div className="auth-card">

        <h2>Admin Panel</h2>

        <input
          placeholder="Admin Email"
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

      </div>

    </div>
  );
}

export default AdminLogin;
