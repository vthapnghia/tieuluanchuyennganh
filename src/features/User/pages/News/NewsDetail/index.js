import { t } from "i18next";
import moment from "moment/moment";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { shoe_bg } from "../../../../../assets/img";
import { getAllNews, getNewsById, removeStateNews } from "../NewsSlice";
import "./NewsDetail.scss";
import PATH from "../../../../../constants/path";
import { Container, Grid } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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
      <div id="news-detail">
        <Container maxWidth="lg">
          <Grid container columnSpacing={4}>
            <Grid item xs={4}>
              <div className="post-new">
                <span className="title-catalog">Bài viết mới nhất</span>
                {allNews?.news.map((item) => {
                  return (
                    <div
                      item
                      xs={3}
                      className="post-item"
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
                      <div className="post-content">
                        <span className="title">{item.title}</span>
                        <div className="date-post">
                          <CalendarTodayIcon fontSize="mini" />
                          <span className="date">
                            {moment(new Date(item?.created_at)).format(
                              "DD-MM-YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Grid>
            <Grid item xs={8}>
              <div className="news">
                <div className="title-new ">
                  <span>{news?.title}</span>
                  <div style={{display: "fle"}}>
                    <CalendarTodayIcon fontSize="mini"/>
                    {moment(new Date(news?.created_at)).format("DD-MM-YYYY")}
                  </div>
                </div>
                <div
                  className="content-html"
                  dangerouslySetInnerHTML={{ __html: news?.content }}
                ></div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    ),
    [allNews?.news, navigate, news?.content, news?.created_at, news?.title]
  );
}

export default NewsDetail;
