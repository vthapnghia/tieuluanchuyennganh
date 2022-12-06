import { Link, useLocation, useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import "./NewsItem.scss";

function NewsItem({ newsItem }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(newsItem);

  return (
    <div
      className={
        pathname === PATH.HOME
          ? "col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
          : "col-12 col-sm-6 col-md-4 mb-5"
      }
      onClick={() => navigate(PATH.NEWS.DETAIL_NEWS.replace(":id", newsItem._id))}
       >
      <div className="post-entry">
        <Link href="#" className="post-thumbnail">
          <img
            src={
              // newsItem.thumbnail ??
              "https://photo2.tinhte.vn/data/attachment-files/2021/07/5557920_CV.jpg"
            }
            alt="post"
            className="img-fluid"
          />
        </Link>
        <div className="post-content-entry">
          <h3>
            <Link href="#">{newsItem.title}</Link>
          </h3>
          <div className="content">{newsItem.content}</div>
        </div>
      </div>
    </div>
  );
}
export default NewsItem;
