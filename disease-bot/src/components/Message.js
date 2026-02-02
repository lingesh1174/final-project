function Message({msg}){

  const copy=()=>{
    navigator.clipboard.writeText(msg.content);
    alert("Copied");
  };

  if(msg.type==="file"){

    return(
      <div className="msg">
        <a href={msg.content} download>
          {msg.name}
        </a>
      </div>
    );
  }

  return(

    <div className={`msg ${msg.from}`}>

      <p>{msg.content}</p>

      <button onClick={copy}>📋</button>

    </div>
  );
}

export default Message;
