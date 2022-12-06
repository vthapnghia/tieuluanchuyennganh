import { Link } from "react-router-dom";
import ChooseUs from "../../Components/ChooseUs";
import "./Home.scss";


function Home() {
  return (
    <div className="home-page">
      <div className="product-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
              <h2 className="mb-4 section-title">
                Đây là .......................
              </h2>
              <p className="mb-4">
              Bên cạnh việc phải thông thạo những kiến thức lập trình về ngôn ngữ, framework, thư viện thì lập trình viên Front-end cũng cần có....{" "}
              </p>
              <p>
                <Link to="/" className="btn">
                  Explore
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ChooseUs />
      <div className="blog-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6">
              <h2 className="section-title">Recent Blog</h2>
            </div>
            <div className="col-md-6 text-start text-md-end">
              <Link to="#" className="more">
                View All Posts
              </Link>
            </div>
          </div>

          {/* <div className="row">
            {arr.map((item, index) => {
              return <BlogItem key={index} />;
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
