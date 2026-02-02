import { useEffect,useState } from "react";
import api from "../api";

function Notifications(){

  const [alerts,setAlerts]=useState([]);

  useEffect(()=>{
    api.get("/alerts").then(res=>setAlerts(res.data));
  },[]);

  return(

    <div>

      <h2>Alerts</h2>

      {alerts.map((a,i)=>(
        <div key={i} className="alert">

          <h4>{a.title}</h4>
          <p>{a.message}</p>

        </div>
      ))}

    </div>
  );
}

export default Notifications;
