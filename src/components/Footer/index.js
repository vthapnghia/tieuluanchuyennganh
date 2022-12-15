import { t } from "i18next";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="border-top footer-section">
      <div className="container relative">
        <div className=" copyright">
          <div className="row pt-4">
            <div className="col-lg-6">
              <p className="mb-2 text-center text-lg-start">
                {t("copyright")} &copy;
              </p>
            </div>

            <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex ms-auto">
                <li className="me-4">
                  <Link to="/">{t("terms_conditions")}</Link>
                </li>
                <li>
                  <Link to="/">{t("privacy_policy")}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
