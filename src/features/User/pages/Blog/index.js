import BlogItem from "../../Components/BlogItem";
import "./Blog.scss";

const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
function Blog() {
  return (
    <div class="blog-section">
      <div class="container">
        <div class="row">
          {arr.map((item, index) => {
            return <BlogItem key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Blog;
