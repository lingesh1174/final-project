import { Link } from "react-router-dom";

function AdminDashboard(){

  return(

    <div>

      <h2>Dashboard</h2>

      <Link to="/admin/alerts">Alerts</Link><br/>
      <Link to="/admin/hospitals">Hospitals</Link><br/>
      <Link to="/admin/diseases">Diseases</Link><br/>
      <Link to="/admin/users">Users</Link>

    </div>
  );
}

export default AdminDashboard;
