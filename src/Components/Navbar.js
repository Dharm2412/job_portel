import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate(); // Use navigate hook

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogoutClick = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfull")
        setUser(null);
        navigate("/"); // Navigate to login page after logout
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert(`Logout failed: ${error.message}`);
      });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            className="logo"
            src="https://cdn5.vectorstock.com/i/1000x1000/74/44/job-portal-lettering-logo-design-template-concept-vector-37017444.jpg"
            alt=""
          />
          <br></br>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/post-jobs">
                Post-jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/view-jobs">
                View-jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/postedjobs">
                Posted Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contect">
                Contect
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ai">
                Skill Recommendations
              </Link>
            </li>
          </ul>
        </div>
        <div className="btnn">
          {user ? (
            <>
              <button
                className="btn btn-outline-light"
                onClick={handleLogoutClick}
              >
                <span className="navbar-text me-3">
                  &larr; {user.displayName || user.email}
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-light me-2"
                onClick={() => navigate("/login")} // Use navigate to go to login page
              >
                LOGIN
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => navigate("/register")} // Use navigate to go to register page
              >
                REGISTER
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
