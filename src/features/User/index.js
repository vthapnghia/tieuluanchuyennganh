import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import Navbars from "../../components/Navbars";

function User(params) {
  return (
    <>
      <Navbars />
      <HeroSection />
      <Outlet />
      <Footer />
    </>
  );
}

export default User;
