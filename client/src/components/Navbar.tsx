import { Link } from "react-router-dom";
import React from "react";

const Navbar = (): JSX.Element => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to="exhibitions" className="navbar-brand">
        FREEZE
      </Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="exhibitions" className="nav-link">
            REVIEWS
          </Link>
        </li>
        <li className="nav-item">
          <Link to="new" className="nav-link">
            POST
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
