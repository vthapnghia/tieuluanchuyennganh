import { useTranslation } from "react-i18next";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import Button from "../../../../components/Button";
import { Formik } from "formik";
import ModalCommon from "../../../../components/ModalCommon";
import { useNavigate } from "react-router-dom";
import PATH from "../../../../constants/path";
import "./ManagementNews.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAllNews } from "../../../User/pages/News/NewsSlice";
import TableAdminCommon from "../../../../components/TableAdminCommon";

function ManagementNews() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const formikRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allNews = useSelector((state) => state.news.allNews?.news);
  const [id, setId] = useState(null);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [listNews, setListNews] = useState(allNews);

  const cols = [
    // { label: t("image"), align: "center", width: "20%" },
    { label: t("title"), align: "center", width: "30%" },
    { label: t("date_post"), align: "center", width: "20%", sort: true },
  ];

  const rows = useMemo(() => {
    return listNews?.map((itemNews) => {
      return {
        id: itemNews._id,
        columns: [
          // {
          //   label: (
          //     <img
          //       src={
          //         itemNews.thumbnail ||
          //         "https://4h.no/getfile.php/136434-1576598515/Prosjektplattformen/Oppdrag/Bilder/Kultur/bildemanipulasjon.jpg%20%28mobile480%29.jpg"
          //       }
          //       alt="news"
          //       width="100"
          //       height="100"
          //       style={{ objectFit: "cover", borderRadius: "10px" }}
          //     />
          //   ),
          //   align: "center",
          //   width: "20%",
          // },
          { label: itemNews.title, align: "center", width: "30%" },
          { label: "06-12/2022", align: "center", width: "20%" },
        ],
      };
    });
  }, [listNews]);

  const handleRemove = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      setShowModal(!showModal);
      setId(id);
    },
    [showModal]
  );

  const handleSort = useCallback(
    (type, index) => {
      const list = [...listNews];
      setListNews(
        list.sort((a, b) => {
          const date_a = new Date(a.created_at);
          const date_b = new Date(b.created_at);
          return (date_a - date_b) * type;
        })
      );
    },
    [listNews]
  );

  const handleClick = useCallback(
    (id) => {
      console.log(id);
      navigate(PATH.ADMIN.NEWS.NEWS_DETAIL.replace(":id", id));
    },
    [navigate]
  );

  const handleClose = useCallback(async () => {
    setShowModal(!showModal);
    await dispatch(deleteNews(id)).then((res) => {
      if (res.payload?.status === 200) {
        setModalTitle(t("action_success", { param: t("delete_news") }));
        setModalBody(null);
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

  useEffect(() => {
      setListNews(allNews);
  }, [allNews]);

  return (
    <Formik
      initialValues={{ search: "" }}
      enableReinitialize
      innerRef={formikRef}
    >
      <>
        <div className="management-news">
          <div className="management-action d-flex align-items-center justify-content-between">
            {/* <div className="input-search-news">
              <Input
                name="search"
                placeholder={t("search_news")}
                type="text"
                leftIcon={<Icons.Search />}
                onKeyDown={handleOnKeyDown}
                handleOnClickLeftIcon={handleOnClickLeftIcon}
              />
            </div> */}
            <div className="btn-add-news">
              <Button
                className="primary"
                onClick={() => navigate(PATH.ADMIN.NEWS.ADD_NEWS)}
              >
                {t("add_news")}
              </Button>
            </div>
          </div>
          <TableAdminCommon
            cols={cols}
            rows={rows}
            oneButton={true}
            handleRemove={handleRemove}
            handleSort={handleSort}
            handleClick={handleClick}
          />
        </div>
        <ModalCommon
          show={showModal}
          modalTitle={t("confirm_remove", { param: t("news") })}
          modalBody={t("messge_confirm_remove")}
          handleConfirm={handleClose}
          handleCloseModal={() => {setShowModal(!showModal)}}
          isButton
        />
        <ModalCommon
          show={showMessage}
          modalTitle={modalTitle}
          modalBody={modalBody}
          handleConfirm={handleCloseMessage}
          handleCloseModal={() => {setShowMessage(!showMessage)}}
          isButton
        />
      </>
    </Formik>
  );
}

export default ManagementNews;
