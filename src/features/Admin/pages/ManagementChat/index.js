import { useDispatch, useSelector } from "react-redux";
import "./ManagementChat.scss";
import { useEffect } from "react";
import { avatar_default, shoe_bg } from "../../../../assets/img";
import Icons from "../../../../components/Icons";
import { getAllChatAdmin } from "../../../User/pages/Chat/ChatSlice";
import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const ManagementChat = () => {
  const allChat = useSelector((state) => state.chat.listUserChat?.users);
  const [mess, setMess] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChatAdmin());
  }, [dispatch]);

  useEffect(() => {
    // Khi người dùng tham gia vào ứng dụng
    socket.emit('user join', "admin");

    socket.on("chat message", (message) => {
      setMess([...mess, message]);
    });
  }, [mess]);

  useEffect(() => {
    console.log(mess);
  }, [mess])
  return (
    <div className="management-chat">
      <div className="container h-100">
        <div className="form-chat row">
          <div className="list-chat col-lg-3 col-sm-4 col-xs-12">
            {allChat &&
              allChat.length > 0 &&
              allChat.map((item) => {
                return (
                  <div className="item-chat" key={item._id}>
                    <img src={item.avatar || avatar_default} alt="avatar" className="avatar" />
                    <div className="info">
                      <div>{item.name}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="detail-chat col-lg-9 col-sm-8 col-xs-12">
            <div className="nav-chat">Tên của người nhắn</div>
            <div className="list-message">
              <div className="message-to">
                <img src={shoe_bg} alt="avatar" className="avatar" />
                <div className="message">
                  Đối với học sinh cấp tiểu học, cụ thể là học sinh lớp 2,3,4,
                  yêu cầu viết đoạn văn tương đối đơn giản, thường yêu cầu các
                  em kể lại một câu chuyện hay tả lại một đồ vật, con vật, cảnh
                  vật nào đó.
                </div>
              </div>
              <div className="message-from">
                <div className="message">
                  Đối với học sinh cấp tiểu học, cụ thể là học sinh lớp 2,3,4,
                  yêu cầu viết đoạn văn tương đối đơn giản, thường yêu cầu các
                  em kể lại một câu chuyện hay tả lại một đồ vật, con vật, cảnh
                  vật nào đó.
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
  );
};

export default ManagementChat;
