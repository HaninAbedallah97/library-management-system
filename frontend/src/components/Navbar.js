import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">

        <NavLink className="navbar-brand fw-bold" to="/">
          📚 Library System
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/books">
                Books
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/members">
                Members
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/borrowrecords">
                Borrow Records
              </NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;