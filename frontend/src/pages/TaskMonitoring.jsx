import { useState, useEffect } from "react";
import API from "../api";

const TaskMonitoring = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/admin/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await API.delete(`/admin/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Task Monitoring</h1>
        <p className="page-subtitle">
          All tasks from all users ({tasks.length} total)
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table className="data-table" id="tasks-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="td-empty">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="td-name">{task.title}</td>
                    <td className="td-desc">
                      {task.description || "—"}
                    </td>
                    <td className="td-email">
                      {task.user?.name || "Unknown"}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          task.status === "Completed"
                            ? "status-completed"
                            : "status-pending"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>
                      {new Date(task.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </button>
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

export default TaskMonitoring;
