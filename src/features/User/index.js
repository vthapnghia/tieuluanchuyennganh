import Footer from "../../components/Footer";
import Navbars from "../../components/Navbars";

function User(props) {
  return (
    <>
      <Navbars />
      <div class="container" style={{padding: "80px 0", minHeight: "calc(100vh - 62px)"}}>
        <props.component/>
      </div>
      
      <Footer />
    </>
  );
}

export default User;
