// src/components/Help.js

import { useState, useRef } from "react";

function Help(){

  const [message,setMessage] = useState("");
  const [file,setFile] = useState(null);
  const [preview,setPreview] = useState(null);

  const fileRef = useRef();


  // TEMP: Logged user email (Later from backend/session)
  const userEmail = "user@example.com";


  const selectFile = (e)=>{

    const f = e.target.files[0];

    if(!f) return;

    setFile(f);

    if(f.type.startsWith("image")){
      setPreview(URL.createObjectURL(f));
    }else{
      setPreview(null);
    }
  };


  const submit = (e)=>{

    e.preventDefault();

    if(!message) return;

    const data = {
      email: userEmail,
      issue: message,
      file
    };

    console.log("Support Request:",data);

    alert("Support request sent successfully!");

    setMessage("");
    setFile(null);
    setPreview(null);
    fileRef.current.value="";
  };


  return(

    <div className="help-page">


      <div className="help-card">

        <h2>Help & Support</h2>

        <div className="help-contacts">

          <p>🚑 Emergency: <b>108</b></p>
          <p>📞 Helpline: <b>104</b></p>

        </div>


        <hr/>


        <h4>Contact Support</h4>


        <form onSubmit={submit}>


          {/* MESSAGE */}
          <textarea
            placeholder="Describe your issue..."
            value={message}
            onChange={e=>setMessage(e.target.value)}
            required
          />


          {/* FILE */}
          <div className="help-upload">

            <label className="upload-btn">

              📎 Attach File

              <input
                type="file"
                hidden
                ref={fileRef}
                onChange={selectFile}
              />

            </label>

          </div>


          {/* PREVIEW */}
          {file && (

            <div className="help-preview">

              {preview ? (

                <img src={preview} alt=""/>

              ) : (

                <span>📄 {file.name}</span>

              )}

              <button
                type="button"
                onClick={()=>{setFile(null);setPreview(null);}}
              >
                ✖
              </button>

            </div>

          )}


          {/* SEND */}
          <button className="help-send">
            Send
          </button>


        </form>

      </div>

    </div>
  );
}

export default Help;
