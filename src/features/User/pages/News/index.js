import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./News.scss";
import { getAllNews, removeStateNews } from "./NewsSlice";
import { shoe_bg } from "../../../../assets/img";
import { useNavigate } from "react-router";
import PATH from "../../../../constants/path";

function News() {
  const dispatch = useDispatch();
  const allNews = useSelector((state) => state.news.allNews);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllNews());

    return () => {
      dispatch(removeStateNews());
    };
  }, [dispatch]);

  return (
    <div className="news-section row">
      {allNews?.news.map((item) => {
        return (
          <div
            className="post col-md-4 col-xl-3"
            key={item._id}
            onClick={() =>
              navigate(PATH.NEWS.DETAIL_NEWS.replace(":id", item._id))
            }
          >
            <div className="post-thumbnail">
              <img
                src={item.thumbnail || shoe_bg}
                alt="post"
                className="img-fluid"
              />
            </div>
            <div className="post-content-entry">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default News;
