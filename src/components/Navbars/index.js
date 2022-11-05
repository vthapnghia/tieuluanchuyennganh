import { Link } from "react-router-dom";
import Icons from "../Icons";
import "./Navbars.scss";

function Navbars() {
  return (
    <>
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Furni<span>.</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/Home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/">
                  About us
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/">
                  Services
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/">
                  Contact us
                </Link>
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              <li>
                <Link className="nav-link" to="/">
                  <Icons.User />
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/">
                  <Icons.Cart />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbars;
