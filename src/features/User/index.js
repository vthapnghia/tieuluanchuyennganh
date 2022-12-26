import Footer from "../../components/Footer";
import Navbars from "../../components/Navbars";

function User(props) {
  return (
    <>
      <Navbars />
      <props.component />
      <Footer />
    </>
  );
}

export default User;
