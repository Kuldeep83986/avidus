import { useState, useEffect } from "react";
import API from "../api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await API.put(`/admin/users/${userId}`, { status: newStatus });
      fetchUsers();
    } catch (err) {
      setError("Failed to update user status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure? This will delete the user and all their tasks.")) {
      return;
    }

    try {
      await API.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Management</h1>
        <p className="page-subtitle">
          Manage all registered users ({users.length} total)
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table className="data-table" id="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="td-name">{user.name}</td>
                  <td className="td-email">{user.email}</td>
                  <td>
                    <span
                      className={`role-badge ${
                        user.role === "Admin" ? "role-admin" : "role-user"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        user.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="td-actions">
                    <button
                      className={`btn btn-sm ${
                        user.status === "Active"
                          ? "btn-warning"
                          : "btn-success"
                      }`}
                      onClick={() =>
                        handleToggleStatus(user._id, user.status)
                      }
                    >
                      {user.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
