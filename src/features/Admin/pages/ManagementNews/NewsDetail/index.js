import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import Button from "../../../../../components/Button";
import { useTranslation } from "react-i18next";
import "./NewsDetail.scss";
import { Formik } from "formik";
import Input from "../../../../../components/Input";
import * as Yup from "yup";
import Icons from "../../../../../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addNews,
  getNewsById,
  uploadNews,
} from "../../../../User/pages/News/NewsSlice";
import ModalCommon from "../../../../../components/ModalCommon";
import { useParams } from "react-router";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

const TextEditor = () => {
  const [text, setText] = useState("");
  const [textErr, setTextErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const { t } = useTranslation();
  const quillRef = useRef();
  const titleRef = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const news = useSelector((state) => state.news.newsById?.news);

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: "1" }, { header: "2" }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["image"],

        ["clean"],
      ],
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        parchment: ReactQuill.Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, []);
  const base64ToBlob = (base64, type) => {
    const byteString = atob(base64);
    const buffer = new ArrayBuffer(byteString.length);
    const data = new Uint8Array(buffer);
    for (let i = 0; i < byteString.length; i++) {
      data[i] = byteString.charCodeAt(i);
    }
    return new Blob([data.buffer], { type });
  };

  const post = useCallback(async () => {
    let postHtml = quillRef.current.value;
    let titleElement = titleRef.current.value;
    if (!postHtml) {
      setTextErr(t("MS_01", { param: "" }));
    }

    if (!titleElement) {
      setTitleErr(t("MS_01", { param: "" }));
    }

    if (postHtml && titleElement) {
      const formData = new FormData();
      formData.append("thumbnail", "");
      formData.append("title", titleElement);
      formData.append("content", postHtml);
      const regex = /data:image\/([a-zA-Z]*);base64,([^"]*)/g;
      let match;
      while ((match = regex.exec(postHtml))) {
        const [, format, base64] = match;
        const blob = base64ToBlob(base64, `image/${format}`);
        formData.append("images", blob, `image-${Date.now()}.${format}`);
      }

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
  }, [dispatch, id, showModal, t]);

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

  const handleTextFocus = () => {
    setTextErr("");
  };

  const handleTextBlur = useCallback(
    (e) => {
      if (quillRef.current.value === "") {
        setTextErr(t("MS_01", { param: "" }));
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

  useEffect(() => {
    if (id) {
      dispatch(getNewsById(id));
    }
  }, [id, dispatch]);

  return useMemo(
    () => (
      <div className="news-detail-admin ql-editor">
        <div className="title-post">
          <input
            type="text"
            ref={titleRef}
            onFocus={handleTitleFocus}
            onBlur={handleTitleBlur}
            placeholder="Nhập tiêu đề bài viết..."
          ></input>
          {titleErr && (
            <span className="warning-icon-input">
              <Icons.Exclamation />
              <span className="tooltiptext">{titleErr}</span>
            </span>
          )}
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: text }}></div> */}
        <div className="text-editor">
          <ReactQuill
            value={text}
            ref={quillRef}
            modules={modules}
            formats={TextEditor.formats}
            placeholder="Nhập nội dung bài viết..."
            onFocus={handleTextFocus}
            onBlur={handleTextBlur}
          />
          {textErr && (
            <span className="warning-icon-input">
              <Icons.Exclamation />
              <span className="tooltiptext">{textErr}</span>
            </span>
          )}
        </div>

        <div className="btn-post">
          <Button onClick={post} className="green">
            {t("post_new")}
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
      handleClose,
      handleTextBlur,
      handleTitleBlur,
      modalBody,
      modalTitle,
      modules,
      post,
      showModal,
      t,
      text,
      textErr,
      titleErr,
    ]
  );
};

TextEditor.formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "image",
  "align",
];

export default TextEditor;
