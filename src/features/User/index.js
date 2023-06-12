import BackToTop from "../../components/BackToTop";
import Chat from "./pages/Chat";
import Footer from "../../components/Footer";
import Navbars from "../../components/Navbars";
import { useLocation } from "react-router-dom";

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
          style={{ marginTop: "80px", height: "500px" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#777"></rect>
                <text x="50%" y="50%" fill="#555" dy=".3em">
                  First slide
                </text>
              </svg>
            </div>
            <div className="carousel-item">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Second slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#666"></rect>
                <text x="50%" y="50%" fill="#444" dy=".3em">
                  Second slide
                </text>
              </svg>
            </div>
            <div className="carousel-item">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Third slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#555"></rect>
                <text x="50%" y="50%" fill="#333" dy=".3em">
                  Third slide
                </text>
              </svg>
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
      <div
        className="container"
        style={{ padding: "80px 0 0", minHeight: "calc(100vh - 62px)" }}
      >
        <props.component />
      </div>

      <Footer />
      <BackToTop />
      <Chat />
    </>
  );
}

export default User;
