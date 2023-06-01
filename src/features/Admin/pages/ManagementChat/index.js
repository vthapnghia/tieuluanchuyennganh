import { useDispatch, useSelector } from "react-redux";
import "./ManagementChat.scss";
import { useCallback, useEffect, useMemo } from "react";
import { avatar_default, shoe_bg } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import {
  getAllChat,
  getAllChatAdmin,
} from "../../../User/pages/Chat/ChatSlice";
import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const ManagementChat = () => {
  const listUserChat = useSelector((state) => state.chat.listUserChat?.users);
  const chat = useSelector((state) => state.chat.listChat?.chats);
  const dispatch = useDispatch();
  const [mess, setMess] = useState([]);
  const [nameTitle, setNameTitle] = useState("");
  const [userIdCur, setUserIdCur] = useState("");

  const handleClickUserChat = useCallback(
    async (user) => {
      setNameTitle(user.name);
      setUserIdCur(user._id);
      await dispatch(getAllChat({ id: user._id }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllChatAdmin());
  }, [dispatch]);

  useEffect(() => {
    // Khi người dùng tham gia vào ứng dụng
    socket.emit("user join", "admin");

    socket.on("chat message", (message) => {
      setMess([...mess, message]);
    });
  }, [mess]);

  useEffect(() => {
    if (listUserChat && listUserChat.length > 0) {
      setNameTitle(listUserChat[0].name);
      setUserIdCur(listUserChat[0]._id);
      dispatch(getAllChat({ id: listUserChat[0]._id }));
    }
  }, [dispatch, listUserChat]);

  useEffect(() => {
    console.log(chat);
  }, [chat]);
  return useMemo(
    () => (
      <div className="management-chat">
        <div className=" h-100">
          <div className="form-chat row">
            <div className="list-chat col-lg-3 col-sm-4 col-xs-12">
              {listUserChat &&
                listUserChat.length > 0 &&
                listUserChat.map((item) => {
                  return (
                    <div
                      id={`item_${item._id}`}
                      className={`item-chat ${
                        userIdCur === item._id && "item-click"
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
                    </div>
                  );
                })}
            </div>
            <div className="detail-chat col-lg-9 col-sm-8 col-xs-12">
              <div className="nav-chat">{nameTitle}</div>
              <div className="list-message">
                <div className="message-to">
                  <img src={shoe_bg} alt="avatar" className="avatar" />
                  <div className="message">
                    Đối với học sinh cấp tiểu học, cụ thể là học sinh lớp 2,3,4,
                    yêu cầu viết đoạn văn tương đối đơn giản, thường yêu cầu các
                    em kể lại một câu chuyện hay tả lại một đồ vật, con vật,
                    cảnh vật nào đó.
                  </div>
                </div>
                <div className="message-from">
                  <div className="message">
                    Đối với học sinh cấp tiểu học, cụ thể là học sinh lớp 2,3,4,
                    yêu cầu viết đoạn văn tương đối đơn giản, thường yêu cầu các
                    em kể lại một câu chuyện hay tả lại một đồ vật, con vật,
                    cảnh vật nào đó.
                  </div>
                  <img src={shoe_bg} alt="avatar" className="avatar" />
                </div>
              </div>
              <div className="input-chat">
                <input />
                <div className="icon-send">
                  <Icons.Send height="30" width="30" color="#007ef9" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [handleClickUserChat, listUserChat, nameTitle]
  );
};

export default ManagementChat;
