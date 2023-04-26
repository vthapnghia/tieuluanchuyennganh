import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "../../until/hooks";
import Button from "../Button";
import "./NotFound.scss";
import PATH from "../../constants/path";

function NotFound() {
  const { t } = useTranslation();
  const { is_admin, is_seller } = useAuth();
  const navigate = useNavigate();
  
  const handleBack = useCallback(() => {
    if (is_admin) {
      navigate(PATH.ADMIN.ACCOUNT);
    } else {
      if (is_seller) {
        navigate(PATH.ADMIN.PRODUCTS.BASE);
      } else {
        navigate(PATH.HOME);
      }
    }
  }, [is_admin, navigate, is_seller]);

  return (
    <div id="wrapper" className="error-page">
      <div className="error-box">
        <div className="error-body text-center">
          <h1>{t("404")}</h1>
          <h3 className="text-uppercase">{t("page_not_found")}</h3>
          <p className="text-muted mt-4 mb-4">{t("text_back_home")}</p>
          <Button className="primary" onClick={handleBack}>
            {t("back_to_home")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
