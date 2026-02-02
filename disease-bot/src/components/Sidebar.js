import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ chats, onNewChat, onSelect }){

  const [open,setOpen] = useState(true);
  const [search,setSearch] = useState("");

  const filtered = chats.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );


  return(

    <div className={`sidebar ${open ? "open" : "closed"}`}>

      {/* TOGGLE */}
      <button
        className="toggle-btn"
        onClick={()=>setOpen(!open)}
      >
        ☰
      </button>


      {open && (

        <>


          {/* NEW CHAT */}
          <button
            className="new-chat"
            onClick={onNewChat}
          >
            ➕ New Chat
          </button>


          {/* SEARCH */}
          <div className="search-box">

            <input
              placeholder="Search chats..."
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />

          </div>


          {/* HISTORY */}
          <div className="chat-list">

            {filtered.map(c=>(

              <div
                key={c.id}
                className="chat-item"
                onClick={()=>onSelect(c.id)}
              >
                💬 {c.title}
              </div>

            ))}

          </div>


          {/* TOOLS */}
          <div className="sidebar-tools">

            <Link to="/alerts">🚨 Alerts</Link>
            <Link to="/help">❓ Help</Link>
            <Link to="/admin">⚙ Admin</Link>

          </div>


        </>

      )}

    </div>
  );
}

export default Sidebar;
