import { useState, useEffect } from "react";
import api from "../api";

function ManageHospitals(){

  const [name,setName]=useState("");
  const [spec,setSpec]=useState("");
  const [list,setList]=useState([]);

  useEffect(()=>{
    api.get("/admin/hospitals")
      .then(res=>setList(res.data))
      .catch(()=>setList([]));
  },[]);

  const addHospital = async()=>{

    await api.post("/admin/hospital",{
      name,
      specialization:spec
    });

    alert("Hospital Added");
  };

  return(

    <div>

      <h2>Manage Hospitals</h2>

      <input
        placeholder="Hospital Name"
        onChange={e=>setName(e.target.value)}
      />

      <input
        placeholder="Specialization"
        onChange={e=>setSpec(e.target.value)}
      />

      <button onClick={addHospital}>Add</button>

      <hr/>

      {list.map((h,i)=>(
        <p key={i}>
          {h.name} - {h.specialization}
        </p>
      ))}

    </div>
  );
}

export default ManageHospitals;
