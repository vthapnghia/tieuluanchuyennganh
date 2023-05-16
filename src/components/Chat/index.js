import { useCallback, useState } from "react";
import Icons from "../Icons";
import "./Chat.scss";
import { useTranslation } from "react-i18next";

function Chat() {
  const { t } = useTranslation();
  const [flag, setFlag] = useState(false);
  return (
    <div
      className="chat"
      style={{
        position: "fixed",
        bottom: "150px",
        right: "50px",
        borderRadius: "50%",
        cursor: "pointer",
      }}
    >
      <div
        onClick={() => setFlag(!flag)}
        className={`icon-chat ${flag ? "hide-icon" : "display-icon"}`}
      >
        <Icons.Messenger />
      </div>

      <div className={`form-message ${flag ? "display-form" : "hide-form"}`}>
        <div className="form-header">
          <div>{t("chat_shoe")}</div>
          <div className="icon-close-form" onClick={() => setFlag(!flag)}>
            x
          </div>
        </div>
        <div className="form-message-content">
            <div className="message-left"></div>
            <div className="message-right">
                <div>đây nè</div>
            </div>
        </div>
        <div className="form-message-input">
          <div className="input">
            <input></input>
            <div className="icon-image">
              <Icons.Image />
            </div>
          </div>

          <div className="icon-send">
            <Icons.Send width="24" height="24" color="#146ebe"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
