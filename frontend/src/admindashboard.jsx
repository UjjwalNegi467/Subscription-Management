import { useEffect, useState } from "react";
import "./admindashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/subscriptions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1> <br/> <br/> <br/> <br/> <br/>
      <p className="admin-subtitle">All user subscriptions overview</p>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`plan ${u.subscription ? "active" : ""}`}>
                    {u.subscription || "None"}
                  </span>
                </td>
                <td>
                  <span className={`role ${u.role}`}>
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
