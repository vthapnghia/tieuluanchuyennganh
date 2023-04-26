import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import  PATH  from "../../constants/path";
import Button from "../Button";
import "./HeroSection.scss";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-5">
            <div className="intro-excerpt">
              <h1>
                Modern Interior <span clsas="d-block">Design Studio</span>
              </h1>
              <p className="mb-4">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <p>
                <Button
                  className="secondary"
                  style={{ borderRadius: "30px", marginRight: "20px" }}
                  onClick={() => navigate(PATH.PRODUCT.LIST_PRODUCT)}
                >
                  {t("shop_now")}
                </Button>
                <Button className="outline" style={{ borderRadius: "30px" }}>
                  Explore
                </Button>
              </p>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="hero-img-wrap">
              {/* <img
                src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
                className="img-fluid"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
