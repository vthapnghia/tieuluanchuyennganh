import { Link, useLocation } from "react-router-dom";
import "./BlogItem.scss";

function BlogItem() {
  const { pathname } = useLocation();
  return (
    <div
      className={
        pathname === "/Home"
          ? "col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
          : "col-12 col-sm-6 col-md-4 mb-5"
      }
    >
      <div className="post-entry">
        <Link href="#" className="post-thumbnail">
          <img src="https://i1-dulich.vnecdn.net/2022/05/27/du-lich-Viet-Nam-3-1653637304.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=tKgsN3j--Yx684u-cGFF-A"
                      alt="post" className="img-fluid" />
        </Link>
        <div className="post-content-entry">
          <h3>
            <Link href="#">How To Buy Shoe?</Link>
          </h3>
          <div className="meta">
            <span>
              bởi <Link href="#">Nghiavt</Link>
            </span>{" "}
            <span>
              lúc <Link href="#">15-10-2022</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogItem;
