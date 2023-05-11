import { useNavigate } from "react-router-dom";
import { shoe_bg } from "../../../../../assets/img";
import PATH from "../../../../../constants/path";
import "./NewsItem.scss";

function NewsItem({ newsItem }) {
  const navigate = useNavigate();

  return (
    <div
      className={"col-12 col-sm-6 col-md-4 mb-5"}
      onClick={() =>
        navigate(PATH.NEWS.DETAIL_NEWS.replace(":id", newsItem._id))
      }
    >
      <div className="post-entry">
        <div className="post-thumbnail">
          <img src={newsItem.thumbnail || shoe_bg} alt="post" className="img-fluid" />
        </div>
        <div className="post-content-entry">
          <h3>
            <div>{newsItem.title}</div>
          </h3>
        </div>
      </div>
    </div>
  );
}
export default NewsItem;
