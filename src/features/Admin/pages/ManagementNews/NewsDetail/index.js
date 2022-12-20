import { Formik } from "formik";
import { t } from "i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../../../../components/Button";
import Input from "../../../../../components/Input";
import ModalCommon from "../../../../../components/ModalCommon";
import {
  addNews,
  getNewsById,
  uploadNews,
} from "../../../../User/pages/News/NewsSlice";
import "./NewsDetail.scss";

function NewDetail() {
  const formikRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.newsById?.news);
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleSave = useCallback(
    async (values) => {
      const formData = new FormData();
      formData.append("thumbnail", values.thumbnail);
      formData.append("title", values.title);
      formData.append("content", values.content);
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
            console.log(res);
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
    },
    [dispatch, id, showModal]
  );

  const initialValues = useMemo(() => {
    if (id) {
      return {
        thumbnail: news?.thumbnail,
        title: news?.title,
        content: news?.content,
      };
    }
    return {
      thumbnail: "",
      title: "",
      content: "",
    };
  }, [id, news]);
  const handleClose = useCallback(() => {
    formikRef.current.resetForm();
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

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSave}
      innerRef={formikRef}
    >
      <>
        <div className="news-detail-admin">
          <div className="container">
            <div className="row">
              <div className="col col-md-6 col-sm-12 ">
                <div className="multiple-img">
                  <div id="images">
                    {id && (
                      <figure>
                        <img src={news?.thumbnail} alt="img" />
                      </figure>
                    )}
                  </div>
                  <Input
                    name="thumbnail"
                    type="file"
                    className="img-upload"
                    textLabel={t("upload_img")}
                  />
                </div>
              </div>
              <div className="col col-md-6 col-sm-12">
                <div className="input">
                  <Input name="title" placeholder={t("title")} type="text" />
                </div>
                <div className="input">
                  <Input
                    name="content"
                    placeholder={t("content")}
                    type="textarea"
                    style={{ minHeight: "225px" }}
                  />
                </div>

                <div className="btn-upload">
                  <Button
                    className="primary float-end"
                    onClick={() => formikRef.current.submitForm()}
                  >
                    {t("save")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalCommon
          show={showModal}
          modalTitle={modalTitle}
          modalBody={modalBody}
          handleConfirm={handleClose}
          isButton
        />
      </>
    </Formik>
  );
}

export default NewDetail;
