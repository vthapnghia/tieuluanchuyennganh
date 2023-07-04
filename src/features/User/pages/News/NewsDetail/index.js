import { t } from "i18next";
import moment from "moment/moment";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { shoe_bg } from "../../../../../assets/img";
import { getAllNews, getNewsById, removeStateNews } from "../NewsSlice";
import "./NewsDetail.scss";
import PATH from "../../../../../constants/path";
import { Container } from "@mui/material";

function NewsDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.newsById?.news);
  const allNews = useSelector((state) => state.news.allNews);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNewsById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllNews());

    return () => {
      dispatch(removeStateNews());
    };
  }, [dispatch]);

  return useMemo(
    () => (
      <div id="news-detail" >
        <Container maxWidth="lg" className=" row">
          <div className="col-12 col-lg-8 news">
            <div className="title-new ">
              <span>{news?.title}</span>
              <span>{`${t("date_post")}: ${moment(
                new Date(news?.created_at)
              ).format("DD-MM-YYYY")}`}</span>
            </div>
            <div
              className="content-html"
              dangerouslySetInnerHTML={{ __html: news?.content }}
            ></div>
          </div>
          <div className="news-other col-12 col-lg-4">
            <div className="title">{t("news_other")}</div>
            <div className="news-other-item">
              {allNews?.news.map((item) => {
                if (item._id === id) {
                  return null;
                }
                return (
                  <div
                    className="item"
                    key={item._id}
                    onClick={() =>
                      navigate(PATH.NEWS.DETAIL_NEWS.replace(":id", item._id))
                    }
                  >
                    <img
                      className="post-thumbnail"
                      src={item.thumbnail || shoe_bg}
                      alt="post"
                    />
                    <div className="post-content-entry">{item.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    ),
    [allNews?.news, id, navigate, news?.content, news?.created_at, news?.title]
  );
}

export default NewsDetail;
