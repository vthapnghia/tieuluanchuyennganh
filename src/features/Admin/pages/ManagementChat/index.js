import { useDispatch, useSelector } from "react-redux";
import "./ManagementChat.scss";
import { useCallback, useEffect, useMemo } from "react";
import { avatar_default, empty, shoe_bg } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import {
  getAllChat,
  getAllChatAdmin,
  sendMessage,
} from "../../../User/pages/Chat/ChatSlice";
import { useState } from "react";
import io from "socket.io-client";
import ModalImage from "../../../../components/ModalImage";

const socket = io("https://khoa.hosting.xuantan97.com/");

const ManagementChat = () => {
  const listUserChat = useSelector((state) => state.chat.listUserChat?.users);
  const listIsRead = useSelector((state) => state.chat.listUserChat?.is_read);
  const chat = useSelector((state) => state.chat.listChat?.chats);
  const dispatch = useDispatch();
  const [mess, setMess] = useState([]);
  const [userCur, setUserCur] = useState();
  const [messageAdmin, setMessageAdmin] = useState("");
  const [chatImage, setChatImage] = useState([]);
  const [isReads, setIsReads] = useState([]);
  const [show, setShow] = useState(false);
  const [imageClick, setImageClick] = useState("");

  const handleClickUserChat = useCallback(
    async (user) => {
      const listTemp = isReads.filter(
        (item) => item.tempUser._id !== user?._id
      );
      setIsReads(listTemp);
      setUserCur(user);
      showLoading();
      await dispatch(getAllChat({ id: user._id })).then(() => hideLoading());
    },
    [dispatch, isReads]
  );

  const checkRead = useMemo(
    () => (id) => {
      if (isReads && isReads.length > 0) {
        const find = isReads.find((item) => {
          return item.tempUser._id === id;
        });
        if (find) {
          return false;
        }
        return true;
      }
      return true;
    },
    [isReads]
  );

  const handleSendMessage = useCallback(async () => {
    if (messageAdmin || chatImage) {
      const formData = new FormData();
      formData.append("message", messageAdmin);
      formData.append("user_id", userCur?._id);
      chatImage.forEach((item) => formData.append("image", item));
      showLoading();
      await dispatch(sendMessage(formData)).then((res) => {
        if (res.payload.status === 201) {
          setMess((pre) => [...pre, res.payload.data]);
          socket.emit("chat message", {
            message: res.payload.data,
            userId: userCur?._id,
          });
        }
        hideLoading();
      });

      setMessageAdmin("");
      setChatImage([]);
    }
  }, [chatImage, dispatch, messageAdmin, userCur?._id]);

  const handleOnKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleClickDetail = useCallback(() => {
    const listTemp = isReads.filter(
      (item) => item.tempUser._id !== userCur?._id
    );
    setIsReads(listTemp);
  }, [isReads, userCur?._id]);

  const handleClickImage = useCallback(
    (img) => {
      setImageClick(img);
      setShow(!show);
    },
    [show]
  );

  const showLoading = () => {
    const element = document.getElementById("overlay_spinner_chat_admin");
    if (element) {
      element.style.display = "flex";
    }
  };
  
  const hideLoading = () => {
    const element = document.getElementById("overlay_spinner_chat_admin");
    if (element) {
      element.style.display = "none";
    }
  };

  useEffect(() => {
    dispatch(getAllChatAdmin());
  }, [dispatch]);

  useEffect(() => {
    // Khi người dùng tham gia vào ứng dụng
    socket.emit("user join", "admin");

    socket.on("chat message", async (message) => {
      const find = listUserChat.find((item) => item._id === message.user_id);
      if (!find) {
        await dispatch(getAllChatAdmin());
      } else if (message.user_id === userCur?._id) {
        setMess((pre) => [...pre, message]);
      }

      const listTemp = isReads.filter(
        (item) => item.tempUser._id !== message.user_id
      );
      setIsReads([...listTemp, { is_read: false, tempUser: find }]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [dispatch, isReads, listUserChat, userCur?._id]);

  useEffect(() => {
    if (listUserChat && listUserChat.length > 0) {
      setUserCur(listUserChat[0]);
      dispatch(getAllChat({ id: listUserChat[0]._id }));
    }
  }, [dispatch, listUserChat]);

  useEffect(() => {
    if (chat && chat?.length > 0) {
      setMess(chat);
    }
  }, [chat]);

  useEffect(() => {
    if (listIsRead && listIsRead?.length > 0) {
      setIsReads(listIsRead);
    }
  }, [listIsRead]);

  useEffect(() => {
    if (listUserChat && listUserChat.length > 0) {
      var element = document.getElementById("list-message");
      element.scrollTop = element.scrollHeight;
    }
  }, [listUserChat, mess]);

  return useMemo(
    () => (
      <div className="management-chat">
        {!listUserChat || listUserChat?.length === 0 ? (
          <div className="h-100 d-flex align-items-center justify-content-center">
            <img className="no-chat" src={empty} alt="no-chat" />
          </div>
        ) : (
          <div className="h-100">
            <div className="form-chat row">
              <div className="list-chat col-lg-3 col-sm-4 col-xs-12">
                {listUserChat &&
                  listUserChat.length > 0 &&
                  listUserChat.map((item) => {
                    return (
                      <div
                        id={`item_${item._id}`}
                        className={`item-chat ${
                          userCur?._id === item._id && "item-click"
                        }`}
                        key={item._id}
                        onClick={() => handleClickUserChat(item)}
                      >
                        <img
                          src={item.avatar || avatar_default}
                          alt="avatar"
                          className="avatar"
                        />
                        <div className="info">
                          <div>{item.name}</div>
                        </div>

                        <div className="notify">
                          {!checkRead(item._id) ? (
                            <span className="bell-ring">
                              <Icons.Bell
                                color="#FFFF00"
                                height="20"
                                width="20"
                              />
                            </span>
                          ) : (
                            <Icons.Bell height="20" width="20" />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div
                className="detail-chat col-lg-9 col-sm-8 col-xs-12"
                onClick={handleClickDetail}
              >
                <div className="nav-chat">{userCur?.name}</div>
                <div
                  className="list-message"
                  id="list-message"
                  style={{
                    height:
                      chatImage.length > 0
                        ? "calc(100% - 340px)"
                        : "calc(100% - 140px)",
                  }}
                >
                  {mess.length > 0 &&
                    mess.map((item) => {
                      if (item.is_admin) {
                        return (
                          <div className="message-from" key={item._id}>
                            <div className="message">
                              {item.image && (
                                <div className="mess-img">
                                  {item?.image?.map((img, index) => {
                                    return (
                                      <img
                                        key={index}
                                        src={img}
                                        alt="mess-img"
                                        className="img-item"
                                        onClick={() => handleClickImage(img)}
                                      />
                                    );
                                  })}
                                </div>
                              )}
                              {item.message}
                            </div>
                            <img
                              src={shoe_bg}
                              alt="avatar"
                              className="avatar"
                            />
                          </div>
                        );
                      }
                      return (
                        <div className="message-to" key={item._id}>
                          <img
                            src={item.avatar || avatar_default}
                            alt="avatar"
                            className="avatar"
                          />
                          <div className="message">
                            {item.image && (
                              <div className="mess-img">
                                {item?.image?.map((img, index) => {
                                  return (
                                    <img
                                      key={index}
                                      src={img}
                                      alt="mess-img"
                                      className="img-item"
                                      onClick={() => handleClickImage(img)}
                                    />
                                  );
                                })}
                              </div>
                            )}
                            {item.message}
                          </div>
                        </div>
                      );
                    })}

                  <div id="overlay_spinner_chat_admin">
                    <div className="spinner"></div>
                  </div>
                </div>
                {chatImage && chatImage.length > 0 && (
                  <div className="display-img">
                    {chatImage.map((item, index) => {
                      return (
                        <img
                          src={URL.createObjectURL(item)}
                          key={index}
                          alt="img-mess"
                        />
                      );
                    })}
                  </div>
                )}
                <div className="input-chat">
                  <div className="input">
                    <input
                      type="text"
                      onKeyDown={handleOnKeyDown}
                      value={messageAdmin}
                      onChange={(e) => setMessageAdmin(e.target.value)}
                    />
                    <div className="icon-image">
                      <input
                        type="file"
                        hidden
                        multiple
                        id="chat-img"
                        onChange={(e) =>
                          setChatImage(Object.values(e.target.files))
                        }
                        accept="image/*"
                      />
                      <label htmlFor="chat-img" className="chat-img-label">
                        <Icons.Image />
                      </label>
                    </div>
                  </div>
                  <div className="icon-send" onClick={handleSendMessage}>
                    <Icons.Send height="30" width="30" color="#007ef9" />
                  </div>
                </div>
              </div>
            </div>
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
      listUserChat,
      handleClickDetail,
      userCur?.name,
      userCur?._id,
      chatImage,
      mess,
      handleOnKeyDown,
      messageAdmin,
      handleSendMessage,
      show,
      imageClick,
      checkRead,
      handleClickUserChat,
      handleClickImage,
    ]
  );
};

export default ManagementChat;
