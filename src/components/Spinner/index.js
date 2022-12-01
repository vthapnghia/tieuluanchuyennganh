import { useTranslation } from "react-i18next";
import "./Spiner.scss";

function Spinner() {
  const {t} = useTranslation();
  return (
    <div id="overlay_spinner">
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
