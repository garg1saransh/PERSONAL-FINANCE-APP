import { isLoggedIn, logout } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // call logout from utils
    navigate("/login");    // redirect to login
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>💼 Finance Dashboard</h2>
      <div>
        {isLoggedIn() ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white',
  },
  title: {
    margin: 0,
  },
  link: {
    marginRight: '10px',
    color: '#61dafb',
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  }
};

export default Navbar;
