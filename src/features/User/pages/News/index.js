import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./News.scss";
import { getAllNews, removeStateNews } from "./NewsSlice";
import { shoe_bg } from "../../../../assets/img";
import { useNavigate } from "react-router";
import PATH from "../../../../constants/path";
import { Button, Container, Grid } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";
import NewsItem from "./NewsItem";

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
    <div id="news">
      <Container maxWidth="lg">
        <Grid container columnSpacing={4}>
          <Grid item xs={4}>
            <div className="post-new">
              <span className="title-catalog">Bài viết mới nhất</span>
              {allNews?.news.map((item) => {
                return (
                  <div
                    className="post-item"
                    key={item._id}
                    onClick={() =>
                      navigate(PATH.NEWS.DETAIL_NEWS.replace(":id", item._id))
                    }
                  >
                    <div className="post-thumbnail">
                      <img
                        src={item?.thumbnail || shoe_bg}
                        alt="post"
                        className="img-fluid"
                      />
                    </div>
                    <div className="post-content">
                      <span className="title">{item.title}</span>
                      <div className="date-post">
                        <CalendarTodayIcon fontSize="mini" />
                        <span className="date">
                          {moment(new Date(item.created_at)).format(
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
            <span className="title-catalog">Tất cả bài viết</span>
            {allNews?.news.map((item) => {
              return <NewsItem newsItem={item} key={item._id} />;
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default News;
