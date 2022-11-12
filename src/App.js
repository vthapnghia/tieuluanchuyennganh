import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbars from "./components/Navbars";
import Blog from "./features/User/pages/Blog";
import Cart from "./features/User/pages/Cart";
import Contact from "./features/User/pages/Contact";
import Home from "./features/User/pages/Home";
import Shop from "./features/User/pages/Shop";

function App() {
  return (
    <div className="App">
      <Navbars />
      <HeroSection />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
