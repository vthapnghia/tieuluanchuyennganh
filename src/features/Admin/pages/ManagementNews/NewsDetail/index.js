import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "../../../../../components/Button";
import { useTranslation } from "react-i18next";
import "./NewsDetail.scss";
import Icons from "../../../../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addNews,
  getNewsById,
  removeStateNews,
  uploadNews,
} from "../../../../User/pages/News/NewsSlice";
import ModalCommon from "../../../../../components/ModalCommon";
import { useParams } from "react-router";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import { removeStateShip } from "../../ManagementShip/ShipSlice";

const TextEditor = () => {
  const [titleErr, setTitleErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [temp, setTemp] = useState();
  const [thumbnail, setThumbnail] = useState();
  const { t } = useTranslation();
  const ref = useRef();
  const titleRef = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const news = useSelector((state) => state.news.newsById?.news);

  const config = useMemo(
    () => ({
      buttons:
        "bold,italic,underline,strikethrough,|,superscript,subscript,|,fontsize,brush,paragraph,|,image,file,link,|,align,undo,redo",
      spellcheck: true,
      toolbarSticky: true,
      showCharsCounter: true,
      showWordsCounter: true,
      countCharacters: true,
      countWords: true,
      readonly: false,
    }),
    []
  );

  const post = useCallback(async () => {
    let postHtml = ref.current.value;
    let titleElement = titleRef.current.value;
    if (!titleElement) {
      setTitleErr(t("MS_01", { param: "" }));
    }

    if (postHtml && titleElement) {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("title", titleElement);
      formData.append("content", postHtml);

      if (!id) {
        await dispatch(addNews(formData)).then((res) => {
          if (res.payload.status === 201) {
            setModalTitle(t("action_success", { param: t("add_news") }));
            setShowModal(!showModal);
          } else {
            setModalTitle(t("action_fail", { param: t("add_news") }));
            setModalBody(t("try_again"));
            setShowModal(!showModal);
          }
        });
      } else {
        await dispatch(uploadNews({ formData: formData, id: id })).then(
          (res) => {
            if (res.payload.status === 200) {
              setModalTitle(t("action_success", { param: t("update_news") }));
              setShowModal(!showModal);
            } else {
              setModalTitle(t("action_fail", { param: t("update_news") }));
              setModalBody(t("try_again"));
              setShowModal(!showModal);
            }
          }
        );
      }
    }
  }, [dispatch, id, showModal, t, thumbnail]);

  const handleTitleFocus = () => {
    setTitleErr("");
  };

  const handleTitleBlur = useCallback(
    (e) => {
      if (titleRef.current.value === "") {
        setTitleErr(t("MS_01", { param: "" }));
      }
    },
    [t]
  );

  const handleClose = useCallback(() => {
    setShowModal(!showModal);
    if (id) {
      dispatch(getNewsById(id));
    }
  }, [showModal, id, dispatch]);

  const onChangeImage = useCallback((e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setTemp(fileReader.result);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
    setThumbnail(e.target.files[0]);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getNewsById(id));
    }

    return () => {
      dispatch(removeStateNews());
    };
  }, [id, dispatch]);

  return useMemo(
    () => (
      <div className="news-detail-admin ql-editor">
        <div className="d-flex flex-column">
          <div className="title-post">
            <input
              type="text"
              ref={titleRef}
              onFocus={handleTitleFocus}
              onBlur={handleTitleBlur}
              placeholder="Nhập tiêu đề bài viết..."
              value={news?.title ? news?.title : ""}
            ></input>
            {titleErr && (
              <span className="warning-icon-input">
                <Icons.Exclamation />
                <span className="tooltiptext">{titleErr}</span>
              </span>
            )}
          </div>
          <div className="main-image">
            <input
              type="file"
              id="img-main"
              hidden
              accept="image/*"
              onChange={onChangeImage}
            />
            <label htmlFor="img-main">Chọn ảnh đại diện</label>
            <img
              src={news?.thumbnail ? news?.thumbnail : temp}
              alt="img"
              width={100}
              height={100}
              onLoad={(event) => (event.target.style.display = "inline-block")}
            />
          </div>
        </div>

        <div className="text-editor">
          <JoditEditor
            ref={ref}
            value={news?.content}
            config={config}
            tabIndex={1}
            className="jodit-editor"
          />
        </div>

        <div className="btn-post">
          <Button onClick={post} className="green">
            {id ? t("update_new") : t("post_new")}
          </Button>
        </div>

        <ModalCommon
          show={showModal}
          modalTitle={modalTitle}
          modalBody={modalBody}
          handleConfirm={handleClose}
          handleCloseModal={() => setShowModal(!showModal)}
          isButton
        />
      </div>
    ),
    [
      config,
      handleClose,
      handleTitleBlur,
      id,
      modalBody,
      modalTitle,
      news?.content,
      news?.thumbnail,
      news?.title,
      onChangeImage,
      post,
      showModal,
      t,
      temp,
      titleErr,
    ]
  );
};

export default TextEditor;
