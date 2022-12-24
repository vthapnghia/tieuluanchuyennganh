import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsItem from "../../Components/NewsItem";
import "./News.scss";
import { getAllNews } from "./NewsSlice";

function News() {
  const dispatch = useDispatch();
  const allNews = useSelector((state) => state.news.allNews);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  return (
    <div className="news-section">
      <div className="container">
        <div className="row">
          {allNews?.news.map((item, index) => {
            return <NewsItem key={index} newsItem={item}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default News;
