import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import Button from "../../../../../components/Button";
import { useTranslation } from "react-i18next";
import "./NewsDetail.scss";
import { Formik } from "formik";
import Input from "../../../../../components/Input";
import * as Yup from "yup";
import Icons from "../../../../../components/Icons";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

const TextEditor = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [textErr, setTextErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const { t } = useTranslation();
  const quillRef = useRef();
  const titleRef = useRef();

  const modules = {
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

  const post = () => {
    let postHtml = quillRef.current.value;
    let titleElement = titleRef.current.value;
    if (!postHtml) {
      setTextErr(t("MS_01", {param: ""}));
    }

    if (!titleElement) {
      setTitleErr(t("MS_01", {param: ""}));
    }

    if (postHtml && titleElement) {
      let arrBase64 = [];
      while (postHtml.indexOf('<img src="data:image') >= 0) {
        const postHtmlCopy = postHtml.substring(
          postHtml.indexOf('<img src="data:image') + 10,
          postHtml.lastIndexOf('"')
        );
        const index1 = postHtml.indexOf("data:image");
        const index2 = postHtmlCopy.indexOf('"') + index1;
        const find = postHtml.substring(index1, index2);

        postHtml = postHtml.replace(find, "local:3000");
        arrBase64.push(find);
      }
      console.log(arrBase64);
    }
  };

  const handleTitleFocus = () => {
    setTitleErr("");
  };

  const handleTitleBlur = (e) => {
    if (titleRef.current.value === "") {
      setTitleErr(t("MS_01", {param: ""}));
    }
  };

  const handleTextFocus = () => {
    setTextErr("");
  };

  const handleTextBlur = (e) => {
    if (quillRef.current.value === "") {
      setTextErr(t("MS_01", {param: ""}));
    }
  };
  return (
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
    </div>
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
