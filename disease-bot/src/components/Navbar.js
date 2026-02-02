// src/components/Navbar.js

import { Link } from "react-router-dom";

function Navbar(){

  return(

    <div className="nav">
      
      <Link to="/chat">💬 Chat</Link>
      <Link to="/alerts">🚨 Alerts</Link>
      <Link to="/help">🆘 Help</Link>
      <Link to="/admin">⚙️ Admin</Link>

    </div>
  );
}

export default Navbar;
