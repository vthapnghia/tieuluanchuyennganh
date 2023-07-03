import BackToTop from "../../components/BackToTop";
import Chat from "./pages/Chat";
import Footer from "../../components/Footer";
import Navbars from "../../components/Navbars";
import { useLocation } from "react-router-dom";
import { slide_1, slide_2, slide_3 } from "../../assets/img";

function User(props) {
  const { pathname } = useLocation();
  return (
    <>
      <Navbars />
      {(pathname === "/product" ||
        pathname === "/home" ||
        pathname === "/" ||
        pathname === "/news") && (
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ marginTop: "106px", height: "auto", width: "100%" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={slide_1}
                alt="slide_1"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={slide_2}
                alt="slide_2"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={slide_3}
                alt="slide_3"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
      <div>
        <props.component />
      </div>

      <Footer />
      <BackToTop />
      <Chat />
    </>
  );
}

export default User;
