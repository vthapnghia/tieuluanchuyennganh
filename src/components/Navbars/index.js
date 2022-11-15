import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PATH from "../../contanst/path";
import Icons from "../Icons";
import "./Navbars.scss";

function Navbars() {
  const { t } = useTranslation();
  return (
    <>
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {t("logo")}<span>.</span>
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
              <li >
                <Link className="nav-link" to={PATH.HOME}>
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={PATH.PRODUCT.LIST_PRODUCT}>
                  {t("product")}
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
                <Link className="nav-link" to="/Blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/Contact">
                  Contact us
                </Link>
              </li>
            </ul>

            <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
              <li>
                <Link className="nav-link" to={PATH.LOGIN}>
                  <Icons.User />
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={PATH.CART}>
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
