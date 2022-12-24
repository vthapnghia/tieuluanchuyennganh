import { t } from "i18next";
import moment from "moment/moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { shoe_bg } from "../../../../../assets/img";
import { getNewsById } from "../NewsSlice";
import "./NewsDetail.scss";

function NewsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.newsById?.news);
  console.log(news);

  useEffect(() => {
    id && dispatch(getNewsById(id));
  }, [id, dispatch]);

  return (
    <div className="news-detail">
      <div className="container">
        <div className="title-new">
          <span>{news?.title}</span>
          <span>{`${t("date_post")}: ${moment(
            new Date(news?.created_at)
          ).format("DD-MM-YYYY")}`}</span>
        </div>
        <div className="content-new">
          <img src={news?.thumbnail || shoe_bg} alt="img" />
          <p>{news?.content}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
