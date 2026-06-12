import { useState, useEffect } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
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

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await API.put(`/tasks/${taskId}`, updates);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const toggleStatus = (task) => {
    const newStatus = task.status === "Pending" ? "Completed" : "Pending";
    handleUpdateTask(task._id, { status: newStatus });
  };

  if (loading) {
    return <div className="loading">Loading your tasks...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Tasks</h1>
        <p className="page-subtitle">Manage your personal tasks</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card create-task-card">
        <h2>Create New Task</h2>
        <form onSubmit={handleCreateTask} className="task-form">
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="task-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
              />
            </div>
            <button type="submit" className="btn btn-primary" id="create-task-btn">
              + Add Task
            </button>
          </div>
        </form>
      </div>

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📝</span>
            <h3>No tasks yet</h3>
            <p>Create your first task above!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`task-card ${
                task.status === "Completed" ? "task-completed" : ""
              }`}
            >
              {editingTask === task._id ? (
                <div className="task-edit">
                  <input
                    type="text"
                    defaultValue={task.title}
                    id={`edit-title-${task._id}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateTask(task._id, {
                          title: e.target.value,
                        });
                      }
                    }}
                  />
                  <div className="task-edit-actions">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        const input = document.getElementById(
                          `edit-title-${task._id}`
                        );
                        handleUpdateTask(task._id, {
                          title: input.value,
                        });
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => setEditingTask(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <span
                      className={`status-badge ${
                        task.status === "Completed"
                          ? "status-completed"
                          : "status-pending"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}
                  <div className="task-footer">
                    <span className="task-date">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                    <div className="task-actions">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => toggleStatus(task)}
                        title={
                          task.status === "Pending"
                            ? "Mark Complete"
                            : "Mark Pending"
                        }
                      >
                        {task.status === "Pending" ? "✓" : "↩"}
                      </button>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => setEditingTask(task._id)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteTask(task._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
