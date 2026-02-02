import { useState } from "react";
import api from "../api";

function ManageAlerts(){

  const [title,setTitle]=useState("");
  const [message,setMessage]=useState("");
  const [district,setDistrict]=useState("");

  const sendAlert = async()=>{

    await api.post("/admin/alert",{
      title,message,district
    });

    alert("Alert Sent!");
  };

  return(

    <div>

      <h2>Manage Alerts</h2>

      <input
        placeholder="Title"
        onChange={e=>setTitle(e.target.value)}
      /><br/>

      <textarea
        placeholder="Message"
        onChange={e=>setMessage(e.target.value)}
      /><br/>

      <input
        placeholder="District"
        onChange={e=>setDistrict(e.target.value)}
      /><br/>

      <button onClick={sendAlert}>Send Alert</button>

    </div>
  );
}

export default ManageAlerts;
