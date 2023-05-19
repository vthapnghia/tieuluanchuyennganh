import { useDispatch, useSelector } from "react-redux";
import "./ManagementChat.scss";
import { useEffect } from "react";
import { getAllAccount } from "../ManagementAccount/AccountSlice";
import { shoe } from "../../../../assets/img";
import Icons from "../../../../components/Icons";

const ManagementChat = () => {
  const allAccount = useSelector((state) => state.account.allAccount?.account);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);
  console.log(allAccount);
  return (
    <div className="management-chat">
      <div className="container h-100">
        <div className="form-chat row">
          <div className="list-chat col-lg-3 col-sm-4 col-xs-12">
            {allAccount &&
              allAccount.length > 0 &&
              allAccount.map((item) => {
                return (
                  <div className="item-chat" key={item._id}>
                    <img src={shoe} alt="avatar" className="avatar" />
                    <div className="info">
                      <div>{item.email}</div>
                      <div>hello Shoe</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="detail-chat col-lg-9 col-sm-8 col-xs-12">
            <div className="nav-chat">Tên của người nhắn</div>
            <div className="list-message">
              <div className="message-to">
                <img src={shoe} alt="avatar" className="avatar" />
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
                <img src={shoe} alt="avatar" className="avatar" />
              </div>
            </div>
            <div className="input-chat">
              <input />
              <div className="icon-send">
                <Icons.Send height="30" width="30" color="#007ef9"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementChat;
