import { Link } from "react-router-dom";
import BlogItem from "../../Components/BlogItem";
import ChooseUs from "../../Components/ChooseUs";
import "./Home.scss";

const arr = [1, 2, 3];
function Home() {
  return (
    <div className="home-page">
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
