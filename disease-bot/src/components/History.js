import { useEffect, useState } from "react";
import api from "../api";

function History(){

  const [data,setData]=useState([]);

  useEffect(()=>{
    api.get("/history")
      .then(res=>setData(res.data))
      .catch(()=>setData([]));
  },[]);

  return(

    <div>

      <h2>Chat History</h2>

      {data.length===0 && <p>No history found</p>}

      {data.map((h,i)=>(
        <div key={i}>

          <b>User:</b> {h.user}<br/>
          <b>Bot:</b> {h.bot}

          <hr/>

        </div>
      ))}

    </div>
  );
}

export default History;
