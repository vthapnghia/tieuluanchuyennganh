import BackToTop from "../../components/BackToTop";
import Chat from "./pages/Chat";
import Footer from "../../components/Footer";
import Navbars from "../../components/Navbars";

function User(props) {
  return (
    <>
      <Navbars />
      <props.component />

      <Footer />
      <BackToTop />
      <Chat />
    </>
  );
}

export default User;
