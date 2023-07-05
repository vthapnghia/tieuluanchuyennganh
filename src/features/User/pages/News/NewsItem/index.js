import { useNavigate } from "react-router-dom";
import { shoe_bg } from "../../../../../assets/img";
import PATH from "../../../../../constants/path";
import "./NewsItem.scss";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";
import { Button } from "@mui/material";

function NewsItem({ newsItem }) {
  const navigate = useNavigate();

  return (
    <div id="post-item" key={newsItem._id}>
      <div className="post-thumbnail">
        <img
          src={newsItem.thumbnail || shoe_bg}
          alt="post"
          className="img-fluid"
        />
      </div>
      <div className="post-content">
        <span className="title">{newsItem.title}</span>
        <div className="date-post">
          <CalendarTodayIcon fontSize="mini" />
          <span className="date">
            {moment(new Date(newsItem?.created_at)).format("DD-MM-YYYY")}
          </span>
        </div>
        <Button
          className="btn-view"
          variant="outlined"
          size="small"
          onClick={() =>
            navigate(PATH.NEWS.DETAIL_NEWS.replace(":id", newsItem._id))
          }
        >
          Xem bài viết
        </Button>
      </div>
    </div>
  );
}
export default NewsItem;
