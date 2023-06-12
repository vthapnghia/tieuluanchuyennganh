import { useState } from "react";
import Icons from "../../../../components/Icons";
import "./Chat.scss";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../until/hooks";
import { Link } from "react-router-dom";
import PATH from "../../../../constants/path";
import { avatar_default, shoe_bg } from "../../../../assets/img";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChat, getIsRead, sendMessage } from "./ChatSlice";
import { useCallback } from "react";
import { useMemo } from "react";
import { hideLoading, showLoading } from "../../../../loading";
import io from "socket.io-client";
import { useRef } from "react";
import ModalImage from "../../../../components/ModalImage";

const socket = io("http://localhost:8080");

function Chat() {
  const { t } = useTranslation();
  const [flag, setFlag] = useState(false);
  const { userAuth } = useAuth();
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.listChat?.chats);
  const isRead = useSelector((state) => state.chat.isRead?.is_read);
  const [messageUser, setMessageUser] = useState("");
  const [mess, setMess] = useState([]);
  const [chatImage, setChatImage] = useState();
  const [bellRing, setBellRing] = useState(false);
  const [show, setShow] = useState(false);
  const [imageClick, setImageClick] = useState("");
  const ref = useRef(null);

  const handleSendMessage = useCallback(async () => {
    if (messageUser || chatImage) {
      const formData = new FormData();
      formData.append("message", messageUser);
      formData.append("image", chatImage);
      showLoading();
      await dispatch(sendMessage(formData)).then((res) => {
        if (res.payload.status === 201) {
          setMess((pre) => [...pre, res.payload.data]);
          socket.emit("chat message", {
            message: res.payload.data,
            userId: "admin",
          });
        }
        hideLoading();
      });
      setMessageUser("");
      setChatImage(null);
    }
  }, [chatImage, dispatch, messageUser]);

  const handleOnKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleClickChat = useCallback(async () => {
    setFlag(!flag);
    setBellRing(false);
    await dispatch(getIsRead);
  }, [dispatch, flag]);

  const handleClickImage = useCallback(
    (img) => {
      setImageClick(img);
      setShow(!show);
    },
    [show]
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
    if (userAuth._id) {
      // Khi người dùng tham gia vào ứng dụng
      socket.emit("user join", userAuth._id);

      // Xử lý sự kiện chat message
      socket.on("chat message", (message) => {
        setMess((pre) => [...pre, message]);
        setBellRing(true);
      });

      dispatch(getIsRead());
    }
  }, [dispatch, userAuth._id]);

  useEffect(() => {
    setMess(chat);
  }, [chat]);

  useEffect(() => {
    var element = document.getElementById("form-message-content");
    element.scrollTop = element.scrollHeight;
  }, [mess]);

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
          onClick={handleClickChat}
          className={`icon-chat ${flag ? "hide-icon" : "display-icon"}`}
        >
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
            <div
              className="form-message-content"
              id="form-message-content"
              ref={ref}
              style={{
                height: chatImage ? "calc(100% - 197px)" : "calc(100% - 97px)",
              }}
            >
              {mess &&
                mess.length > 0 &&
                mess.map((item) => {
                  if (item.is_admin)
                    return (
                      <div className="message-left" key={item._id}>
                        <img src={shoe_bg} alt="avatar" className="avatar" />
                        <div className="message">
                          {item.image && (
                            <div className="mess-img">
                              <img
                                src={item.image}
                                alt="mess-img"
                                className="img-item"
                                onClick={() => handleClickImage(item.image)}
                              />
                            </div>
                          )}
                          {item.message}
                        </div>
                      </div>
                    );
                  return (
                    <div className="message-right" key={item._id}>
                      <div className="message">
                        {item.image && (
                          <div className="mess-img">
                            <img
                              src={item.image}
                              alt="mess-img"
                              className="img-item"
                              onClick={() => handleClickImage(item.image)}
                            />
                          </div>
                        )}
                        {item.message}
                      </div>
                      <img
                        src={item?.avatar || avatar_default}
                        alt="avatar"
                        className="avatar"
                      />
                    </div>
                  );
                })}
              <div id="overlay_spinner">
                <div className="spinner"></div>
              </div>
            </div>
          ) : (
            <div className="no-login">
              Vui lòng&nbsp; <Link to={PATH.LOGIN}> đăng nhập </Link> &nbsp;để
              tiếp tục.
            </div>
          )}
          {chatImage && (
            <div className="display-img">
              <img src={URL.createObjectURL(chatImage)} alt="img-mess" />
            </div>
          )}
          {userAuth && (
            <div className="form-message-input">
              <div className="input">
                <input
                  type="text"
                  onKeyDown={handleOnKeyDown}
                  value={messageUser}
                  onChange={(e) => setMessageUser(e.target.value)}
                ></input>
                <div className="icon-image">
                  <input
                    type="file"
                    hidden
                    id="chat-img"
                    onChange={(e) => setChatImage(e.target.files[0])}
                    accept="image/*"
                  />
                  <label htmlFor="chat-img" className="chat-img-label">
                    <Icons.Image />
                  </label>
                </div>
              </div>

              <div className="icon-send" onClick={handleSendMessage}>
                <Icons.Send width="24" height="24" color="#146ebe" />
              </div>
            </div>
          )}
        </div>

        {!flag && (
          <div className="notify">
            {!isRead || bellRing ? (
              <span className="bell-ring">
                <Icons.Bell color="red" height="25" width="25" />
              </span>
            ) : (
              <Icons.Bell height="25" width="25" />
            )}
          </div>
        )}

        <ModalImage
          show={show}
          image={imageClick}
          handleConfirm={() => {}}
          handleCloseModal={() => setShow(!show)}
        />
      </div>
    ),
    [
      bellRing,
      chatImage,
      flag,
      handleClickChat,
      handleClickImage,
      handleOnKeyDown,
      handleSendMessage,
      imageClick,
      isRead,
      mess,
      messageUser,
      show,
      t,
      userAuth,
    ]
  );
}

export default Chat;
