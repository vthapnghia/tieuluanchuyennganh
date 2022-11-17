import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  const { t } = useTranslation();
  return (
    <div id="wrapper" className="error-page">
      <div className="error-box">
        <div className="error-body text-center">
          <h1>{t("404")}</h1>
          <h3 className="text-uppercase">{t("page_not_found")}</h3>
          <p className="text-muted mt-4 mb-4">{t("text_back_home")}</p>
          <Link
            to="/home"
            className="btn btn-info btn-rounded waves-effect waves-light mb-5 text-white"
          >
            {t("back_to_home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
