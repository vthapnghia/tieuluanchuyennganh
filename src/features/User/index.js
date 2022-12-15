import Footer from "../../components/Footer";
// import HeroSection from "../../components/HeroSection";
import Navbars from "../../components/Navbars";

function User(props) {
  return (
    <>
      <Navbars />
      {/* <HeroSection /> */}
      <props.component />
      <Footer />
    </>
  );
}

export default User;
