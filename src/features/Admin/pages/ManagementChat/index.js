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
import { hideLoading, showLoading } from "../../../../loading";

const socket = io("http://localhost:8080");

const ManagementChat = () => {
  const listUserChat = useSelector((state) => state.chat.listUserChat?.users);
  const listIsRead = useSelector((state) => state.chat.listUserChat?.is_read);
  const chat = useSelector((state) => state.chat.listChat?.chats);
  const dispatch = useDispatch();
  const [mess, setMess] = useState([]);
  const [userCur, setUserCur] = useState();
  const [messageAdmin, setMessageAdmin] = useState("");

  const handleClickUserChat = useCallback(
    async (user) => {
      setUserCur(user);
      showLoading();
      await dispatch(getAllChat({ id: user._id })).then(() => hideLoading());
    },
    [dispatch]
  );

  const checkRead = useCallback(
    () => (id) => {
      if (listIsRead && listIsRead.length > 0) {
        const find = listIsRead.find((item) => item.tempUser._id === id);
        if (find) {
          return false;
        }
        return true;
      }
      return true;
    },
    [listIsRead]
  );

  const handleSendMessage = useCallback(async () => {
    if (messageAdmin) {
      const data = {
        message: messageAdmin,
        user_id: userCur?._id,
      };
      await dispatch(sendMessage(data)).then((res) => {
        if (res.payload.status === 201) {
          setMess((pre) => [...pre, res.payload.data]);
          socket.emit("chat message", {
            message: res.payload.data,
            userId: userCur?._id,
          });
        }
      });

      setMessageAdmin("");
    }
  }, [dispatch, messageAdmin, userCur?._id]);

  const handleOnKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

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
    });

    return () => {
      socket.off("chat message");
    };
  }, [dispatch, listUserChat, userCur?._id]);

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
                        } ${checkRead(item._id) ? "" : "is-not-read"}`}
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
                      </div>
                    );
                  })}
              </div>
              <div className="detail-chat col-lg-9 col-sm-8 col-xs-12">
                <div className="nav-chat">{userCur?.name}</div>
                <div className="list-message" id="list-message">
                  {mess.length > 0 &&
                    mess.map((item) => {
                      if (item.is_admin) {
                        return (
                          <div className="message-from" key={item._id}>
                            <div className="message">{item.message}</div>
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
                          <div className="message">{item.message}</div>
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
                <div className="input-chat">
                  <input
                    type="text"
                    onKeyDown={handleOnKeyDown}
                    value={messageAdmin}
                    onChange={(e) => setMessageAdmin(e.target.value)}
                  />
                  <div className="icon-send" onClick={handleSendMessage}>
                    <Icons.Send height="30" width="30" color="#007ef9" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    [
      checkRead,
      handleClickUserChat,
      handleOnKeyDown,
      handleSendMessage,
      listUserChat,
      mess,
      messageAdmin,
      userCur?._id,
      userCur?.name,
    ]
  );
};

export default ManagementChat;
