import { useState } from "react";
import Icons from "../../../../components/Icons";
import "./Chat.scss";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../until/hooks";
import { Link } from "react-router-dom";
import PATH from "../../../../constants/path";
import { shoe_bg } from "../../../../assets/img";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat, sendMessage } from "./ChatSlice";
import { useCallback } from "react";
import { useMemo } from "react";
import { hideLoading, showLoading } from "../../../../loading";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

function Chat() {
  const { t } = useTranslation();
  const [flag, setFlag] = useState(false);
  const { userAuth } = useAuth();
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.listChat?.chats);
  const [message, setMessage] = useState("");
  const [mess, setMess] = useState([]);

  const handleSendMessage = useCallback(() => {
    const data = {
      message: message,
    };
    dispatch(sendMessage(data)).then((res) => {
      if (res.payload.status === 201) {
        setMess((pre) => [...pre, res.payload.data]);
        socket.emit("chat message", {
          message: res.payload.data,
          userId: "6441f1484686913eb6e4b436",
        });
      }
    });

    setMessage("");
  }, [dispatch, message]);

  const handleOnKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  useEffect(() => {
    if (flag) {
      showLoading();
      dispatch(getAllChat()).then((res) => {
        hideLoading();
      });
    }
  }, [dispatch, flag]);

  useEffect(() => {
      // Khi người dùng tham gia vào ứng dụng
      socket.emit("user join", userAuth._id);

      // Xử lý sự kiện chat message
      socket.on("chat message", (message) => {
        const messEmpty = [...mess];
        setMess([...messEmpty, message]);
      });
    
  }, [mess, userAuth._id]);

  useEffect(() => {
    setMess(chat);
  }, [chat]);

  return useMemo(
    () => (
      <div
        className="chat"
        style={{
          position: "fixed",
          bottom: "150px",
          right: "50px",
          borderRadius: "50%",
        }}
      >
        <div
          onClick={() => setFlag(!flag)}
          className={`icon-chat ${flag ? "hide-icon" : "display-icon"}`}
        >
          {/* <Icons.Messenger /> */}
          <img src={shoe_bg} alt="show chat" />
        </div>

        <div className={`form-message ${flag ? "display-form" : "hide-form"}`}>
          <div className="form-header">
            <img src={shoe_bg} alt="show chat" />
            <div>{t("chat_shoe")}</div>
            <div className="icon-close-form" onClick={() => setFlag(!flag)}>
              x
            </div>
          </div>
          {userAuth ? (
            <div className="form-message-content">
              {mess &&
                mess.length > 0 &&
                mess.map((item) => {
                  if (item.is_admin)
                    return (
                      <div className="message-left" key={item._id}>
                        {/* <img src={shoe_bg} alt="avatar" /> */}
                        <div className="message">{item.message}</div>
                      </div>
                    );
                  return (
                    <div className="message-right" key={item._id}>
                      <div className="message">{item.message}</div>
                      {/* <img
                        src={item?.avatar || avatar_default}
                        alt="avatar"
                      /> */}
                    </div>
                  );
                })}
              <div
                id="overlay_spinner"
                // style={{ display: loading ? "flex" : "none" }}
              >
                <div className="spinner"></div>
              </div>
            </div>
          ) : (
            <div className="no-login">
              Vui lòng&nbsp; <Link to={PATH.LOGIN}> đăng nhập </Link> &nbsp;để
              tiếp tục.
            </div>
          )}
          {userAuth && (
            <div className="form-message-input">
              <div className="input">
                <input
                  type="text"
                  onKeyDown={handleOnKeyDown}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
                {/* <div className="icon-image">
                  <Icons.Image />
                </div> */}
              </div>

              <div className="icon-send" onClick={handleSendMessage}>
                <Icons.Send width="24" height="24" color="#146ebe" />
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    [flag, handleOnKeyDown, handleSendMessage, mess, message, t, userAuth]
  );
}

export default Chat;
