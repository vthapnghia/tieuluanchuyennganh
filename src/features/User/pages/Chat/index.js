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

function Chat() {
  const { t } = useTranslation();
  const [flag, setFlag] = useState(false);
  const { userAuth } = useAuth();
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.listChat);
  const [message, setMessage] = useState("");

  const handleSendMessage = useCallback(() => {
    const data = {
      receiver_id: "6425883addeca96417cd1514",
      message: message,
    };
    dispatch(sendMessage(data));
  }, [dispatch, message]);

  const handleOnKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
    }
  }, []);

  useEffect(() => {
    if (flag) {
      dispatch(getAllChat());
    }
  }, [dispatch, flag]);
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
              {chat.chats &&
                chat.chats.length > 0 &&
                chat.chats.map((item, index) => {
                  if (index % 2 === 0)
                    return (
                      <div className="message-left" key={item._id}>
                        <img src={shoe_bg} alt="avatar" />
                        <div className="message">{item.message}</div>
                      </div>
                    );
                  return (
                    <div className="message-right" key={item._id}>
                      <div className="message">{item.message}</div>
                      <img
                        src="https://www.vivosmartphone.vn/uploads/MANGOADS/ch%E1%BB%A5p%20%E1%BA%A3nh/th%E1%BB%9Di%20th%C6%B0%E1%BB%A3ng/1.jpg"
                        alt="avatar"
                      />
                    </div>
                  );
                })}
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
                  onChange={(e) => setMessage(e.target.value)}
                ></input>
                <div className="icon-image">
                  <Icons.Image />
                </div>
              </div>

              <div className="icon-send" onClick={handleSendMessage}>
                <Icons.Send width="24" height="24" color="#146ebe" />
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    [chat.chats, flag, handleOnKeyDown, handleSendMessage, t, userAuth]
  );
}

export default Chat;
