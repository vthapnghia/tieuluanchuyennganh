import BackToTop from "../../components/BackToTop";
import Chat from "./pages/Chat";
import Footer from "../../components/Footer";
import Navbars from "../../components/Navbars";

function User(props) {
  return (
    <>
      <Navbars />
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
