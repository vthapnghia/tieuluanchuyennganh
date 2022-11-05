import { post } from "../../../../assets/img";
import "./BlogItem.scss";

function BlogItem() {
  return (
    <div class="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
      <div class="post-entry">
        <a href="#" class="post-thumbnail">
          <img src={post} alt="Image" class="img-fluid" />
        </a>
        <div class="post-content-entry">
          <h3>
            <a href="#">How To Keep Your Furniture Clean</a>
          </h3>
          <div class="meta">
            <span>
              by <a href="#">Robert Fox</a>
            </span>{" "}
            <span>
              on <a href="#">Dec 15, 2021</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogItem;
