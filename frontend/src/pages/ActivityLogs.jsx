import { useState, useEffect } from "react";
import API from "../api";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get("/admin/activities");
        setLogs(res.data);
      } catch (err) {
        setError("Failed to fetch activity logs");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const formatAction = (action) => {
    const actionMap = {
      login: "🔑 Login",
      task_create: "➕ Task Created",
      task_update: "✏️ Task Updated",
      task_delete: "🗑️ Task Deleted",
    };
    return actionMap[action] || action;
  };

  if (loading) {
    return <div className="loading">Loading activity logs...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Activity Logs</h1>
        <p className="page-subtitle">
          Track all user activities ({logs.length} entries)
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table className="data-table" id="activity-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Details</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="td-empty">
                    No activity logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id}>
                    <td className="td-name">
                      {log.user?.name || "Deleted User"}
                    </td>
                    <td>
                      <span className="action-badge">
                        {formatAction(log.action)}
                      </span>
                    </td>
                    <td className="td-desc">{log.details || "—"}</td>
                    <td>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
