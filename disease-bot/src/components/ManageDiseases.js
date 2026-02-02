import { useState, useEffect } from "react";
import api from "../api";

function ManageDiseases(){

  const [name,setName]=useState("");
  const [symptoms,setSymptoms]=useState("");
  const [list,setList]=useState([]);

  useEffect(()=>{
    api.get("/admin/diseases")
      .then(res=>setList(res.data))
      .catch(()=>setList([]));
  },[]);

  const addDisease = async()=>{

    await api.post("/admin/disease",{
      name,symptoms
    });

    alert("Disease Added");
  };

  return(

    <div>

      <h2>Manage Diseases</h2>

      <input
        placeholder="Disease Name"
        onChange={e=>setName(e.target.value)}
      />

      <input
        placeholder="Symptoms"
        onChange={e=>setSymptoms(e.target.value)}
      />

      <button onClick={addDisease}>Add</button>

      <hr/>

      {list.map((d,i)=>(
        <p key={i}>
          {d.name} → {d.symptoms}
        </p>
      ))}

    </div>
  );
}

export default ManageDiseases;
