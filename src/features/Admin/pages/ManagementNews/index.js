import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import TableCommon from "../../../../components/TableCommon";
import { Formik } from "formik";
import Icons from "../../../../components/Icons";
import ModalCommon from "../../../../components/ModalCommon";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../contanst/path";
import "./ManagementNews.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAllNews } from "../../../User/pages/News/NewsSlice";

function ManagementNews() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const formikRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allNews = useSelector((state) => state.news.allNews);
  const [id, setId] = useState(null);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const cols = [
    { label: t("image"), align: "center", width: "20%" },
    { label: t("title"), align: "center", width: "30%" },
    { label: t("date_post"), align: "center", width: "20%", sort: true },
  ];

  const rows = useMemo(() => {
    return allNews?.news.map((itemNews) => {
      return {
        id: itemNews._id,
        columns: [
          {
            label: (
              <img
                src={
                  itemNews.thumbnail ||
                  "https://4h.no/getfile.php/136434-1576598515/Prosjektplattformen/Oppdrag/Bilder/Kultur/bildemanipulasjon.jpg%20%28mobile480%29.jpg"
                }
                alt="news"
                width="100"
                height="100"
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
            ),
            align: "center",
            width: "20%",
          },
          { label: itemNews.title, align: "center", width: "30%" },
          { label: "06-12/2022", align: "center", width: "20%" },
        ],
      };
    });
  }, [allNews]);

  const handleRemove = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setShowModal(!showModal);
      setId(id);
    },
    [showModal]
  );

  const handleOnKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      console.log(formikRef.current?.values);
    }
  }, []);

  const handleOnClickLeftIcon = useCallback((values) => {
    console.log(values);
  }, []);

  const handleSort = useCallback((type, index) => {
    console.log(type, index);
  }, []);

  const handleClick = useCallback(
    (id) => () => {
      navigate(PATH.ADMIN.NEWS.NEWS_DETAIL.replace(":id", id));
    },
    [navigate]
  );

  const handleClose = useCallback(async () => {
    setShowModal(!showModal);
    await dispatch(deleteNews(id)).then((res) => {
      if (res.payload?.status === 200) {
        setModalTitle(t("action_success", { param: t("delete_news") }));
      } else {
        setModalTitle(t("action_fail", { param: t("delete_news") }));
        setModalBody(t("try_again"));
      }
      setShowMessage(!showMessage);
    });
  }, [showModal, dispatch, id, showMessage, t]);

  const handleCloseMessage = useCallback(() => {
    setShowMessage(!showMessage);
    dispatch(getAllNews());
  }, [dispatch, showMessage]);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{ search: "" }}
      enableReinitialize
      innerRef={formikRef}
    >
      <>
        <div className="management-news">
          <div className="management-action d-flex align-items-center justify-content-between">
            <div className="input-search-news">
              <Input
                name="search"
                placeholder={t("search_news")}
                type="text"
                leftIcon={<Icons.Search />}
                onKeyDown={handleOnKeyDown}
                handleOnClickLeftIcon={handleOnClickLeftIcon}
              />
            </div>
            <div className="btn-add-news">
              <Button
                className="primary"
                onClick={() => navigate(PATH.ADMIN.NEWS.ADD_NEWS)}
              >
                {t("add_news")}
              </Button>
            </div>
          </div>
          <TableCommon
            cols={cols}
            rows={rows}
            oneButton={true}
            labelHeader={t("action")}
            handleRemove={handleRemove}
            handleSort={handleSort}
            handleClick={handleClick}
          />
        </div>
        <ModalCommon
          show={showModal}
          modalTitle={t("confirm_remove", { param: t("news") })}
          modalBody={t("messge_confirm_remove")}
          handleClose={handleClose}
          isButton
        />
        <ModalCommon
          show={showMessage}
          modalTitle={modalTitle}
          modalBody={modalBody}
          handleClose={handleCloseMessage}
          isButton
        />
      </>
    </Formik>
  );
}

export default ManagementNews;
