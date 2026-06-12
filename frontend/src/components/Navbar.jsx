import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✦</span> Avidus
        </Link>
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              <span className="nav-icon">📋</span> My Tasks
            </Link>

            {isAdmin() && (
              <>
                <Link to="/admin" className="nav-link">
                  <span className="nav-icon">📊</span> Dashboard
                </Link>
                <Link to="/admin/users" className="nav-link">
                  <span className="nav-icon">👥</span> Users
                </Link>
                <Link to="/admin/tasks" className="nav-link">
                  <span className="nav-icon">📝</span> All Tasks
                </Link>
                <Link to="/admin/activities" className="nav-link">
                  <span className="nav-icon">📜</span> Logs
                </Link>
              </>
            )}

            <div className="nav-user-section">
              <span className="nav-user-badge">
                {user.role === "Admin" ? "👑" : "👤"} {user.name || user.role}
              </span>
              <button onClick={handleLogout} className="btn btn-logout" id="logout-btn">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
