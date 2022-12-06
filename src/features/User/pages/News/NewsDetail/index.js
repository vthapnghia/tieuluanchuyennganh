import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNewsById } from "../NewsSlice";

function NewsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.newsById);

  useEffect(() => {
    id && dispatch(getNewsById(id));
  }, [id, dispatch]);
  return (
    <div className="news-detail">
      <div className="container">
        <image src={news?.thumbnail} alt="image" />
        <h1>{news?.title}</h1>
        <span>{news?.content}</span>
      </div>
    </div>
  );
}

export default NewsDetail;
