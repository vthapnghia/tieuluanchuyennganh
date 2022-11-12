import { Link, useLocation } from "react-router-dom";
import { post } from "../../../../assets/img";
import "./BlogItem.scss";

function BlogItem() {
  const { pathname } = useLocation();
  return (
    <div
      class={
        pathname === "/Home"
          ? "col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
          : "col-12 col-sm-6 col-md-4 mb-5"
      }
    >
      <div class="post-entry">
        <Link href="#" class="post-thumbnail">
          <img src={post} alt="post" class="img-fluid" />
        </Link>
        <div class="post-content-entry">
          <h3>
            <Link href="#">How To Keep Your Furniture Clean</Link>
          </h3>
          <div class="meta">
            <span>
              by <Link href="#">Robert Fox</Link>
            </span>{" "}
            <span>
              on <Link href="#">Dec 15, 2021</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogItem;
