import axios from "axios";

import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container my-3">
        <div className="navbar-brand">
          <a className="navbar-item">
            <h1 className="title">HPAI Project</h1>
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/dashboard">
              Home
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={handleLogout} className="button is-light">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
