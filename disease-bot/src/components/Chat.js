// src/components/Chat.js

import { useState, useRef } from "react";
import api from "../api";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

import MicRecorder from "mic-recorder-to-mp3";

const recorder = new MicRecorder({ bitRate: 128 });

function Chat(){

  const [msgs,setMsgs]=useState([]);
  const [text,setText]=useState("");

  const [showSidebar, setShowSidebar] = useState(true);
  const [search, setSearch] = useState("");

  const [file,setFile]=useState(null);
  const [preview,setPreview]=useState(null);

  const [recording,setRecording]=useState(false);

  const fileRef = useRef();


  /* ---------------- FILE SELECT ---------------- */

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


  /* ---------------- AUDIO RECORD ---------------- */

  const startRecord = async()=>{

    await recorder.start();

    setRecording(true);
  };


  const stopRecord = async()=>{

    const [buffer,blob] = await recorder.stop().getMp3();

    setRecording(false);

    const file = new File(buffer,"voice.mp3",{
      type:"audio/mp3"
    });

    sendAudio(file);
  };


  const sendAudio = async(audioFile)=>{

    let form = new FormData();
    form.append("audio",audioFile);

    const res = await api.post("/voice",form);

    const userMsg = {
      id:uuid(),
      from:"user",
      audio:res.data.audioUrl
    };

    setMsgs(prev=>[...prev,userMsg]);

    /* Bot Reply */
    const bot = await api.post("/chat",{
      message:res.data.text   // backend STT result
    });

    setMsgs(prev=>[
      ...prev,
      {id:uuid(),from:"bot",text:bot.data.reply}
    ]);
  };


  /* ---------------- SEND TEXT + FILE ---------------- */

  const send = async()=>{

    if(!text && !file) return;

    let fileUrl = null;
    let fileType = null;

    if(file){

      let form = new FormData();
      form.append("file",file);

      const res = await api.post("/upload",form);

      fileUrl = res.data.url;
      fileType = file.type;
    }

    const userMsg={
      id:uuid(),
      from:"user",
      text,
      file:fileUrl,
      fileType
    };

    setMsgs(prev=>[...prev,userMsg]);

    const bot = await api.post("/chat",{message:text});

    setMsgs(prev=>[
      ...prev,
      {id:uuid(),from:"bot",text:bot.data.reply}
    ]);

    setText("");
    setFile(null);
    setPreview(null);
    fileRef.current.value="";
  };

  const newChat = ()=>{

  if(msgs.length===0) return;

  setMsgs([]);
  setText("");
  setFile(null);
  setPreview(null);

};


  return(

    <div className="chat-layout">


      {/* SIDEBAR */}
      {showSidebar && (

        <div className="sidebar">

          {/* NEW CHAT */}
          <button
            className="new-chat-btn"
            onClick={() => setMsgs([])}
          >
            ➕ New Chat
          </button>


          {/* SEARCH */}
          <input
            type="text"
            className="search-box"
            placeholder="Search chats..."
          />


          {/* HISTORY */}
          <div className="history-list">

            {msgs.map((m,i)=>(

              <div key={i} className="history-item">
                {m.text || "Voice / File"}
              </div>

            ))}

          </div>


          {/* LINKS */}
          <div className="sidebar-links">

            <Link to="/alerts">🔔 Alerts</Link>
            <Link to="/help">❓ Help</Link>

          </div>

        </div>

      )}


      {/* MAIN */}
      <div className="chat-main">


        {/* NAV */}
        <div className="chat-nav">
          <button
            onClick={()=>setShowSidebar(!showSidebar)}
            style={{
              background:"transparent",
              border:"none",
              color:"white",
              fontSize:"20px",
              cursor:"pointer",
              marginRight:"10px"
            }}
          >
            ☰
          </button>


          <div className="logo">AI Health Assistant</div>

          <div className="nav-links">
            <Link to="/admin">Admin</Link>
          </div>

        </div>


        {/* BODY */}
        <div className="chat-body">

          {msgs.map(m=>(

            <div
              key={m.id}
              className={`msg-row ${m.from}`}
            >

              <div className={`bubble ${m.from}`}>

                {/* AUDIO */}
                {m.audio && (
                  <audio controls src={m.audio}/>
                )}

                {/* IMAGE */}
                {m.file && m.fileType?.startsWith("image") && (
                  <img
                    src={m.file}
                    className="chat-img"
                    alt=""
                  />
                )}

                {/* FILE */}
                {m.file && !m.fileType?.startsWith("image") && (
                  <a href={m.file} target="_blank">
                    📎 Download
                  </a>
                )}

                {/* TEXT */}
                {m.text && <p>{m.text}</p>}

              </div>

            </div>

          ))}

        </div>


        {/* PREVIEW */}
        {file && (
          <div className="preview-box">

            {preview ? (
              <img src={preview} alt=""/>
            ) : (
              <span>📎 {file.name}</span>
            )}

            <button onClick={()=>{setFile(null);setPreview(null);}}>
              ✖
            </button>

          </div>
        )}


        {/* INPUT */}
        <div className="chat-input">


          {/* PLUS */}
          <div className="plus-btn">

            +

            <input
              type="file"
              ref={fileRef}
              onChange={selectFile}
            />

          </div>


          {/* TEXT */}
          <input
            value={text}
            onChange={e=>setText(e.target.value)}
            placeholder="Type message..."
          />


          {/* MIC */}
          {!recording ? (

            <button className="mic-btn" onClick={startRecord}>
              🎤
            </button>

          ) : (

            <button className="mic-btn stop" onClick={stopRecord}>
              ⏹
            </button>

          )}


          {/* SEND */}
          <button onClick={send}>
            ➤
          </button>


        </div>

      </div>

    </div>
  );
}

export default Chat;
