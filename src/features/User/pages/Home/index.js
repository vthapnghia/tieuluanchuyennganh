import { Link } from "react-router-dom";
import BlogItem from "../../Components/BlogItem";
import ChooseUs from "../../Components/ChooseUs";
import ProductItem from "../../Components/ProductItem";
import "./Home.scss";

const arr = [1, 2, 3];
function Home() {
  return (
    <div className="home-page">
      <div class="product-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-3 mb-5 mb-lg-0">
              <h2 class="mb-4 section-title">
                Crafted with excellent material.
              </h2>
              <p class="mb-4">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.{" "}
              </p>
              <p>
                <Link to="/" class="btn">
                  Explore
                </Link>
              </p>
            </div>

            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
          </div>
        </div>
      </div>
      <ChooseUs />
      <div class="blog-section">
        <div class="container">
          <div class="row mb-5">
            <div class="col-md-6">
              <h2 class="section-title">Recent Blog</h2>
            </div>
            <div class="col-md-6 text-start text-md-end">
              <Link to="#" class="more">
                View All Posts
              </Link>
            </div>
          </div>

          <div class="row">
            {arr.map((item, index) => {
              return <BlogItem key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
